'use client';

import { useRouter } from 'next/navigation';

import PratosForm from './components/pratos-form';

import {
  TGet,
  TPost,
  TPostReturn,
  TPratosForm,
  TProduct,
  TRequestError,
} from '@/types';
import { Api } from '@/utils/axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';

export default function PratosFormPage({ params: { id } }: TPratosForm) {
  const hasId = Boolean(id && id[0]);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { data, isFetching } = useQuery<TGet<TProduct>>({
    queryKey: ['getProductList'],
    queryFn: () => Api.get(`/products/${id[0]}`).then((res) => res.data),
    enabled: hasId,
  });

  const { mutate, isPending } = useMutation<
    TPost<TPostReturn>,
    AxiosError<TRequestError>,
    TProduct
  >({
    mutationFn: (data) =>
      hasId
        ? Api.patch(`/products/${id.at(0)}`, data)
        : Api.post('/products', data),
    onSuccess: ({ data: { data } }) => {
      if (!hasId) {
        const { id } = data;

        router.push(`/pratos/form/${id}`);
      }

      enqueueSnackbar('Mesa salva com sucesso!', { variant: 'success' });
    },
    onError: (error) => {
      enqueueSnackbar(
        error?.response?.data.message || 'Falha ao salvar a mesa',
        {
          variant: 'error',
        },
      );
    },
  });

  return (
    <PratosForm
      id={id && id[0]}
      data={data?.data}
      isFetching={isFetching}
      isPending={isPending}
      onSubmit={(data) => mutate(data)}
    />
  );
}
