import { Ref } from "vue";

export type TypographyVariant =
  | "xxl-title"
  | "xl-title"
  | "l-title"
  | "navigation"
  | "quote"
  | "sale"
  | "step"
  | "body"
  | "body-big"
  | "body-small"
  | "collapsible"
  | "collapsible-title";

export interface SearchMeals {
  query?: string;
  category?: string;
  area?: string;
  ingredient?: string;
}

interface QueryResult<T> {
  isLoading: Ref<false> | Ref<true>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
  data: Ref<T> | Ref<undefined>;
  isError: Ref<false> | Ref<true>;
  refetch: () => void;
  isSuccess: Ref<false> | Ref<true>;
}

export type FetchSuggestionsResult = QueryResult<Meal[]>;

export type SearchMealsResult = QueryResult<MealDetails[]>;

export type SearchMealResult = QueryResult<MealDetails>;

export interface Meal {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

export interface MealDetails extends Meal {
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strTags: string;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string | null;
  strIngredient17: string | null;
  strIngredient18: string | null;
  strIngredient19: string | null;
  strIngredient20: string | null;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string | null;
  strMeasure17: string | null;
  strMeasure18: string | null;
  strMeasure19: string | null;
  strMeasure20: string | null;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
}
