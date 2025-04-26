import { v4 as uuidv4 } from "uuid";
import { ValueOf } from "shared";

import { type Entity } from "~/libs/types/types";

import { VisitStatus } from "./libs/enums/enums";

type UserPlacesEntityParameters = {
	id: null | string;
	visitedAt: null | string;
	visitStatus: ValueOf<typeof VisitStatus>;
	userId: string;
	placeId: string;
	createdAt: string;
	updatedAt: string;
};

class UserPlacesEntity implements Entity {
	private id: null | string;

	private visitedAt: null | string;

	private visitStatus: ValueOf<typeof VisitStatus>;

	private userId: string;

	private placeId: string;

	private createdAt: string;

	private updatedAt: string;

	private constructor({
		id,
		visitStatus,
		visitedAt,
		userId,
		placeId,
		createdAt,
		updatedAt,
	}: UserPlacesEntityParameters) {
		this.id = id;
		this.visitStatus = visitStatus;
		this.visitedAt = visitedAt;
		this.userId = userId;
		this.placeId = placeId;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public static initializeNew({
		visitStatus,
		userId,
		placeId,
		visitedAt = null,
	}: {
		visitStatus: ValueOf<typeof VisitStatus>;
		userId: string;
		placeId: string;
		visitedAt?: null | string;
	}): UserPlacesEntity {
		return new UserPlacesEntity({
			id: uuidv4(),
			visitStatus,
			userId,
			placeId,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			visitedAt,
		});
	}

	public static initialize({
		id,
		visitStatus,
		userId,
		placeId,
		createdAt,
		updatedAt,
		visitedAt,
	}: UserPlacesEntityParameters): UserPlacesEntity {
		return new UserPlacesEntity({
			id,
			userId,
			placeId,
			visitStatus,
			createdAt,
			updatedAt,
			visitedAt,
		});
	}

	public toObject(): {
		id: string;
		userId: string;
		placeId: string;
		visitStatus: ValueOf<typeof VisitStatus>;
		visitedAt: null | string;
		createdAt: string;
		updatedAt: string;
	} {
		return {
			id: this.id as string,
			userId: this.userId,
			placeId: this.placeId,
			visitStatus: this.visitStatus,
			visitedAt: this.visitedAt,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}

	public toUserObject(): {
		id: string;
		placeId: string;
		visitStatus: ValueOf<typeof VisitStatus>;
		visitedAt: null | string;
		createdAt: string;
		updatedAt: string;
	} {
		return {
			id: this.id as string,
			placeId: this.placeId,
			visitStatus: this.visitStatus,
			visitedAt: this.visitedAt,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}

	public toNewObject = this.toObject;
}

export { UserPlacesEntity };
