'use client';
import { Product } from '@/sanity.types';
import { Button } from './ui';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addToCart, selectItemCount } from '@/redux/features/cartSlice';
import toast from 'react-hot-toast';
import NumbersOfUnit from './NumbersOfUnit';
import PriceFormatter from './PriceFormatter';

interface Props {
  product: Product;
  className?: string;
}
const AddToCartButton = ({ product, className }: Props) => {


  const dispatch = useAppDispatch();
  const itemCount = useAppSelector((state) => selectItemCount(state, product._id));
  

  const price = product.price;
  const discount = product.discount as number ?? 0;

  const isOutOfStock = product.stock === 0 || product.stock === undefined;

  const handleAddToCart = () => {
    if ((product.stock as number) > itemCount){
      dispatch(addToCart(product));
      toast.success(`${product.name?.substring(0,12)}... added successfully`);
    }
    
  }
  return (
    <div className={cn('mt-4 relative', className)}>
      {itemCount ? (
        <div className='text-sm w-full absolute -bottom-10'>
          <div className='flex justify-between w-full border-b'>
            <span className='text-xs text-gray-light'>Quantity</span>
            <NumbersOfUnit product={product} className={'h-5 sm:h-6 w-20 border-0'}/>
          </div>
          <div className='mt-1 flex justify-between'>
            <span className='text-xs font-semibold'>Subtotal</span>
            <PriceFormatter amount={price ? (price - price * discount / 100) * itemCount: 0} />
          </div>
        </div>
      ) : (
        <Button
        className={cn('w-36 text-white font-semibold', className)}
        disabled={isOutOfStock}
        onClick={handleAddToCart}
      >
        {isOutOfStock ? 'Out in stock' : 'Add to cart'}
      </Button>
      )}
      
    </div>
  );
};
export default AddToCartButton;
