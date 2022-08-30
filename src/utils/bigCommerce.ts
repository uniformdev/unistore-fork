import { BrandResult, CategoryResult, createBigCommerceClient, ProductResult } from '@uniformdev/canvas-bigcommerce';
import { fetchAndRetry } from './fetchAndRetry';
import getCategoriesPreval from '../preval/getCategories.preval';
import getBrandsPreval from '../preval/getBrands.preval';

export const bigCommerceClient = createBigCommerceClient({
  storeHash: process.env.BIGCOMMERCE_STORE_HASH!,
  token: process.env.BIGCOMMERCE_TOKEN!,
});

export async function getCategories(): Promise<CategoryResult[]> {
  return getCategoriesPreval;
}

export async function getBrands(): Promise<BrandResult[]> {
  return getBrandsPreval;
}

export async function getProductsByCategory(categories: string[] | undefined): Promise<ProductResult[]> {
  const { products: relatedProducts } = await fetchAndRetry(async () =>
    bigCommerceClient.getProducts({
      include: ['variants', 'images'],
      categories: categories,
    })
  );
  return relatedProducts;
}
