import { removeFromCart, selectCartItems, selectTotalPrice } from '@/redux/features/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';


const CartPage = () => {
  const dispatch = useAppDispatch();
  const totalPrice = useAppSelector(selectTotalPrice);
  const cartItems = useAppSelector(selectCartItems)

  if (cartItems.length === 0) {
    return <div>Your cart is empty 😢</div>;
  }
  
  return <div>CartPage</div>;
};
export default CartPage;
