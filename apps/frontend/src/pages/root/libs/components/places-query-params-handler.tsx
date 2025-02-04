import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useAppDispatch } from "~/libs/hooks/hooks.js";
import { actions as placesActions } from "~/modules/places/places.js";
import { PlacesFilteringOptions } from "../enums/enums.js";

const useURLSearchParams = () => {
  return new URLSearchParams(useLocation().search);
};

const PlacesQueryParamsHandler = () => {
  const dispatch = useAppDispatch();
  const currentQueryParams = useURLSearchParams();

  useEffect(() => {
    const tours = currentQueryParams.getAll(PlacesFilteringOptions.TOURS);
    const tags = currentQueryParams.getAll(PlacesFilteringOptions.TAGS);

    dispatch(placesActions.loadPlaces({ tours, tags }));
  }, [dispatch, currentQueryParams]);

  return null;
};

export { PlacesQueryParamsHandler };
