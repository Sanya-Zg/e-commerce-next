import { Shop } from '@/components/index';
import { getAllBrands, getCategories } from '@/sanity/queries/sanity.index';

const ShopPage = async () => {
  const categories = await getCategories();
  const brands = await getAllBrands();
  return (
    <div>
      <Shop categories={categories} brands={brands} />
    </div>
  );
};
export default ShopPage;
