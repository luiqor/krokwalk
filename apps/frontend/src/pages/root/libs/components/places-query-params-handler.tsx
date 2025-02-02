import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useAppDispatch } from "~/libs/hooks/hooks.js";
import { actions as placesActions } from "~/modules/places/places.js";
import { PlacesFilteringOptions } from "../enums/enums.js";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const PlacesQueryParamsHandler = () => {
  const dispatch = useAppDispatch();
  const query = useQuery();

  useEffect(() => {
    const tours = query.getAll(PlacesFilteringOptions.TOURS);
    const tags = query.getAll(PlacesFilteringOptions.TAGS);

    console.log("tags", tags);

    dispatch(placesActions.loadPlaces({ tours, tags }));
  }, [dispatch, query]);

  return null;
};

export { PlacesQueryParamsHandler };
