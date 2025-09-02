import logo from '@/public/Logo.svg';
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex gap-1.5 font-montserrat">
      <Image src={logo} alt="Logo" />
      <span className="text-[34px] font-bold">Furniro</span>
    </Link>
  );
}
export default Logo