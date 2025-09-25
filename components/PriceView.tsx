import { cn } from "@/lib/utils";
import {PriceFormatter} from "./index";

interface Props {
  price?: number;
  discount?: number;
  className?: string
}

const PriceView = ({price=0, discount=0, className}: Props) => {
  return (
    <div className={cn(`flex items-center mt-2  gap-x-2 ${discount && (' flex-wrap md:flex-nowrap')}`, className)}>
      {price && (discount > 0) && (
        <PriceFormatter amount={price - price * discount / 100} className="font-bold text-lg text-green-primary flex justify-start"/>
      )}
      <PriceFormatter amount={price} className={`text-lg text-green-primary ${discount && ('line-through text-gray-400  text-sm')}`}/>
    </div>
    

  )
}
export default PriceView