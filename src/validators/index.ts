import { messages } from '@/utils/messages';
import { z } from 'zod';

const { required, url } = messages;

const nutritionFactsZod = z.object({
  carbohydrate: z.number().optional(),
  protein: z.number().optional(),
  totalFat: z.number().optional(),
  totalCalories: z.number().optional(),
});

export const ingredientZod = z.object({
  name: z.string({ required_error: required }),
  quantity: z.number({
    required_error: required,
    invalid_type_error: required,
  }),
  nutritionFacts: nutritionFactsZod
    .refine((data) => data.carbohydrate || data.totalCalories, {
      message: required,
      path: ['carbohydrate'],
    })
    .refine((data) => data.protein || data.totalCalories, {
      message: required,
      path: ['protein'],
    })
    .refine((data) => data.totalFat || data.totalCalories, {
      message: required,
      path: ['totalFat'],
    }),
});

export const pratosFormSchema = z
  .object({
    id: z.string().optional(),
    name: z.string({ required_error: required }),
    description: z.string({ required_error: required }),
    price: z.number({ required_error: required, invalid_type_error: required }),
    imageUrl: z.string({ required_error: required }).url({ message: url }),
    unityModelId: z.string().nullish(),
    has3dModel: z.boolean().default(false),
    nutritionFacts: nutritionFactsZod,
    ingredients: z.array(ingredientZod).optional().default([]),
  })
  .refine(
    (data) =>
      data.ingredients?.length ||
      data.nutritionFacts?.carbohydrate ||
      data.nutritionFacts?.totalCalories,
    {
      message: required,
      path: ['nutritionFacts.carbohydrate'],
    },
  )
  .refine(
    (data) =>
      data.ingredients?.length ||
      data.nutritionFacts?.protein ||
      data.nutritionFacts?.totalCalories,
    {
      message: required,
      path: ['nutritionFacts.protein'],
    },
  )
  .refine(
    (data) =>
      data.ingredients?.length ||
      data.nutritionFacts?.totalFat ||
      data.nutritionFacts?.totalCalories,
    {
      message: required,
      path: ['nutritionFacts.totalFat'],
    },
  );

export const mesasFormSchema = z.object({
  id: z.string().optional(),
  activeToken: z.string().optional(),
  tableNum: z.number({
    required_error: required,
    invalid_type_error: required,
  }),
  seatNum: z.number({
    required_error: required,
    invalid_type_error: required,
  }),
});
