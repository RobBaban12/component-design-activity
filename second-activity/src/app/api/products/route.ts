import { NextResponse } from "next/server";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export async function GET() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products: Product[] = await response.json();
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" });
  }
}
