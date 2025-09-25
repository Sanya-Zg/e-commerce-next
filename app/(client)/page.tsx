import AllCategories from '@/components/AllCategories';
import {
  BeautifullInspiration,
  InformComponent,
  MainBanner,
  ProductGrid,
} from '@/components/index';

const Home = () => {
  return (
    <div className="flex flex-col gap-14">
      <MainBanner />
      <AllCategories />
      <ProductGrid />
      <BeautifullInspiration />
      <InformComponent />
    </div>
  );
};
export default Home;
