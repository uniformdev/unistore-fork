import { createBigCommerceClient, ProductResult } from '@uniformdev/canvas-bigcommerce';
import { fetchAndRetry } from './fetchAndRetry';

export const bigCommerceClient = createBigCommerceClient({
  storeHash: process.env.BIGCOMMERCE_STORE_HASH!,
  token: process.env.BIGCOMMERCE_TOKEN!,
});
