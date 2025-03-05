
type Product = {
  id: number;
  title: string;
  price: string;
  img: string;
  description: string;
  category: string;
};

export const Products: Product[] = [
  {
    id: 1,
    title: "Sakura",
    price: "199 ₱",
    img: "/src/assets/product-img/sakura.jpg",
    description:
      "A delicate design with soft pink tones, inspired by cherry blossoms.",
    category: "Bracelet",
  },
  {
    id: 2,
    title: "Jade",
    price: "199 ₱",
    img: "/src/assets/product-img/jade.jpg",
    description: "Green jade-inspired design for a minimal yet elegant look.",
    category: "Brass Bracelet",
  },
  {
    id: 3,
    title: "Ivy",
    price: "399 ₱",
    img: "/src/assets/product-img/ivy.jpg",
    description: "Intricate winding patterns reminiscent of ivy vines.",
    category: "Necklace",
  },
  {
    id: 4,
    title: "Roses",
    price: "499 ₱",
    img: "/src/assets/product-img/assorted.jpg",
    description: "A romantic accent featuring rose-inspired shapes and colors.",
    category: "Bracelet",
  },
];
