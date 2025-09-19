import { Container, Logo, SocialLinks } from '@/components/index';
import { footerHelp, headerMenu } from '@/constans/data';
import Link from 'next/link';
import { Button, Input } from './ui';

const Footer = () => {
  return (
    <footer className="border-t border-t-[#D9D9D9]">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 pt-12 pb-9.5 border-b border-b-[#D9D9D9]">
          <div className="flex flex-col gap-2">
            <Logo />
            <SocialLinks className="gap-8 mb-12" hoverEff={'hover:text-brown_dark'} />
            <div className="text-gray-light">
              <p className="pr-10">
                400 University Drive Suite 200 Coral Gables,
              </p>
              <p>FL 33134 USA</p>
            </div>
          </div>
          <div>
            <p className="text-gray-light font-medium mb-14">Links</p>
            <ul className="flex flex-col gap-11">
              {headerMenu.map((item) => (
                <li key={item.title}>
                  <Link href={item.link} className="font-medium hover:text-brown_dark">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-gray-light font-medium mb-14">Help</p>
            <ul className="flex flex-col gap-11">
              {footerHelp.map((item) => (
                <li key={item.title}>
                  <Link href={item.link} className="font-medium hover:text-brown_dark">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-gray-light font-medium mb-14">Newsletter</p>
            <form className="flex gap-3">
              <div className="relative">
                <Input
                  className="w-[200px] rounded-none shadow-none border-0 border-b-2 border-gray-light bg-transparent focus:outline-none focus:ring-0 focus-visible:border-b-2 focus-visible:border-black focus-visible:ring-0 focus-visible:shadow-none peer"
                />
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-brown_dark transition-all duration-500 ease-in-out peer-focus:w-full "></span>
              </div>
              <Button variant='outline' className='uppercase border-0 shadow-none border-b-2 border-gray-light rounded-none active:border-brown_dark active:bg-none text-sm hover:text-brown_dark
               '>Subscribe</Button>
            </form>
          </div>
        </div>
        <div className='py-9'>
          {new Date().getFullYear()} Furniro. All rights reserved
        </div>
      </Container>
    </footer>
  );
};
export default Footer;
