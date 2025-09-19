import { cn } from "@/lib/utils";
import {PriceFormatter} from "./index";

interface Props {
  price?: number;
  discount?: number;
  className?: string
}

const PriceView = ({price=0, discount=0, className}: Props) => {
  return (
    <div className={cn(`flex justify-between gap-2 ${discount && ('flex-row-reverse')}`, className)}>
      <PriceFormatter amount={price} className={`text-lg text-green-primary ${discount && ('line-through text-gray-400  ')}`}/>
      {price && (discount > 0) && (
        <PriceFormatter amount={price - price * discount / 100} className="font-bold text-lg text-green-primary"/>
      )}
    </div>
  )
}
export default PriceView