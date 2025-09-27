'use client';
import { Product } from '@/sanity.types';
import { Button } from './ui';
import { cn } from '@/lib/utils';

interface Props {
  product: Product;
  className?: string;
}
const AddToCartButton = ({ product, className }: Props) => {
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    window.alert('Sanya developer')
  }
  return (
    <div className={cn('mt-4', className)}>
      <Button
        className={cn('w-full text-white font-semibold', className)}
        disabled={isOutOfStock}
        onClick={handleAddToCart}
      >
        {isOutOfStock ? 'Out in stock' : 'Add to cart'}
      </Button>
    </div>
  );
};
export default AddToCartButton;
