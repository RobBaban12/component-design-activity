import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

async function getData() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/products`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    if (!data.products) {
      throw new Error("Invalid data format");
    }
    return data.products;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch products"
    );
  }
}

const page = async () => {
  const data = await getData();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {data.map((item: any) => (
        <Card className="m-6 max-w-80 transition-transform duration-200 hover:scale-105">
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description.slice(1, 151)}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{item.category}</p>
          </CardContent>
          <CardFooter>
            <p>${item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
export default page;
