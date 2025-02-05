import { useEffect, useState } from "react";

import { useAppSelector, useURLSearchParams } from "~/libs/hooks/hooks.js";
import { PlacesFilteringOptions } from "~/pages/root/libs/enums/enums.js";
import { TitledEntity } from "~/libs/types/types.js";

import { PlacesFilterSelector } from "../places-filter-selector/places-filter-selector.js";

const TagFilterSelector = () => {
  const { tags } = useAppSelector((state) => state.tags);
  const [currentQueryParams, setQueryParams] = useURLSearchParams();
  const [selectedTags, setSelectedTags] = useState<TitledEntity[]>([]);

  const toggleTag = (tag: TitledEntity) => {
    setSelectedTags((previousTags) => {
      if (previousTags.includes(tag)) {
        return previousTags.filter((filteredTag) => filteredTag !== tag);
      }

      return [...previousTags, tag];
    });
  };

  useEffect(() => {
    const initialTagTitles = currentQueryParams
      .getAll(PlacesFilteringOptions.TAGS)
      .map((title) => title.toLowerCase());

    const initialTags = tags.filter((tag) =>
      initialTagTitles.includes(tag.title.toLowerCase())
    );

    setSelectedTags(initialTags);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const tagTitles = selectedTags.map((tag) => tag.title.toLowerCase());
    setQueryParams({ [PlacesFilteringOptions.TAGS]: tagTitles });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTags]);

  return (
    <PlacesFilterSelector
      entityTitle="tags"
      entities={tags}
      selectedEntities={selectedTags}
      onEntityClicked={toggleTag}
    />
  );
};

export { TagFilterSelector };
