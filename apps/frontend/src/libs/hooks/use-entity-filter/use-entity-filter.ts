import { useEffect, useState } from "react";
import { useURLSearchParams } from "~/libs/hooks/hooks.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { UrlFriendlyEntity } from "~/libs/types/types.js";
import { PlacesFilteringOptions } from "~/pages/root/libs/enums/places-filtering-options.enum.js";

type Params = {
  entities: UrlFriendlyEntity[];
  status: (typeof DataStatus)[keyof typeof DataStatus];
  filteringOption: (typeof PlacesFilteringOptions)[keyof typeof PlacesFilteringOptions];
};

const useEntityFilter = ({ entities, status, filteringOption }: Params) => {
  const [currentQueryParams, setQueryParams] = useURLSearchParams();
  const [selectedEntities, setSelectedEntities] = useState<UrlFriendlyEntity[]>(
    []
  );

  const toggleEntity = (entity: UrlFriendlyEntity) => {
    setSelectedEntities((previousEntities) => {
      if (previousEntities.includes(entity)) {
        return previousEntities.filter(
          (filteredEntity) => filteredEntity !== entity
        );
      }

      return [...previousEntities, entity];
    });
  };

  useEffect(() => {
    if (status !== DataStatus.FULFILLED) return;

    const initialTitles = currentQueryParams
      .getAll(filteringOption)
      .map((slug) => slug);

    const initialEntities = entities.filter((entity) =>
      initialTitles.includes(entity.slug)
    );

    setSelectedEntities(initialEntities);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    if (status !== DataStatus.FULFILLED) return;

    const entityTitles = selectedEntities.map((entity) => entity.slug);
    setQueryParams({ [filteringOption]: entityTitles });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEntities]);

  return {
    selectedEntities,
    toggleEntity,
  };
};

export { useEntityFilter };
