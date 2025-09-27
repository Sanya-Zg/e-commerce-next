import { sanityFetch } from '@/sanity/lib/live';
import { get_product_by_slug } from './sanity.queries';

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
