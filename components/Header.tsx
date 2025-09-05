import CartIcon from "./CartIcon";
import Container from "./Container"
import HeartIcon from "./HeartIcon";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import Navbar from "./Navbar";
import SearchIcon from "./SearchIcon";

const Header = () => {
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
        </div>
      </Container>
    </header>
  );
}
export default Header