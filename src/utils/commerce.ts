import getConfig from 'next/config';
import { AddCartItemsRequest, DeleteCartItemRequest, PutCartItemRequest } from '@/typings/cartTypes';

const { commerceProxyURL } = getConfig().publicRuntimeConfig;

const REQUEST_OPTIONS: RequestInit = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
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
