import { useEffect } from "react";

import { useAppDispatch, useURLSearchParams } from "~/libs/hooks/hooks.js";
import { actions as placesActions } from "~/modules/places/places.js";
import { actions as tagsActions } from "~/modules/tags/tags.js";
import { PlacesFilteringOptions } from "../enums/enums.js";

const PlacesQueryParamsHandler = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useURLSearchParams();

  useEffect(() => {
    const tours = searchParams.getAll(PlacesFilteringOptions.TOURS);
    const tags = searchParams.getAll(PlacesFilteringOptions.TAGS);

    dispatch(placesActions.loadPlaces({ tours, tags }));
  }, [dispatch, searchParams]);

  useEffect(() => {
    dispatch(tagsActions.loadTags());
  }, [dispatch]);

  return null;
};

export { PlacesQueryParamsHandler };
