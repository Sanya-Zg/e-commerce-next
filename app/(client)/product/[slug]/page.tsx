import {
  AddToCartButton,
  Container,
  ImageView,
  NumbersOfUnit,
  PriceView,
  ProductCharacteristics,
  Rating,
} from '@/components/index';
import { getProductBySlug } from '@/lib/sanity.index';
import { Product } from '@/sanity.types';

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product: Product = await getProductBySlug(slug);

  return (
    <Container>
      <div className="flex flex-col md:flex-row gap-10 py-8">
        {product?.images && (
          <ImageView images={product.images} isStock={product.stock} />
        )}
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <div className="space-y-4">
            <h2 className="text-[42px] mb-0">{product.name}</h2>

            <PriceView
              price={product.price}
              discount={product.discount}
              className={'text-2xl'}
            />

            <div className="flex gap-2 ">
              <Rating /> <span className="text-gray-light">| 5 Reviews</span>
            </div>

            <p className="text-sm">{product.description}</p>

            <div className="bg-gray-50 p-2">
              <p className="text-sm text-gray-light">Color</p>
              <div className="flex gap-4">
                {product.colors?.map((color) => (
                  <button
                    key={color}
                    className="mt-3 border-2 border-transparent rounded-full focus:border-black/40 "
                  >
                    <span
                      style={{ backgroundColor: color }}
                      className="w-7.5 h-7.5 block rounded-full border"
                    ></span>
                  </button>
                ))}
              </div>
            </div>

            <p
              className={`mt-2 px-4 py-1.5 text-sm inline-block font-semibold rounded-lg ${product.stock === 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'} `}
            >
              {(product.stock as number) > 0 ? 'In Stock' : 'Out of Stock'}
            </p>

            <div className="flex gap-4.5 lg:mt-33">
              <NumbersOfUnit />
              <AddToCartButton
                product={product}
                className={'w-full h-10 sm:h-16 mt-0'}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 lg:mt-7 flex md:ml-auto border-t border-gray_5">
        <ProductCharacteristics product={product} />
      </div>
    </Container>
  );
};
export default SingleProductPage;
