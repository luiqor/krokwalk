import { useAppSelector } from "~/libs/hooks/hooks.js";
import { PlacesFilteringOptions } from "~/pages/root/libs/enums/enums.js";

import { PlacesFilterSelector } from "../places-filter-selector/places-filter-selector.js";
import { useEntityFilter } from "~/libs/hooks/use-entity-filter/use-entity-filter.js";

const TagsFilterSelector: React.FC = () => {
  const { tags, status } = useAppSelector((state) => state.tags);

  const { selectedEntities: selectedTags, toggleEntity: toggleTag } =
    useEntityFilter({
      entities: tags,
      status,
      filteringOption: PlacesFilteringOptions.TAGS,
    });

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
