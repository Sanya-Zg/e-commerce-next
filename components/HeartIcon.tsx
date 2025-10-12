'use client';
import { addToFavorite } from '@/redux/features/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Product } from '@/sanity.types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { LuHeart } from 'react-icons/lu';

const HeartIcon = ({
  showProduct = false,
  product,
}: {
  showProduct?: boolean;
  product?: Product;
}) => {
   const [existingProduct, setExistingProduct] = useState<Product | null>(null);

  const { favoriteProduct } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const availableProduct = favoriteProduct.find(
      (item) => item?._id === product?._id
    );
    setExistingProduct(availableProduct || null);
  }, [product, favoriteProduct]);

  const handleFavorite = () => {
    if (!product) return; 
    dispatch(addToFavorite(product));
    toast.success(
      existingProduct
        ? 'Product removed successfully!'
        : 'Product added successfull!'
    );
  }
  return (
    <>
    {!showProduct ? (<Link href={'/wishlist'} className="relative">
      <LuHeart size={22} />
      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brown_dark text-white px-0.5 font-semibold text-xs rounded-full flex justify-center items-center">
        {favoriteProduct.length ? favoriteProduct.length : 0}
      </span>
    </Link>) : (
      <button
          onClick={handleFavorite}
          className="group relative hover:text-brown_dark hoverEffect border border-brown_dark/80 hover:border-brown_dark p-1.5 rounded-sm"
        >
          {existingProduct ? (
            <LuHeart
              fill="#B88E2F"
              className="text-brown_dark/80 group-hover:text-brown_dark hoverEffect mt-.5 w-5 h-5"
            />
          ) : (
            <LuHeart className="text-brown_dark/80 group-hover:text-brown_dark hoverEffect mt-.5 w-5 h-5" />
          )}
        </button>
    )}
    </>
    
  );
};
export default HeartIcon;
