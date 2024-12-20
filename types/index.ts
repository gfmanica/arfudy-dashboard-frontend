import { z } from 'zod';

import {
    ingredientZod,
    mesasFormSchema,
    pratosFormSchema
} from '@/utils/validators';

export type TGet<TData> = {
    data: TData;
};

export type TRequestError = {
    message: string;
    status: number;
};

export type TPratosForm = {
    params: Promise<{ id: string[] }>;
};

export type TProduct = z.infer<typeof pratosFormSchema>;

export type TTable = z.infer<typeof mesasFormSchema>;

export type TIngredient = z.infer<typeof ingredientZod>;

export type TPatch<TData> = {
    data: TData;
    id: string;
};

export type TPost<TPost> = {
    data: TPost;
};

export type TForm<TData> = {
    id: string | null;
    data?: TData;
    isFetching: boolean;
    isPending: boolean;
    onSubmit: (data: TData) => void;
};

export type TPostReturn<TData> = {
    message: string;
    data: TData;
};

export type TPatchReturn = {
    message: string;
};
