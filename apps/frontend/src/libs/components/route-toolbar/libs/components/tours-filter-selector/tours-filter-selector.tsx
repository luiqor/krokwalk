import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";

import { useAppSelector } from "~/libs/hooks/hooks.js";
import { PlacesFilteringOptions } from "~/pages/root/libs/enums/enums.js";
import { useEntityFilter } from "~/libs/hooks/use-entity-filter/use-entity-filter.js";

import { TripDetailsProps } from "../../types/types.js";
import { PlacesFilterSelector } from "../places-filter-selector/places-filter-selector.js";

type Props = {
  onSetValue: UseFormSetValue<TripDetailsProps>;
};

const ToursFilterSelector: React.FC<Props> = ({ onSetValue }) => {
  const { tours, status } = useAppSelector((state) => state.tours);

  const { selectedEntities: selectedTours, toggleEntity: toggleTag } =
    useEntityFilter({
      entities: tours,
      status,
      filteringOption: PlacesFilteringOptions.TOURS,
    });

  useEffect(() => {
    onSetValue(
      "tours",
      selectedTours.map(({ slug }) => slug)
    );
  }, [selectedTours, onSetValue]);

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
