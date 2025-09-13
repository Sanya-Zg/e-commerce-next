import logo from '@/public/Logo.svg';
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className={`flex items-center gap-1.5 font-montserrat md:w-[170px]`}>
      <Image src={logo} alt="Logo" className={`w-7 sm:w-12 `}/>
      <span className="xs:text-2xl md:text-[34px] font-bold">Furniro</span>
    </Link>
  );
}
export default Logo