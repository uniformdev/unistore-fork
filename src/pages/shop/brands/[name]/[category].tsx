import React from 'react';
import type { NextPage } from 'next';
import { enhance, RootComponentInstance } from '@uniformdev/canvas';
import { createCategoriesBrandsEnhancers } from '@/utils/enhancers';
import { getTopNavCategoryLinks } from '@/utils/navUtils';
import { getCompositionBySlug } from '@/utils/canvas';
import { sluggify } from '@/utils/stringUtils';
import { getBrands, getCategories } from '@/utils/commerce';
import { NavLinkProp } from '@/components/atoms/NavLink';
import CommonPageContainer from '@/components/containers/CommonContainer';

const ShopCategoryBrand: NextPage<{
  composition: RootComponentInstance;
  topNavCategoryLinks: Array<NavLinkProp>;
  preview: boolean;
}> = props => <CommonPageContainer {...props} />;

export const getStaticPaths = async () => {
  const brands = await getBrands();
  const categories: Array<Category.CategoryShort> = (await getCategories()) || [];
  // add known "shop all" category
  const shopAll: Category.CategoryShort = { id: 23, name: 'Shop All', url: '/shop-all/', parent_id: 0 };
  categories.push(shopAll);

  if (!brands || !categories) {
    return {
      paths: [],
      fallback: false,
    };
  }

  const paths: string[] = [];

  brands.forEach(brand => {
    categories.forEach(category => {
      paths.push(`/shop/brands/${sluggify(brand.name)}/${sluggify(category.name)}`);
    });
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const { name } = context?.params || {};
  const { preview } = context;

  const [categorySpecificComposition, categoryTemplateComposition] = await Promise.all([
    getCompositionBySlug(`product-category-${name}`, preview).catch(compositionExceptionHandler),
    getCompositionBySlug('product-category', preview).catch(compositionExceptionHandler),
  ]);

  const composition = categorySpecificComposition ?? categoryTemplateComposition;

  if (!composition) {
    throw new (Error as any)('Composition not found.');
  }
  const enhancers = createCategoriesBrandsEnhancers();

  await enhance({ composition, enhancers, context: { preview } });

  return {
    props: {
      composition,
      topNavCategoryLinks: await getTopNavCategoryLinks(),
      preview: preview || false,
    },
  };
};

const compositionExceptionHandler = (e: { statusCode: number | undefined }) => {
  if (e.statusCode === 404) {
    return null;
  }

  throw e;
};

export default ShopCategoryBrand;
