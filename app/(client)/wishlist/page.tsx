
import NoAccess from "@/components/NoAccess";
import {InformComponent, WishListProducts, Breadcrumbs} from "@/components/index";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const WishListPage = async () => {
  const user = await currentUser();
  return (
    <>
    <Breadcrumbs />
      <div className="mt-2">
        {user ? (
          <WishListProducts />
        ) : (
          <NoAccess details="Log in to view your wishlist items. Don’t miss out on your cart products to make the payment!" />
        )}
      </div>
      <InformComponent />
    </>
  );
};

export default WishListPage;