import { cn } from '@/lib/utils';
import logo from '@/public/Logo.svg';
import Image from 'next/image';
import Link from 'next/link';

const Logo = ({className}: {className?: string}) => {
  return (
    <Link href="/" className={cn(`flex items-center gap-1.5 font-montserrat md:w-[170px]`, className)}>
      <Image src={logo} alt="Logo" className={`w-12`}/>
      <span className="xs:text-2xl md:text-[34px] font-bold">Furniro</span>
    </Link>
  );
}
export default Logo