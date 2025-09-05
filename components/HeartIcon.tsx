import Link from "next/link";
import { LuHeart } from "react-icons/lu";

const HeartIcon = () => {
  return (
    <Link href={'/cart'} className="relative">
      <LuHeart size={22} />
      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brown_dark text-white px-0.5 font-semibold text-xs rounded-full flex justify-center items-center">
        0
      </span>
    </Link>
  );
}
export default HeartIcon