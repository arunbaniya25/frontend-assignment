"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import Product from "@/components/Product";

// Fetch products from the API
const fetchProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();
  return products;
};

// Sorting function
const sortProducts = (products, sortBy) => {
  let sortedProducts = [...products];
  if (sortBy === "priceHighToLow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "priceLowToHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }
  return sortedProducts;
};

// Filtering function
const filterProducts = (products, searchQuery) => {
  return products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProductsData = async () => {
      const productsData = await fetchProducts();
      setProducts(productsData);
    };

    fetchProductsData();
  }, []);

  // Sort and filter products
  let sortedProducts = sortProducts(products, sortBy);
  let filteredProducts = filterProducts(sortedProducts, searchQuery);

  return (
    <main className="min-h-screen max-w-7xl mx-auto px-8 xl:px-0 mt-8">
      <section className="flex flex-col space-y-12 pb-44">
        <h1 className="text-5xl font-bold text-center">All Products</h1>
        <div className="flex justify-center space-x-4">
          <button
            className={`text-sm px-4 py-2 rounded ${
              sortBy === "priceHighToLow"
                ? "bg-primary-500 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => setSortBy("priceHighToLow")}
          >
            Price High to Low
          </button>
          <button
            className={`text-sm px-4 py-2 rounded ${
              sortBy === "priceLowToHigh"
                ? "bg-primary-500 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => setSortBy("priceLowToHigh")}
          >
            Price Low to High
          </button>
        </div>
        <div className="relative mx-auto mt-6 w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            placeholder="Search..."
          />
        </div>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
