'use client';

import { cn } from '@/lib/utils';
import {
  addToCart,
  decreaseQuantity,
  selectItemCount,
} from '@/redux/features/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Product } from '@/sanity.types';
import toast from 'react-hot-toast';

interface Props {
  product: Product;
  className?: string;
}

const NumbersOfUnit = ({ product, className }: Props) => {
  const dispatch = useAppDispatch();
  
  const itemCount = useAppSelector((state) => product ?
    selectItemCount(state, product._id) : 0
  );
  const isOutOfStock = product?.stock === 0;

  const handleMinus = () => {
    dispatch(decreaseQuantity(product._id));
    toast.success('Quantity decrease successfully!');
  };

  const handlePlus = () => {
    if ((product.stock as number) > itemCount) {
      dispatch(addToCart(product));
      toast.success('Quantity increast successfully!');
    } else {
      toast.error('Can not add more than available in stock');
    }
  };

  return (
    <div
      className={cn(
        'border border-gray-light w-[123px] h-10 sm:h-16 rounded-[10px] grid grid-cols-3 justify-between items-center',
        className
      )}
    >
      <button
        className="block h-full rounded-tl-[10px] rounded-bl-[10px] hover:bg-gray-100 active:bg-gray-50 hoverEffect"
        onClick={handleMinus}
      >
        -
      </button>
      <span className="mx-auto">{itemCount}</span>
      <button
        className="block h-full rounded-tr-[10px] rounded-br-[10px] hover:bg-gray-100 active:bg-gray-50 hoverEffect"
        onClick={handlePlus}
      >
        +
      </button>
    </div>
  );
};
export default NumbersOfUnit;
