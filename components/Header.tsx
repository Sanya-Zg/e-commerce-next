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
    
      <header className="py-3 md:py-6 bg-white">
        <Container className="flex justify-between items-center gap-1 md:gap-5">
          <div className="flex items-center gap-1 md:gap-0">
            <MobileMenu />
            <Logo />
          </div>
          <Navbar />
          <div className="flex items-center justify-end gap-5 lg:gap-12 md:mr-11">
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
