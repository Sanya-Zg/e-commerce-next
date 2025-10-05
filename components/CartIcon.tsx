'use client'
import { useAppSelector } from '@/redux/hooks';
import Link from 'next/link';
import { HiOutlineShoppingCart } from 'react-icons/hi';

const CartIcon = () => {
  const items = useAppSelector((state) => state.cart.items);
  
  return (
    <Link href={'/cart'} className='relative'>
      <HiOutlineShoppingCart size={22} />
      <span className='absolute -top-1 -right-1 w-3.5 h-3.5 bg-brown_dark text-white px-0.5 font-semibold text-xs rounded-full flex justify-center items-center'>{items.length}</span>
    </Link>
  );
};
export default CartIcon;
