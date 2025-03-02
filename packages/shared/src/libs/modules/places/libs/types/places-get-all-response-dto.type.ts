import { type PlaceDto } from "./place-dto.type";

type PlacesGetAllResponseDto = { items: Omit<PlaceDto, "tags" | "tours">[] };

export { type PlacesGetAllResponseDto };
