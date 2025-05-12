import { useContext, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CartContext } from "@/contexts/CartContext";
import toast from "react-hot-toast";


export interface ProductProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
}

export function Home() {
  const [product, setProducts] = useState<ProductProps[]>([]);
   const { addItemCart } = useContext(CartContext);
   

  useEffect(() => {
    async function getProducts() {
      fetch('../db.json')
        .then((response) => response.json())
        .then((data) => setProducts(data.products));
    }
    getProducts();
  }, []);
    function handleAddCartItem(product: ProductProps) {
    toast.success("Produto adicionado ao carrinho", {
      style: {
        borderRadius: 10,
        backgroundColor: "#121212",
        color: "#fff",
      },
    });
    addItemCart(product);
  }

  return (
    <section className="w-full max-w-7xl px-4 mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {product.map((product) => (
          <Card key={product.id} className="p-0 overflow-hidden">
            <CardHeader className="p-0">
                <Link to={`/cartdetail/${product.id}`}>
                  <img className="w-full hover:scale-110 duration-300" src={product.cover} alt={product.title} />
                </Link>
            </CardHeader>

            <CardContent className="p-4">
              <CardTitle className="text-lg">{product.title}</CardTitle>
              <CardDescription className="line-clamp-2 text-sm text-gray-500">
                {product.description}
              </CardDescription>
            </CardContent>

            <CardFooter className="p-4 flex items-center justify-between">
              <p className="font-semibold text-gray-800">R$ {product.price.toFixed(2)}</p>
              <Button className="bg-blue-400 hover:bg-blue-600 cursor-pointer" onClick={() => handleAddCartItem(product)} size="sm">Comprar</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
