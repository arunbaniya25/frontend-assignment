"use client";

import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Product from "@/components/Product";
import Link from "next/link";

// Fetch products from the API
const fetchProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();
  return products;
};

type ProductType = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProductsData = async () => {
      const productsData = await fetchProducts();
      setProducts(productsData);
    };

    fetchProductsData();
  }, []);

  // Extract carousel data only when the 'products' array is not empty
  const carouselData = products.slice(0, 3).map((product) => ({
    image: product.image,
    name: product.title,
    description: product.description,
    id: product.id,
  }));

  return (
    <main className="min-h-screen max-w-7xl mx-auto px-8 xl:px-0 mt-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        Trending Products
      </h1>
      <div className="carousel-container w-full max-w-screen-xl mx-auto mb-10 bg-slate-100">
        <Carousel
          showArrows={true}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          className="flex"
        >
          {carouselData.map((data, index) => (
            <div
              key={index}
              className="w-full h-auto sm:w-1/2 md:w-1/3 lg:w-96 mx-auto text-center"
            >
              <img
                src={data.image}
                alt={`Image ${index + 1}`}
                className="mx-auto"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{data.name}</h2>
                <p className="text-sm text-gray-500 ">{data.description}</p>
                <Link href={`/product/${data.id}`}>
                  <button className="button w-full mt-5 bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black">
                    Add to bag
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <section className="flex flex-col space-y-12 pb-44">
        <h1 className="text-4xl font-bold text-center">Shop Today</h1>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
