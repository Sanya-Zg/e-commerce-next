'use client'
import { usePathname } from "next/navigation";
import Container from "./Container";
import { ChevronRight } from "lucide-react";

const BreadcrumbsProduct = () => {
   const pathname = usePathname();
  
    const segments = pathname.split('/').filter(Boolean);
    const path = (segments[1] || '').replace(/-/g, ' ');
  return (
    <Container className="h-[100px] bg-brown_light flex items-center gap-6">
      <p className="text-gray-light">Home</p>
      <ChevronRight />
      <p className="text-gray-light">Shop</p>
      <ChevronRight />
      <p className="border-l-2 h-10 border-gray-light"></p>
      <p className="capitalize">{path}</p>
    </Container>
  )
}
export default BreadcrumbsProduct