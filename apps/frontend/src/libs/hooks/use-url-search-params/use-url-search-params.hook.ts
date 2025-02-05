import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useURLSearchParams = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const setSearchParams = useCallback(
    (params: Record<string, string[]>) => {
      const newSearchParams = new URLSearchParams(location.search);

      Object.keys(params).forEach((key) => {
        newSearchParams.delete(key);
        params[key].forEach((value) => {
          newSearchParams.append(key, value);
        });
      });

      navigate(`${location.pathname}?${newSearchParams.toString()}`, {
        replace: true,
      });
    },
    [location, navigate]
  );

  return [searchParams, setSearchParams] as const;
};

export { useURLSearchParams };
