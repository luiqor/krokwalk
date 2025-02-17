import {
  Add,
  LocationSearching,
  MyLocation,
  PersonPinCircle,
  Place,
  SvgIconComponent,
  Tag,
} from "@mui/icons-material";
import { type IconName } from "../types/types.js";

const iconNameToSvg: Record<IconName, SvgIconComponent> = {
  destinationPoint: Place,
  startingPoint: PersonPinCircle,
  tag: Tag,
  plus: Add,
  place: Place,
  untrackedMyLocation: LocationSearching,
  trackedMyLocation: MyLocation,
};

export { iconNameToSvg };
