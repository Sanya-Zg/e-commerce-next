'use client';
import { addToFavorite } from '@/redux/features/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Product } from '@/sanity.types';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AddToWishListButton = ({ product }: { product: Product }) => {
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);

  const { favoriteProduct } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const availableProduct = favoriteProduct.find(
      (item) => item?._id === product?._id
    );
    setExistingProduct(availableProduct || null);
  }, [product, favoriteProduct]);

  const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
    dispatch(addToFavorite(product));
    toast.success(
      existingProduct
        ? 'Product removed successfully!'
        : 'Product added successfull!'
    );
  };
  return (
    <button
      onClick={handleFavorite}
      className={`absolute top-3 md:top-6 left-3 md:left-6  border-3 hover:border-brown_dark  rounded-full size-8 md:size-12 flex items-center justify-center hoverEffect ${existingProduct ? 'bg-brown_dark text-white' : 'bg-neutral-200 text-brown_dark'}`}
      aria-label="Like this product"
    >
      <Heart />
    </button>
  );
};
export default AddToWishListButton;
