import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { ProductProps } from "../home";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CartContext } from "@/contexts/CartContext";
import { useContext } from "react";
import toast from "react-hot-toast";

export function CartDetail() {
  const [products, setProducts] = useState<ProductProps | null>(null);
  const { id } = useParams();
  const { addItemCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProducts() {
        fetch(`../db.json`)
        .then((response) => response.json())
        .then((data) => setProducts(data.products.find((product: ProductProps) => product.id === Number(id))));
    }
    getProducts();
  }, []);

  if (!products) {
    return <p className="text-center py-10">Carregando produto...</p>;
  }

  function handleAddCartItem(product: ProductProps) {
        toast.success("Produto adicionado ao carrinho", {
      style: {
        borderRadius: 10,
        backgroundColor: "#121212",
        color: "#fff",
      },
    });
    navigate("/cart");
    addItemCart(product);
  }

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para Produtos
      </Link>
      <h1 className="text-3xl font-bold mb-6">Detalhes do produto</h1>

      <div className="flex flex-col md:flex-row gap-10 bg-white rounded-xl shadow-md p-6">
        {/* Imagem menor e com visibilidade total */}
        <div className="flex-1 flex items-center justify-center bg-gray-50 p-4 rounded-lg">
          <img
            src={products.cover}
            alt={products.title}
            className="h-60 object-contain"
          />
        </div>

        {/* Informações */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-2">{products.title}</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {products.description}
            </p>
            <p className="text-xl font-bold text-blue-600">
              R$ {products.price.toFixed(2)}
            </p>
          </div>

          <Button onClick={() => handleAddCartItem(products)} className="mt-6 w-full md:w-auto bg-blue-400 hover:bg-blue-500 cursor-pointer">
            Adicionar ao carrinho
          </Button>
        </div>
      </div>
    </section>
  );
}
