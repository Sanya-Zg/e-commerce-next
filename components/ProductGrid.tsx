'use client';

import { client } from '@/sanity/lib/client';
import { useEffect, useState } from 'react';
import {ProductItem} from './index';
import { Product } from '@/sanity.types';
import { AnimatePresence, motion } from 'motion/react';
import { useAppSelector } from '@/redux/hooks';
import { selectProducts } from '@/lib/sanity.queries';

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const selectedCategory = useAppSelector((state) => state.category.categoryValue);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const { query, params } = selectProducts(selectedCategory);
        const res = await client.fetch(query, params);
        setProducts(res);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCategory]);
  return (
    <section className='px-6 sm:px-15 lg:px-[102px]'>
      <h2 className="text-[40px] text-center font-bold capitalize">
        Our products
      </h2>
      <div>
        {loading ? (
          <div className="flex justify-center items-center h-[200px] gap-4">
            <div className="w-10 h-10 bg-neutral-50 border-6 border-amber-400 border-t-transparent border-b-transparent rounded-full animate-spin"></div>
            <span className="text-2xl font-semibold text-gray-light tracking-wide">
              Loading...
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
            <AnimatePresence>
              {products.length !== 0
                ? products.map((product) => (
                    <motion.div
                      key={product?._id}
                      layout
                      initial={{ opacity: 0.2 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className='flex justify-center'
                    >
                      <ProductItem product={product} />
                    </motion.div>
                  ))
                : ''}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};
export default ProductGrid;
