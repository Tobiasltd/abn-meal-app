import apiClient from "../http/axios";
import { SearchMeals } from "../types";

/**
 * Handles error responses from the server.
 * If the error response status is 404, throw a new error with a message.
 * Otherwise, log the error and throw a new error with a message.
 * @param error Error object thrown by Axios.
 * @returns A never type, meaning that a value is never returned from this function.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleError = (error: any): never => {
  // Check if the error response status is 404, then throw a new error with a message.
  if (error.response?.status === 404) {
    throw new Error(`No meal found. Please try another search term.`);
  }
  // Otherwise, log the error and throw a new error with a message.
  console.error(error);
  throw new Error("An unexpected error occurred while fetching meal.");
};

/**
 * Fetches a random meal from the server.
 * @returns A Promise that resolves to the fetched meal.
 */
export const fetchRandomMeal = async () => {
  try {
    const response = await apiClient.get("/meals/random");
    return response.data.data;
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Searches for meals based on the provided search parameters.
 * @param searchParams An object of type SearchMeals containing search parameters.
 * @returns A Promise that resolves to an array of meals that match the search criteria.
 */
export const searchMeals = async (searchParams: SearchMeals) => {
  try {
    const response = await apiClient.get("/meals", { params: searchParams });
    return response.data.data;
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Searches for a meal with the provided ID.
 * @param id A string representing the ID of the meal to search for.
 * @returns A Promise that resolves to the meal with the provided ID.
 */
export const searchMealById = async (id: string) => {
  try {
    const response = await apiClient.get(`/meals/${id}`);
    return response.data.data;
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Fetches meal suggestions within the provided category.
 * @param category A string representing the category to fetch meal suggestions for.
 * @returns A Promise that resolves to an array of meals in the provided category.
 */
export const fetchSuggestions = async (category: SearchMeals["category"]) => {
  try {
    const response = await apiClient.get("/meals/suggestions", {
      params: { category },
    });
    return response.data.data;
  } catch (error) {
    return handleError(error);
  }
};
