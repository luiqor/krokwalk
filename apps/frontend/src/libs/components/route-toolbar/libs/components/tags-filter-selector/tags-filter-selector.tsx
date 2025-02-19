import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";

import { useAppSelector } from "~/libs/hooks/hooks.js";
import { PlacesFilteringOptions } from "~/pages/root/libs/enums/enums.js";
import { useEntityFilter } from "~/libs/hooks/use-entity-filter/use-entity-filter.js";

import { PlacesFilterSelector } from "../places-filter-selector/places-filter-selector.js";
import { TripDetailsProps } from "../../types/types.js";

type Props = {
  onSetValue: UseFormSetValue<TripDetailsProps>;
};

const TagsFilterSelector: React.FC<Props> = ({ onSetValue }) => {
  const { tags, status } = useAppSelector((state) => state.tags);

  const { selectedEntities: selectedTags, toggleEntity: toggleTag } =
    useEntityFilter({
      entities: tags,
      status,
      filteringOption: PlacesFilteringOptions.TAGS,
    });

  useEffect(() => {
    onSetValue(
      "tags",
      selectedTags.map(({ slug }) => slug)
    );
  }, [selectedTags, onSetValue]);

  return (
    <PlacesFilterSelector
      entityTitle="tags"
      entities={tags}
      selectedEntities={selectedTags}
      onEntityClicked={toggleTag}
    />
  );
};

export { TagsFilterSelector };
