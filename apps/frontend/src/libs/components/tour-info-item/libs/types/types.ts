import type { PlaceDto } from "~/modules/places/places.js";

type ToursArr = { data: Omit<PlaceDto, "tags" | "tours">[] };

export type { ToursArr };
