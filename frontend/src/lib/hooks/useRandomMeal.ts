import { useQuery } from "@tanstack/vue-query";
import { CACHE_TIME_DAY } from "../constants";
import { fetchRandomMeal } from "../services/meal-service";
import { MealDetails } from "../types";

/**
 * A Vue Query hook to fetch a random meal.
 * @returns An object with data, isLoading, isError, and error properties.
 **/

export const useRandomMeal = () => {
  const { data, isLoading, error, isError } = useQuery<MealDetails | null>({
    queryKey: ["randomMeal"],
    queryFn: () => fetchRandomMeal(),
    cacheTime: CACHE_TIME_DAY,
  });

  return {
    data: data ?? null,
    isLoading,
    error,
    isError,
  };
};
