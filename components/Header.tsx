// import { currentUser } from '@clerk/nextjs/server';
import {
  CartIcon,
  Container,
  HeartIcon,
  Logo,
  MobileMenu,
  Navbar,
  SearchIcon,
  SignIn,
} from './index';
import { ClerkLoaded, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Header = async () => {
  // const user = await currentUser();

  return (
    <header className="py-3 md:py-6 bg-white border-b">
      <Container className="flex justify-between items-center">
        <div className="flex items-center gap-6 md:gap-0">
          <MobileMenu />
          <Logo />
        </div>
        <Navbar />
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchIcon />
          <HeartIcon />
          <CartIcon />
          <ClerkLoaded>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignIn />
            </SignedOut>
            
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};
export default Header;
