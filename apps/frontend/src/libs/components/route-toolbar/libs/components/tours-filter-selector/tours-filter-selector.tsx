import { useAppSelector } from "~/libs/hooks/hooks.js";
import { PlacesFilteringOptions } from "~/pages/root/libs/enums/enums.js";

import { PlacesFilterSelector } from "../places-filter-selector/places-filter-selector.js";
import { useEntityFilter } from "~/libs/hooks/use-entity-filter/use-entity-filter.js";

const ToursFilterSelector: React.FC = () => {
  const { tours, status } = useAppSelector((state) => state.tours);

  const { selectedEntities: selectedTours, toggleEntity: toggleTag } =
    useEntityFilter({
      entities: tours,
      status,
      filteringOption: PlacesFilteringOptions.TOURS,
    });

  return (
    <PlacesFilterSelector
      entityTitle="tours"
      entities={tours}
      selectedEntities={selectedTours}
      onEntityClicked={toggleTag}
    />
  );
};

export { ToursFilterSelector };
