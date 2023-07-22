// api.ts

// Define the types for the data returned by the API
export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  // Add other properties as needed
};

// Function to fetch a list of products from the API
export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await res.json();
  return products;
};

// Function to fetch a single product by its ID from the API
export const fetchProductById = async (id: number): Promise<Product | null> => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) {
      throw new Error("Product not found");
    }
    const product: Product = await res.json();
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
