import { Product } from '@/sanity.types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const ProductCharacteristics = ({ product }: { product: Product }) => {
  const brand = product.brandName;
  const variant = product.variant && product.variant[0];
  const stock = product.stock ? 'Available' : 'Out of Stock';
  const category = product.categoryName && product.categoryName;

  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-2xl font-bold">
            {product.name}:
            <span className="font-medium text-gray_3">Characteristics</span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="w-full flex items-center justify-between">
              Brand:{' '}
              {brand && (
                <span className="font-semibold tracking-wide">{brand}</span>
              )}
            </p>
            <p className="w-full flex items-center justify-between">
              Type:{' '}
              {brand && (
                <span className="font-semibold tracking-wide capitalize">
                  {variant}
                </span>
              )}
            </p>
            <p className="w-full flex items-center justify-between">
              Stock:{' '}
              {brand && (
                <span className="font-semibold tracking-wide">{stock}</span>
              )}
            </p>
            <p className="w-full flex items-center justify-between">
              Category:{' '}
              {brand && (
                <span className="font-semibold tracking-wide">{category}</span>
              )}
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
export default ProductCharacteristics;
