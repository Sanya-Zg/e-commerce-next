'use client';

import { removeFromFavorite, resetFavorite } from '@/redux/features/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useState } from 'react';
import Container from './Container';
import { Product } from '@/sanity.types';
import { Heart, X } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import PriceFormatter from './PriceFormatter';
import AddToCartButton from './AddToCartButton';
import { Button } from './ui';

const WishListProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(7);
  const dispatch = useAppDispatch();
  const favoriteProducts = useAppSelector(
    (state) => state.cart.favoriteProduct
  );
  const loadMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 5, favoriteProducts.length));
  };

  const handleResetWishlist = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset your wishlist?"
    );
    if (confirmReset) {
      dispatch(resetFavorite());
      toast.success("Wishlist reset successfully");
    }
  };

  return (
    <Container>
      {favoriteProducts?.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="border-b border-b-brown_dark">
                <tr className="bg-brown_light">
                  <th className="p-2 text-left">Product</th>

                  <th className="p-2 text-left hidden md:table-cell">Type</th>
                  <th className="p-2 text-left hidden md:table-cell">Status</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-center md:text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {favoriteProducts
                  ?.slice(0, visibleProducts)
                  ?.map((product: Product) => (
                    <tr key={product?._id} className="border-b">
                      <td className="px-2 py-4 flex items-center gap-2">
                        <X
                          onClick={() => {
                            dispatch(removeFromFavorite(product?._id));
                            toast.success('Product removed from wishlist');
                          }}
                          size={18}
                          className="hover:text-red-600 hover:cursor-pointer hoverEffect"
                        />
                        {product?.images && (
                          <Link
                            href={`/product/${product?.slug?.current}`}
                            className="group md:inline-flex"
                          >
                            <Image
                              src={urlFor(product?.images[0]).url()}
                              alt={'product image'}
                              width={80}
                              height={80}
                              className="group-hover:scale-105 hoverEffect size-10 md:size-20 object-contain"
                            />
                          </Link>
                        )}
                        <p className="hidden sm:inline-block line-clamp-1 ">
                          {product?.name}
                        </p>
                      </td>

                      <td className="p-2 capitalize hidden md:table-cell">
                        {product?.variant && product?.variant[0]}
                      </td>
                      <td
                        className={`p-2 w-24 ${
                          (product?.stock as number) > 0
                            ? 'text-green-600'
                            : 'text-red-600'
                        } font-medium text-sm hidden md:table-cell`}
                      >
                        {(product?.stock as number) > 0
                          ? 'In Stock'
                          : 'Out of Stock'}
                      </td>
                      <td className="p-2">
                        <PriceFormatter amount={product?.price} />
                      </td>
                      <td className="p-2">
                        <AddToCartButton
                          product={product}
                          className="w-full -mt-3"
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center gap-2">
            {visibleProducts < favoriteProducts?.length && (
              <div className="my-5">
                <Button variant="outline" onClick={loadMore}>
                  Load More
                </Button>
              </div>
            )}
            {visibleProducts > 10 && (
              <div className="my-5">
                <Button
                  onClick={() => setVisibleProducts(10)}
                  variant="outline"
                >
                  Load Less
                </Button>
              </div>
            )}
          </div>
          {favoriteProducts?.length > 0 && (
            <Button
              onClick={handleResetWishlist}
              className="mb-5 font-semibold"
              variant="destructive"
              size="lg"
            >
              Reset Wishlist
            </Button>
          )}
        </>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center space-y-6 px-4 text-center">
          <div className="relative mb-4">
            <div className="absolute -top-1 -right-1 h-4 w-4 animate-ping rounded-full bg-muted-foreground/20" />
            <Heart
              className="h-12 w-12 text-muted-foreground"
              strokeWidth={1.5}
            />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Your wishlist is empty
            </h2>
            <p className="text-sm text-muted-foreground">
              Items added to your wishlist will appear here
            </p>
          </div>
          <Button asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      )}
    </Container>
  );
};
export default WishListProducts;
