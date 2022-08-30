import getConfig from 'next/config';
import { AddCartItemsRequest, DeleteCartItemRequest, PutCartItemRequest } from '@/typings/cartTypes';

const { commerceProxyURL } = getConfig().publicRuntimeConfig;

const REQUEST_OPTIONS: RequestInit = {
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
};

export const getProductsHash = async (): Promise<{ [key: string]: Type.Product }> => {
  const response = await fetch(`${commerceProxyURL}/api/products/get-hash`);
  if (!response.ok) throw new Error('get products hash request error');
  return response.json();
};

export const getProductById = async (id: number): Promise<Type.Product | null> => {
  const response = await fetch(`${commerceProxyURL}/api/products/get-by-id?id=${id}`);
  if (!response.ok) throw new Error('get products by ids request error');
  return response.json();
};

export const getPaginatedProducts = async ({
  keyword = '',
  category = '',
  brand = '',
  page = 1,
  params = '',
  limit = 9,
}: {
  keyword?: string;
  category?: string;
  brand?: string;
  page?: number;
  params?: string | string[];
  limit?: number;
}): Promise<{ data: Type.Product[]; pagination: Type.PaginationType }> => {
  const getParams = params?.toString().split('-');
  const [sort = '', direction = ''] = getParams || [];

  const response = await fetch(
    `${commerceProxyURL}/api/products/get?keyword=${keyword}&sort=${sort}&direction=${direction}&category=${category}&brand=${brand}&page=${page}${
      limit ? `&limit=${limit}` : ''
    }`
  );

  if (!response.ok) throw new Error('get paginated products request error');

  const { data, meta } = await response.json();

  return { data, pagination: meta.pagination };
};

export const getCartProducts = () =>
  fetch(`${commerceProxyURL}/api/cart`, {
    ...REQUEST_OPTIONS,
    method: 'get',
  });

export const addToCart = (body: AddCartItemsRequest) =>
  fetch(`${commerceProxyURL}/api/cart`, {
    ...REQUEST_OPTIONS,
    method: 'post',
    body: JSON.stringify(body),
  });

export const updateCart = (body: PutCartItemRequest) =>
  fetch(`${commerceProxyURL}/api/cart`, {
    ...REQUEST_OPTIONS,
    method: 'put',
    body: JSON.stringify(body),
  });

export const removeFromCart = (body: DeleteCartItemRequest) =>
  fetch(`${commerceProxyURL}/api/cart`, {
    ...REQUEST_OPTIONS,
    method: 'delete',
    body: JSON.stringify(body),
  });
