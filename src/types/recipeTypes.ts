export interface Ingredient {
  ingredient: string;
  amount: number;
  unit: string;
}

export interface Instruction {
  name: string;
  ingredients: Ingredient[];
  tools: string[];
  instruction: string;
}

export interface RecipeData {
  name: string | null;
  url: string;
  description: string | null;
  published: boolean;
  labels: string[];
  ingredients: Ingredient[];
  tools: string[];
  instructions: Instruction[];
  dining_times: string[];
  preparation_time: number | null;
  rest_time: number | null;
  optimized_image?: string | null;
}

export interface RecipePreview {
  name: string;
  url: string;
  description: string;
  preparation_time: number | null;
  rest_time: number | null;
  dining_times: string[];
  labels: string[];
  thumbnail: string | null;
}

export interface AdminRecipePreview {
  name: string;
  url: string;
  description: string | null;
  creation_time: string | null;
  last_changed: string | null;
  owner: number | null;
  dining_times: string[];
  labels: string[];
  thumbnail: string | null;
}

export interface RecipeComment {
  id: string;
  author: string;
  created_at: string;
  content: string;
}
