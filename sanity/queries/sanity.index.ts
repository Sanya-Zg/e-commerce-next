import { sanityFetch } from '@/sanity/lib/live';
import {
  ALL_BLOGS_QUERIES,
  BRAND_QUERY,
  BRANDS_QUERY,
  get_product_by_slug,
} from '@/sanity/queries/sanity.queries';

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await sanityFetch({
      query: get_product_by_slug,
      params: { slug },
    });
    return product.data || null;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
};

export const getAllBrands = async () => {
  try {
    const { data } = await sanityFetch({ query: BRANDS_QUERY });
    return data ?? [];
  } catch (error) {
    console.log('Error fetching all brands:', error);
    return [];
  }
};

export const getCategories = async (quantity?: number) => {
  try {
    const query = quantity
      ? `*[_type == 'category'] | order(name asc) [0...$quantity] {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`
      : `*[_type == 'category'] | order(name asc) {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`;
    const { data } = await sanityFetch({
      query,
      params: quantity ? { quantity } : {},
    });
    return data;
  } catch (error) {
    console.log('Error fetching categories', error);
    return [];
  }
};

export const getAllBlogs = async () => {
  try {
    const { data } = await sanityFetch({ query: ALL_BLOGS_QUERIES });
    return data ?? [];
  } catch (error) {
    console.log('Error fethcing all Blogs', error);
    return [];
  }
};
