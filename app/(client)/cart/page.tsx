'use client';
import {
  createCheckoutSession,
  Metadata,
} from '@/actions/createCheckoutSession';
import {
  Container,
  EmptyCart,
  InformComponent,
  NoAccess,
  NumbersOfUnit,
  PriceFormatter,
  Breadcrumbs
} from '@/components/index';
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import {
  removeFromCart,
  selectCartItems,
  selectSubTotalPrice,
  selectTotalPrice,
  clearCart,
  selectTotalDiscount,
} from '@/redux/features/cartSlice';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Address, Product } from '@/sanity.types';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { useAuth, useUser } from '@clerk/nextjs';
import { ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CartPage = () => {
  const dispatch = useAppDispatch();
  const totalPrice = useAppSelector(selectTotalPrice);
  const subTotalPrice = useAppSelector(selectSubTotalPrice);
  const cartItems = useAppSelector(selectCartItems);
  const totalDiscount = useAppSelector(selectTotalDiscount);

  const [loading, setLoading] = useState(false);

  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const query = `*[_type=="address"] | order(publishedAt desc)`;
      const data = await client.fetch(query);
      setAddresses(data);
      const defaultAddress = data.find((address: Address) => address.default);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      } else if (data.length > 0) {
        setSelectedAddress(data[0]);
      }
    } catch (error) {
      console.log('Addresses fetching error: ', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleDeleteProduct = (product: Product) => {
    dispatch(removeFromCart(product));
    toast.success('Product deleted successfully!');
  };

  const handleResetCart = () => {
    const confirmed = window.confirm(
      'Are you sure you want to reset your cart?'
    );
    if (confirmed) {
      dispatch(clearCart());
      toast.success('Cart reset successfully!');
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? 'Unknown',
        customerEmail: user?.emailAddresses[0].emailAddress ?? 'Unknown',
        clerkUserId: user?.id,
        address: selectedAddress,
      };

      const checkoutUrl = await createCheckoutSession(cartItems, metadata);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.log('Error creating checkout session:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Breadcrumbs />
      <div className="bg-gray-50 pb-52 md:pb-10">
        {isSignedIn ? (
          <Container>
            {cartItems.length ? (
              <>
                <div className="flex items-center gap-2 py-5">
                  <ShoppingBag />
                  <h1 className="text-2xl font-bold">Shopping Cart</h1>
                </div>
                <div className="grid lg:grid-cols-3 md:gap-8">
                  <div className="lg:col-span-2 rounded-lg">
                    <div className="border bg-white rounded-md">
                      {cartItems.map(({ product, quantity }) => (
                        <div
                          key={product._id}
                          className="border-b p-2.5 last:border-b-0 flex justify-between items-center"
                        >
                          <div className="flex flex-1 items-start gap-2 h-24 sm:h-32 md:h-44">
                            {product?.images && (
                              <Link
                                href={`/product/${product.slug?.current}`}
                                className=" mr-2 shadow-lg overflow-hidden group"
                              >
                                <Image
                                  src={urlFor(product.images[0]).url()}
                                  alt="Product image"
                                  width={500}
                                  height={500}
                                  loading="lazy"
                                  className="w-24 sm:w-32 sm:h-32 md:w-40 h-24 md:h-44 object-cover group-hover:scale-105 hoverEffect"
                                />
                              </Link>
                            )}
                            <div className="h-full flex flex-1 flex-col justify-between py-1">
                              <div className="flex flex-col gap-0.5 md:gap-1.5">
                                <h2 className="font-semibold line-clamp-1">
                                  {product.name}
                                </h2>
                              </div>
                              <div className="flex items-center gap-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Trash2
                                        onClick={() =>
                                          handleDeleteProduct(product)
                                        }
                                        className="size-4 md:size-5 mr-1 text-brown_dark hover:text-red-600 hoverEffect"
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent className="font-semibold tracking-wider text-white">
                                      Delete Product
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col justify-between items-center h-24 sm:h-32 md:h-40 p-1.5">
                            <PriceFormatter
                              amount={
                                ((product.price ?? 0) -
                                  ((product.price ?? 0) *
                                    (product.discount ?? 0)) /
                                    100) *
                                quantity
                              }
                            />
                            <NumbersOfUnit
                              product={product}
                              className="h-5 sm:h-6 md:h-8 border-0"
                            />
                          </div>
                        </div>
                      ))}
                      <Button
                        onClick={handleResetCart}
                        className="m-5 font-semibold"
                        variant={'destructive'}
                      >
                        Reset Cart
                      </Button>
                    </div>
                  </div>
                  <div>
                    <div className="lg:col-span-1">
                      <div className="hidden md:inline-block w-full bg-brown_light p-6">
                        <h2 className="text-2xl font-semibold mb-4">
                          Cart Totals
                        </h2>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span>SubTotal</span>
                            <PriceFormatter amount={totalPrice} />
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Discount</span>
                            <PriceFormatter amount={totalDiscount} />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between font-bold text-lg">
                            <span>Total</span>
                            <PriceFormatter
                              amount={subTotalPrice}
                              className="font-bold text-lg"
                            />
                          </div>
                          <Button
                            className="bg-gray-50 w-full font-semibold tracking-wide hoverEffect"
                            variant={'outline'}
                            disabled={loading}
                            onClick={handleCheckout}
                          >
                            {loading ? 'Please wait...' : 'Check Out'}
                          </Button>
                        </div>
                      </div>

                      {addresses && (
                        <div className="rounded-[16px] mt-5 bg-white border border-brown_dark">
                          <Card>
                            <CardHeader>
                              <CardTitle>Delivery address</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <RadioGroup
                                defaultValue={addresses
                                  ?.find((addr) => addr.default)
                                  ?._id.toString()}
                              >
                                {addresses?.map((address) => (
                                  <div
                                    key={address._id}
                                    onClick={() => setSelectedAddress(address)}
                                    className={`flex items-center space-x-2 mb-4 cursor-pointer ${selectedAddress?._id === address?._id && 'text-brown_dark'}`}
                                  >
                                    <RadioGroupItem
                                      value={address?._id.toString()}
                                    />
                                    <Label
                                      htmlFor={`address-${address._id}`}
                                      className="grid gap-1.5 flex-1"
                                    >
                                      <span className="font-semibold">
                                        {address.name}
                                      </span>
                                      <span className="text-sm text-black/60">
                                        {address.address}, {address.city},{' '}
                                        {address.state} {address.zip}
                                      </span>
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                              <Button className="text-gray-100 w-full">
                                Add New Address
                              </Button>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Cart Totals for mobile */}
                  <div className="md:hidden fixed bottom-0 left-0 w-full bg-white pt-2">
                    <div className="p-4 rounded-lg border mx-4 bg-brown_light">
                      <h2 className="text-2xl font-semibold mb-4">
                        Cart Totals
                      </h2>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>SubTotal</span>
                          <PriceFormatter amount={totalPrice} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Discount</span>
                          <PriceFormatter amount={totalDiscount} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between font-bold text-lg">
                          <span>Total</span>
                          <PriceFormatter
                            amount={subTotalPrice}
                            className="font-bold text-lg"
                          />
                        </div>
                        <Button
                          className="bg-gray-50 w-full font-semibold tracking-wide hoverEffect"
                          variant={'outline'}
                          disabled={loading}
                          onClick={handleCheckout}
                        >
                          {loading ? 'Please wait...' : 'Check Out'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <EmptyCart />
            )}
          </Container>
        ) : (
          <NoAccess />
        )}
      </div>
      <InformComponent />
    </>
  );
};
export default CartPage;
