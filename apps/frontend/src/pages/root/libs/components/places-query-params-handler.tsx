import { useEffect } from "react";

import { useAppDispatch, useURLSearchParams } from "~/libs/hooks/hooks.js";
import { actions as placesActions } from "~/modules/places/places.js";
import { actions as tagsActions } from "~/modules/tags/tags.js";
import { actions as toursActions } from "~/modules/tours/tours.js";
import { PlacesFilteringOptions } from "../enums/enums.js";

const HALF_SECOND = 500;

const PlacesQueryParamsHandler = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useURLSearchParams();

  useEffect(() => {
    const tours = searchParams.getAll(PlacesFilteringOptions.TOURS);
    const tags = searchParams.getAll(PlacesFilteringOptions.TAGS);

    const placesLoadTimeout = setTimeout(() => {
      dispatch(placesActions.loadPlaces({ tours, tags }));
    }, HALF_SECOND);

    return () => clearTimeout(placesLoadTimeout);
  }, [dispatch, searchParams]);

  useEffect(() => {
    dispatch(tagsActions.loadTags());
    dispatch(toursActions.loadTours());
  }, [dispatch]);

  return null;
};

export { PlacesQueryParamsHandler };
''