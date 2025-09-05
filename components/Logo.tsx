import logo from '@/public/Logo.svg';
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-1.5 font-montserrat">
      <Image src={logo} alt="Logo" className='w-9 md:w-12'/>
      <span className="text-[26px] md:text-[34px] font-bold">Furniro</span>
    </Link>
  );
}
export default Logo