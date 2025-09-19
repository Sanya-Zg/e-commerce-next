import AllCategories from '@/components/AllCategories';
import { MainBanner, ProductGrid} from '@/components/index';

const Home = () => {
  return (
    <>
      <MainBanner />
      <div className='mt-14'>
        <AllCategories />
      </div>
      <div className='mt-14'>
        <ProductGrid />
      </div>
      
    </>
  );
};
export default Home;
