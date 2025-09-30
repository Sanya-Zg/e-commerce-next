'use client'
import AllCategories from '@/components/AllCategories';
import {
  BeautifullInspiration,
  InformComponent,
  MainBanner,
  ProductGrid,
} from '@/components/index';
import { useRef } from 'react';

const Home = () => {

  const productGridRef = useRef<HTMLDivElement | null>(null);

  const scrollToProducts = () => {
  if (productGridRef.current) {
    const top = productGridRef.current.getBoundingClientRect().top + window.scrollY; 
    window.scrollTo({
      top: top - 120, 
      behavior: 'smooth',
    });
  }
};
  return (
    <div className="flex flex-col gap-14">
      <MainBanner />
      <AllCategories onCategoryClick={scrollToProducts} />
      <div ref={productGridRef}>
        <ProductGrid />
      </div>
      
      <BeautifullInspiration />
      <InformComponent />
    </div>
  );
};
export default Home;
