import { Product } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import { AddToCartButton, AddToWishListButton, PriceView, Rating } from './index';


const ProductItem = ({ product }: { product: Product }) => {
  return (
    <div className="w-full max-w-[285px] relative group overflow-hidden">
      <Image
        src={
          product.images ? urlFor(product.images[0]).url() : '/placeholder.jpg'
        }
        alt={`Product_${product.name}`}
        width={285}
        height={301}
        className={`object-cover w-full max-w-[285px] max-h-[301px] ${product.stock === 0 ? 'opacity-50' : 'group-hover:scale-105'} hoverEffect`}
      />

      {product.status == 'sale' && (
        <p className="absolute top-6 right-6 text-white font-medium bg-red-primary rounded-full w-12 h-12 flex items-center justify-center group-hover:bg-red-500 hoverEffect">{`-${product.discount}%`}</p>
      )}
      {product.status == 'new' && (
        <p className="absolute top-6 right-6 text-white font-medium bg-green-primary rounded-full w-12 h-12 flex items-center justify-center capitalize group-hover:bg-emerald-500 hoverEffect">
          {product.status}
        </p>
      )}

      <AddToWishListButton product={product} />

      <div className="px-4 pt-4 pb-7 bg-[#F4F5F7]">
        <p className="text-2xl font-semibold">{product.name}</p>
        <p className="font-medium text-gray_3 line-clamp-1 mt-2">
          {product.description}
        </p>
        <div className='flex gap-5 justify-between mt-3'>
          <Rating />
          <p className='text-[18px] text-gray-500 font-medium'>4 Reviews</p>
        </div>
        <div className='flex gap-5 mt-4'>
          <p className='font-semibold'>In Stock</p>
          <span className={`font-bold ${product.stock === 0 ? 'text-red-primary' : 'text-brown_dark/80'}`} >{product.stock}</span>          
        </div>

        <PriceView price={product.price} discount={product.discount} />
        <AddToCartButton product={product} className='w-36 rounded-full' />
      </div>
    </div>
  );
};
export default ProductItem;
