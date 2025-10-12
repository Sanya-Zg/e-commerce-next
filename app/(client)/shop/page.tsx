
import { InformComponent, Shop, Breadcrumbs } from '@/components/index';
import { getAllBrands, getCategories } from '@/sanity/queries/sanity.index';

const ShopPage = async () => {
  const categories = await getCategories();
  const brands = await getAllBrands();
  return (
    <div>
      <Breadcrumbs />
      <Shop categories={categories} brands={brands} />
      <InformComponent />
    </div>
  );
};
export default ShopPage;
