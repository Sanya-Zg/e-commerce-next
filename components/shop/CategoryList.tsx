import { Category } from '@/sanity.types';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

interface Props {
  categories: Category[];
  selectedCategory?: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const CategoryList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: Props) => {
  return (
    <div className="w-full bg-white p-5">
      <h2 className="text-base font-black">Categories</h2>
      <RadioGroup value={selectedCategory || ''} className='mt-2 space-y-1'>
        {categories.map((category) => (
          <div
            onClick={() => {setSelectedCategory(category.slug?.current as string)}}
            key={category._id}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <RadioGroupItem
              value={category.slug?.current as string}
              id={category.slug?.current}
              className="rounded-sm"
            />
            <Label htmlFor={category.slug?.current} className={`${selectedCategory === category.slug?.current ? 'font-semibold text-brown_dark' : 'font-normal'} cursor-pointer`} >
              {category.title}
            </Label>
          </div>
        ))}
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-sm font-medium mt-2 underline underline-offset-2 decoration-[1px] hover:text-brown_dark hoverEffect text-left"
          >
            Reset selection
          </button>
        )}
      </RadioGroup>
    </div>
  );
};
export default CategoryList;
