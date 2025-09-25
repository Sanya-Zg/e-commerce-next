import { Product } from "@/sanity.types"
import { Heart } from "lucide-react"

const AddToWishListButton = ({product}: {product:Product}) => {
  return (
    <button className="absolute top-3 md:top-6 left-3 md:left-6 bg-neutral-200 border-3 hover:border-brown_dark text-brown_dark rounded-full size-8 md:size-12 flex items-center justify-center hoverEffect" aria-label="Like this product">
      <Heart />
    </button>
  )
}
export default AddToWishListButton