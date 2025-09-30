'use client';
import { BRANDS_QUERYResult, Category, Product } from '@/sanity.types';
import { Container, NoProductAvailable, ProductItem } from '@/components/index';
import CategoryList from './shop/CategoryList';
import BrandList from './shop/BrandList';
import PriceList from './shop/PriceList';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';

interface Props {
  categories: Category[];
  brands: BRANDS_QUERYResult;
}
const Shop = ({ categories, brands }: Props) => {
  const searchParams = useSearchParams();
  const brandParams = searchParams?.get('brand');
  const categoryParams = searchParams?.get('category');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParams || null
  );
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    brandParams || null
  );
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const fetchProducts = async () => {
    setLoading(true);
    try {
      let minPrice = 0;
      let maxPrice = 10000;
      if (selectedPrice) {
        const [min, max] = selectedPrice.split('-').map(Number);
        minPrice = min;
        maxPrice = max;
      }

      const query = `
      *[_type == 'product' 
        && (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id))
        && (!defined($selectedBrand) || references(*[_type == "brand" && slug.current == $selectedBrand]._id))
        && price >= $minPrice && price <= $maxPrice
      ] 
      | order(name asc) {
        ...,"categories": categories[]->title
      }
    `;
      const data = await client.fetch(
        query,
        { selectedCategory, selectedBrand, minPrice, maxPrice },
        { next: { revalidate: 0 } }
      );
      setProducts(data);
    } catch (error) {
      console.log('Shop product fetching error', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedBrand, selectedPrice]);

  return (
    <div className="border-t">
      <Container className="mt-5">
        <div className="sticky top-0 z-10 mb-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg uppercase tracking-wide font-semibold">
              Choose the product you need
            </h2>
            {(selectedCategory !== null ||
              selectedBrand !== null ||
              selectedPrice !== null) && (
              <button className="text-brown_dark underline text-sm mt-2 font-medium hover:text-red-600 hoverEffect">
                Reset Filters
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 border-t md:border-t-0">
          <div className="md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-y-auto md:min-w-42 pb-5 md:border-r border-r-amber-500 scrollbar-hide">
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <BrandList
              brands={brands}
              setSelectedBrand={setSelectedBrand}
              selectedBrand={selectedBrand}
            />
            <PriceList
              setSelectedPrice={setSelectedPrice}
              selectedPrice={selectedPrice}
            />
          </div>
          <div className="flex-1 pt-5 border-t ">
            <div className="h-[calc(100vh-160px)] overflow-y-auto pr-2 scrollbar-hide">
              {loading ? (
                <div className="flex justify-center items-center h-[200px] gap-4">
                  <div className="w-10 h-10 bg-neutral-50 border-6 border-amber-400 border-t-transparent border-b-transparent rounded-full animate-spin"></div>
                  <span className="text-2xl font-semibold text-gray-light tracking-wide">
                    Loading...
                  </span>
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 ">
                  {products.map((product) => (
                    <ProductItem key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <NoProductAvailable className="bg-white mt-0" />
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Shop;
