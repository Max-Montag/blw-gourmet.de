export interface IngredientError {
  ingredient?: string;
  amount?: string;
  unit?: string;
}

export interface InstructionError {
  name?: string;
  instruction?: string;
  ingredients?: IngredientError[];
  tools?: string[];
}

export interface RecipeError {
  name?: string;
  description?: string;
  dining_times?: string[];
  preparation_time?: string;
  rest_time?: string;
  labels?: string[];
  ingredients?: IngredientError[];
  tools?: string[];
  instructions?: InstructionError[];
  optimized_image?: string;
}
