import { useEffect, useState } from "react";
import { useURLSearchParams } from "~/libs/hooks/hooks.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { TitledEntity } from "~/libs/types/types.js";
import { PlacesFilteringOptions } from "~/pages/root/libs/enums/places-filtering-options.enum.js";

type Params = {
  entities: TitledEntity[];
  status: (typeof DataStatus)[keyof typeof DataStatus];
  filteringOption: (typeof PlacesFilteringOptions)[keyof typeof PlacesFilteringOptions];
};

const useEntityFilter = ({ entities, status, filteringOption }: Params) => {
  const [currentQueryParams, setQueryParams] = useURLSearchParams();
  const [selectedEntities, setSelectedEntities] = useState<TitledEntity[]>([]);

  const toggleEntity = (entity: TitledEntity) => {
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
      .map((title) => title.toLowerCase());

    const initialEntities = entities.filter((entity) =>
      initialTitles.includes(entity.title.toLowerCase())
    );

    setSelectedEntities(initialEntities);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    if (status !== DataStatus.FULFILLED) return;

    const entityTitles = selectedEntities.map((entity) =>
      entity.title.toLowerCase()
    );
    setQueryParams({ [filteringOption]: entityTitles });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEntities]);

  return {
    selectedEntities,
    toggleEntity,
  };
};

export { useEntityFilter };
