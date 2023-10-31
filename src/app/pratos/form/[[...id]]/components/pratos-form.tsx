'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import AddButton from '@/components/button/add-button';
import PageContainer from '@/components/containers/page-container';
import CheckboxFormField from '@/components/fields/checkbox-form-field';
import NumberFormField from '@/components/fields/number-form-field';
import TextFormField from '@/components/fields/text-form-field';

import IngredientModal from './ingredient-modal';
import IngredientsGrid from './ingredients-grid';

import { TProduct, TForm } from '@/types';
import { pratosFormSchema } from '@/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Box, Typography } from '@mui/material';

export default function PratosForm({
  id,
  data,
  onSubmit,
  isFetching,
  isPending,
}: TForm<TProduct>) {
  const [openIngredientModal, setOpenIngredientModal] =
    useState<boolean>(false);
  const {
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TProduct>({
    resolver: zodResolver(pratosFormSchema),
  });

  useEffect(() => reset(data), [data]);

  return (
    <>
      <IngredientModal
        setValue={setValue}
        getValues={getValues}
        open={openIngredientModal}
        setOpen={setOpenIngredientModal}
      />

      <PageContainer component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4">
          {id?.length ? 'Editar' : 'Cadastrar'} prato
        </Typography>

        <Box sx={{ display: 'flex', gap: 4 }}>
          <TextFormField<TProduct>
            sx={{ flex: 1 }}
            name="name"
            label="Nome"
            control={control}
            error={errors.name}
            showSkeleton={isFetching}
            isSubmitting={isPending}
          />

          <TextFormField<TProduct>
            sx={{ flex: 1 }}
            name="description"
            label="Descrição"
            control={control}
            error={errors.description}
            showSkeleton={isFetching}
            isSubmitting={isPending}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 4 }}>
          <NumberFormField<TProduct>
            sx={{ flex: 1 }}
            name="price"
            label="Preço"
            prefix="R$ "
            decimalScale={2}
            fixedDecimalScale
            control={control}
            error={errors.price}
            showSkeleton={isFetching}
            isSubmitting={isPending}
          />

          <TextFormField<TProduct>
            sx={{ flex: 1 }}
            name="imageUrl"
            label="URL da imagem"
            control={control}
            error={errors.imageUrl}
            showSkeleton={isFetching}
            isSubmitting={isPending}
          />

          <CheckboxFormField<TProduct>
            control={control}
            label="Possui modelo 3D"
            name="has3dModel"
            showSkeleton={isFetching}
            isSubmitting={isPending}
          />

          <TextFormField<TProduct>
            sx={{ flex: 1 }}
            name="unityModelId"
            label="ID modelo Unity"
            control={control}
            disabled={!watch('has3dModel')}
            error={errors.unityModelId}
            showSkeleton={isFetching}
            isSubmitting={isPending}
          />
        </Box>

        <Typography variant="h5">Fatores Nutricionais</Typography>

        <Box sx={{ display: 'flex', gap: 4 }}>
          <NumberFormField<TProduct>
            sx={{ flex: 1 }}
            name="nutritionFacts.carbohydrate"
            label="Carboidrato (g)"
            suffix=" grama(s)"
            control={control}
            error={errors.nutritionFacts?.carbohydrate}
            showSkeleton={isFetching}
            isSubmitting={isPending}
          />

          <NumberFormField<TProduct>
            sx={{ flex: 1 }}
            name="nutritionFacts.protein"
            label="Proteína (g)"
            suffix=" grama(s)"
            control={control}
            error={errors.nutritionFacts?.protein}
            showSkeleton={isFetching}
            isSubmitting={isPending}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 4 }}>
          <NumberFormField<TProduct>
            sx={{ flex: 1 }}
            name="nutritionFacts.totalFat"
            label="Total de gordura (g)"
            suffix=" grama(s)"
            control={control}
            error={errors.nutritionFacts?.totalFat}
            showSkeleton={isFetching}
            isSubmitting={isPending}
          />

          <NumberFormField<TProduct>
            sx={{ flex: 1 }}
            name="nutritionFacts.totalCalories"
            label="Total de calorías (kcal)"
            suffix=" kcal"
            control={control}
            error={errors.nutritionFacts?.totalCalories}
            showSkeleton={isFetching}
            isSubmitting={isPending}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5">Ingredientes</Typography>

          <AddButton
            text="Novo ingrediente"
            variant="contained"
            onClick={() => setOpenIngredientModal(true)}
          />
        </Box>

        <Box
          sx={{
            height: '400px',
            display: 'flex',
          }}
        >
          <IngredientsGrid data={getValues('ingredients')} />
        </Box>

        <Box
          sx={{
            mt: 'auto',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <LoadingButton
            variant="contained"
            size="large"
            type="submit"
            loading={isPending}
          >
            Salvar
          </LoadingButton>
        </Box>
      </PageContainer>
    </>
  );
}
