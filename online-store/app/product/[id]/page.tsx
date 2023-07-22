import ProductImage from "@/components/ProductImage";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

import { cartActions } from "@/app/store/slices/cartSlice";
import { useDispatch } from "react-redux";

type Props = {
  params: {
    id: string;
  };
};

async function ProductPage({ params: { id } }: Props) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product: Product = await res.json();
    console.log(product);

    // const dispatch = useDispatch();

    // const addCart = () => {
    //   dispatch(
    //     cartActions.addItem({
    //       id: product.id,
    //       title: product.title,
    //       price: product.price,
    //       description: product.description,
    //       image: product.image,
    //     })
    //   );

    //   console.log("Product added successfully to cart");
    // };

    return (
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 mt-40 pb-10">
        <ProductImage product={product} />

        <div className="divide-y">
          <div className="space-y-2 pb-8">
            <h1 className="text-2xl md:text-4xl font-bold">{product.title}</h1>
            <h2 className="text-gray-500 font-bold text-xl md:text-3xl">
              ${product.price}
            </h2>
          </div>
          <div className="flex items-center text-sm my-4">
            <p>{product?.rating.rate}</p>
            {product?.rating.rate && (
              <div className="flex items-center ml-2 mr-6">
                {/* Display 5 stars but display the rate ones as StarIconOutline */}
                {Array.from(
                  { length: Math.floor(product.rating.rate) },
                  (_, i) => (
                    <StarIcon key={i} className="h-4 w-4 text-yellow-500" />
                  )
                )}

                {/* Display the rest of the stars as StarIconOutline */}
                {Array.from(
                  { length: 5 - Math.floor(product.rating.rate) },
                  (_, i) => (
                    <StarIconOutline
                      key={i}
                      className="h-4 w-4 text-yellow-500"
                    />
                  )
                )}
              </div>
            )}
            <p className="text-blue-600 hover:underline cursor-pointer text-xs">
              See all {product?.rating.count} reviews
            </p>
          </div>

          <div className="pt-8">
            <p className="text-s md:text-sm">{product.description}</p>
          </div>

          <div className="space-y-3 text-sm">
            <button className="button w-full mt-5 bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black">
              Add to bag
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 mt-30">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Not found</h2>
        <p className="text-lg text-gray-600">
          Could not find the requested resource
        </p>
      </div>
    );
  }
}

export default ProductPage;
