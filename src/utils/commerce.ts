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
