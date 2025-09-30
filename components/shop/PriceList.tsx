import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const priceArray = [
  { title: "Under $100", value: "0-100" },
  { title: "$100 - $500", value: "100-500" },
  { title: "$500 - $1000", value: "500-1000" },
  { title: "$1000 - $2000", value: "1000-2000" },
  { title: "Over $2000", value: "2000-10000" },
];

interface Props {
  selectedPrice?: string | null;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
}

const PriceList = ({selectedPrice, setSelectedPrice}: Props) => {
  return (
    <div className="w-full bg-white p-5">
      <h2 className="text-base font-black">Price</h2>
      <RadioGroup className="mt-2 space-y-1" value={selectedPrice || ""}>
        {priceArray?.map((price, index) => (
          <div
            key={index}
            onClick={() => setSelectedPrice(price?.value)}
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <RadioGroupItem
              value={price?.value}
              id={price?.value}
              className="rounded-sm"
            />
            <Label
              htmlFor={price.value}
              className={`${selectedPrice === price?.value ? "font-semibold text-brown_dark" : "font-normal"}`}
            >
              {price?.title}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {selectedPrice && (
        <button
          onClick={() => setSelectedPrice(null)}
          className="text-sm font-medium mt-2 underline underline-offset-2 decoration-[1px] hover:text-brown_dark hoverEffect"
        >
          Reset selection
        </button>
      )}
    </div>
  )
}
export default PriceList