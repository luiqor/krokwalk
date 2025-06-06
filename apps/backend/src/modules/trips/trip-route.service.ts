import type { CreateTripPlace } from "./libs/types/types";

type FindTripRouteParams = {
	timeMatrix: { time: number }[][];
	startIndex: number;
	endIndex: number;
	places: CreateTripPlace[];
	priorityPlaces: { tags?: string[]; tours?: string[] };
	maximumWalkSeconds: number;
};

type AssignPrioritiesParams = {
	places: CreateTripPlace[];
	priorityPlaces: { tags?: string[]; tours?: string[] };
	timeMatrix: { time: number }[][];
	startIndex: number;
	endIndex: number;
};

type FindTripRouteResult = {
	path: number[];
	totalTime: number;
	visitedPlaces: CreateTripPlace[];
};

type ApplyKnapsackAlgorithmParams = {
	initialPath: number[];
	timeMatrix: { time: number }[][];
	places: CreateTripPlace[];
	maximumWalkSeconds: number;
};

type FindBestPathParams = {
	startIndex: number;
	endIndex: number;
	intermediatePlaces: { index: number; priority: number }[];
	timeMatrix: { time: number }[][];
	maximumWalkSeconds: number;
};

class TripRouteService {
	public findTripRoute({
		timeMatrix,
		startIndex,
		endIndex,
		places,
		priorityPlaces,
		maximumWalkSeconds,
	}: FindTripRouteParams): FindTripRouteResult {
		// Step 1: Create initial path using greedy approach
		const initialPath = this.createInitialPath(
			timeMatrix,
			startIndex,
			endIndex
		);

		// If there are no intermediate places, return direct path
		if (initialPath.length <= 2) {
			return {
				path: initialPath,
				totalTime: timeMatrix[startIndex][endIndex].time,
				visitedPlaces: [],
			};
		}

		// Step 2: Assign priorities to places based on tags, tours, and "on the way" status
		this.assignPriorities({
			places,
			priorityPlaces,
			timeMatrix,
			startIndex,
			endIndex,
		});

		// Step 3: Apply knapsack algorithm to select optimal places
		const result = this.applyKnapsackAlgorithm({
			initialPath,
			timeMatrix,
			places,
			maximumWalkSeconds,
		});

		// Create final visited places list
		const visitedPlaces = result.path
			.filter((index) => index !== startIndex && index !== endIndex)
			.map((index) => {
				// Find the place with the corresponding index
				return places.find((place) => place.index === index);
			})
			.filter((place) => place !== undefined) as CreateTripPlace[];

		return {
			path: result.path,
			totalTime: result.totalTime,
			visitedPlaces,
		};
	}

	/**
	 * Creates an initial path from start to end using a greedy approach
	 * This path will include all intermediate places and will likely exceed the time limit
	 */
	private createInitialPath(
		timeMatrix: { time: number }[][],
		startIndex: number,
		endIndex: number
	): number[] {
		const visited = new Set<number>([startIndex]);
		const path = [startIndex];
		let currentIndex = startIndex;

		// Continue until we've visited all nodes or reached the end
		while (visited.size < timeMatrix.length) {
			let nextIndex = -1;
			let minTime = Infinity;

			// Find the unvisited node with the minimum time from the current node
			for (let i = 0; i < timeMatrix.length; i++) {
				if (!visited.has(i) && timeMatrix[currentIndex][i].time < minTime) {
					minTime = timeMatrix[currentIndex][i].time;
					nextIndex = i;
				}
			}

			// If no next node found or it's the end node and we haven't visited all others,
			// choose the end node only if we've visited at least half of the nodes
			if (
				nextIndex === -1 ||
				(nextIndex === endIndex && visited.size < timeMatrix.length / 2)
			) {
				// Find the next best node that's not the end
				nextIndex = -1;
				minTime = Infinity;
				for (let i = 0; i < timeMatrix.length; i++) {
					if (
						!visited.has(i) &&
						i !== endIndex &&
						timeMatrix[currentIndex][i].time < minTime
					) {
						minTime = timeMatrix[currentIndex][i].time;
						nextIndex = i;
					}
				}

				// If still no node found, add end index and break
				if (nextIndex === -1) {
					if (!visited.has(endIndex)) {
						path.push(endIndex);
						visited.add(endIndex);
					}
					break;
				}
			}

			// Add the next node to the path
			path.push(nextIndex);
			visited.add(nextIndex);
			currentIndex = nextIndex;

			// If we've reached the end and visited most nodes, we're done
			if (nextIndex === endIndex && visited.size > timeMatrix.length * 0.8) {
				break;
			}
		}

		// If end node is not the last in path, ensure it is
		if (path[path.length - 1] !== endIndex) {
			if (visited.has(endIndex)) {
				// Remove endIndex from its current position
				const endIndexPosition = path.indexOf(endIndex);
				if (endIndexPosition !== -1) {
					path.splice(endIndexPosition, 1);
				}
			}
			path.push(endIndex);
		}

		return path;
	}

	/**
	 * Assigns priority values to places based on their tags, tours, and whether they're "on the way"
	 */
	private assignPriorities({
		places,
		priorityPlaces,
		timeMatrix,
		startIndex,
		endIndex,
	}: AssignPrioritiesParams): void {
		const { tags = [], tours = [] } = priorityPlaces;

		// Calculate direct time from start to end
		const directTime = timeMatrix[startIndex][endIndex].time;

		places.forEach((place) => {
			let priority = 0;

			// Calculate priority based on tags
			place.tags.forEach((tag) => {
				const tagIndex = tags.indexOf(tag);
				if (tagIndex !== -1) {
					// Higher priority for tags with lower indices
					priority += (tags.length - tagIndex) * 2; // Give more weight to tags
				}
			});

			// Calculate priority based on tours
			place.tours.forEach((tour) => {
				const tourIndex = tours.indexOf(tour);
				if (tourIndex !== -1) {
					// Higher priority for tours with lower indices
					priority += (tours.length - tourIndex) * 3; // Give even more weight to tours
				}
			});

			// Check if the place is "on the way" by comparing going directly vs. through this place
			const detourTime =
				timeMatrix[startIndex][place.index].time +
				timeMatrix[place.index][endIndex].time;
			const detourRatio = detourTime / directTime;

			// Increase priority if the place is on the way (small detour)
			// Values close to 1.0 mean it's almost directly on the path
			if (detourRatio <= 1.2) {
				// Less than 20% detour
				const onTheWayBonus = Math.max(10, 20 * (1.2 - detourRatio) * 10); // Higher bonus for smaller detours
				priority += onTheWayBonus;
			}

			// Add base priority to ensure places with no matching tags/tours still have some value
			place.priority = priority + 1;
		});
	}

	/**
	 * Applies knapsack algorithm to select optimal places within time constraint
	 */
	private applyKnapsackAlgorithm({
		initialPath,
		timeMatrix,
		places,
		maximumWalkSeconds,
	}: ApplyKnapsackAlgorithmParams): {
		path: number[];
		totalTime: number;
	} {
		const startIndex = initialPath[0];
		const endIndex = initialPath[initialPath.length - 1];

		// Get all intermediate places from the initial path
		const intermediatePlaces = initialPath
			.filter((index) => index !== startIndex && index !== endIndex)
			.map((index) => {
				const place = places.find((p) => p.index === index);
				return {
					index,
					priority: place ? place.priority : 0,
				};
			});

		// If no intermediate places, return direct path
		if (intermediatePlaces.length === 0) {
			return {
				path: [startIndex, endIndex],
				totalTime: timeMatrix[startIndex][endIndex].time,
			};
		}

		// Evaluate all possible combinations of places, starting with the full set
		const bestPath = this.findBestPath({
			startIndex,
			endIndex,
			intermediatePlaces,
			timeMatrix,
			maximumWalkSeconds,
		});

		return bestPath;
	}

	/**
	 * Finds the best path that maximizes priority within the time constraint
	 */
	private findBestPath({
		startIndex,
		endIndex,
		intermediatePlaces,
		timeMatrix,
		maximumWalkSeconds,
	}: FindBestPathParams): {
		path: number[];
		totalTime: number;
	} {
		// Create items for knapsack algorithm
		const items = intermediatePlaces.map((place, i) => ({
			...place,
			originalIndex: i, // Keep track of the original position
		}));

		const n = items.length;
		// Convert time to integer milliseconds for more precise calculations
		const timeLimit = Math.floor(maximumWalkSeconds * 1000);

		// Map of dp[i][time] = maximum priority achievable with first i items within time limit
		const dp: Map<string, number> = new Map();
		// Map of selected[i][time] = items selected to achieve dp[i][time]
		const selected: Map<string, boolean[]> = new Map();

		// Initialize with 0 items
		dp.set(`0_0`, 0);
		selected.set(`0_0`, new Array(n).fill(false));

		// Fill the dp table using bitmask to represent selected items
		for (let mask = 1; mask < 1 << n; mask++) {
			// Get indices of selected places in this mask
			const selectedIndices = [];
			for (let i = 0; i < n; i++) {
				if ((mask & (1 << i)) !== 0) {
					selectedIndices.push(i);
				}
			}

			// Calculate time for this combination
			const path = [
				startIndex,
				...selectedIndices.map((i) => items[i].index),
				endIndex,
			];
			let time = 0;
			for (let i = 0; i < path.length - 1; i++) {
				time += timeMatrix[path[i]][path[i + 1]].time * 1000; // Convert to milliseconds
			}

			// Calculate total priority
			const priority = selectedIndices.reduce(
				(sum, i) => sum + items[i].priority,
				0
			);

			// Update dp if this combination is feasible and better
			if (time <= timeLimit) {
				const key = `${mask}_${time}`;
				if (!dp.has(key) || priority > dp.get(key)!) {
					dp.set(key, priority);

					// Mark selected items
					const selection = new Array(n).fill(false);
					selectedIndices.forEach((i) => {
						selection[i] = true;
					});
					selected.set(key, selection);
				}
			}
		}

		// Find the best feasible combination
		let bestPriority = 0;
		let bestKey = `0_0`;

		for (const [key, priority] of dp.entries()) {
			if (priority > bestPriority) {
				bestPriority = priority;
				bestKey = key;
			}
		}

		// Reconstruct the path from the selected items
		const bestSelection = selected.get(bestKey) || new Array(n).fill(false);
		const selectedPlaces = items.filter((_, i) => bestSelection[i]);

		// Sort selected places based on their original order in the path
		selectedPlaces.sort((a, b) => a.originalIndex - b.originalIndex);

		const finalPath = [
			startIndex,
			...selectedPlaces.map((p) => p.index),
			endIndex,
		];

		// Calculate final time
		let totalTime = 0;
		for (let i = 0; i < finalPath.length - 1; i++) {
			totalTime += timeMatrix[finalPath[i]][finalPath[i + 1]].time;
		}

		return {
			path: finalPath,
			totalTime,
		};
	}
}

export { TripRouteService };
