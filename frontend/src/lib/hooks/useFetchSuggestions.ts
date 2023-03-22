import { useQuery } from "@tanstack/vue-query";
import { CACHE_TIME } from "../constants";
import { fetchSuggestions } from "../services/meal-service";
import { FetchSuggestionsResult, SearchMeals } from "../types";

/**
 * A Vue Query hook to fetch meal suggestions based on the provided category.
 * @param searchParams A string containing the meal category to fetch suggestions for.
 * @returns An object with data, isLoading, isError, error, and refetch properties.
 */

export const useFetchSuggestions = (
  searchParams: SearchMeals["category"]
): FetchSuggestionsResult => {
  const { data, ...rest } = useQuery({
    queryKey: ["suggestions", searchParams],
    queryFn: () => fetchSuggestions(searchParams),
    enabled: !!searchParams,
    cacheTime: CACHE_TIME,
  });

  return {
    data: data ?? null,
    ...rest,
  };
};
