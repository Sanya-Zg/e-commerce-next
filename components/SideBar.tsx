import { X } from "lucide-react";
import Logo from "./Logo";
import { headerMenu } from "@/app/constans/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialLinks from "./SocialLinks";

interface PropsMenu {
  isOpen: boolean;
  isClose: () => void;
}

const SideBar = ({isOpen, isClose}: PropsMenu) => {
  const pathname = usePathname();
  return (
    <aside
      className={`fixed inset-0 w-full bg-black/50 text-white/80 z-10 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } hoverEffect`}
      onClick={isClose}
    >
      <div
        className="max-w-96 min-w-80 bg-black h-screen p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <Logo />
          <button>
             <X
            onClick={isClose}
            size={30}
            className="hover:text-white"
            aria-label="Close menu"
          />
          </button>
         
        </div>
        <div className="flex flex-col gap-5 font-semibold mt-5">
          {headerMenu.map((item) => (
            <Link
              href={item.link}
              key={item.title}
              className={`hover:text-white hoverEffect ${
                pathname === item.link && 'text-brown_dark'
              }`}
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="border-t-2 mt-20 border-white/50">
          <SocialLinks />
        </div>
      </div>
    </aside>
  );
}
export default SideBar