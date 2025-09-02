import Link from 'next/link';
import { HiOutlineShoppingCart } from 'react-icons/hi';

const CartIcon = () => {
  return (
    <Link href={'/cart'} className='relative'>
      <HiOutlineShoppingCart size={22} />
      <span className='absolute -top-1 -right-1 w-3.5 h-3.5 bg-brown_light text-white px-0.5 font-semibold text-xs rounded-full flex justify-center items-center'>0</span>
    </Link>
  );
};
export default CartIcon;
