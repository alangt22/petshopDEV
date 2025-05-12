import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "@/contexts/CartContext";

export function Header() {
  const [open, setOpen] = useState(false);
  const { cartAmount, cart, total, addItemCart, removeItemCart, clearCart} = useContext(CartContext);

  return (
    <header className="w-full flex items-center justify-between p-4 shadow-md bg-slate-200 sticky top-0 z-50">
      <Link to="/">
        <h1 className="text-2xl font-medium">
          Petshop
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            DEV
          </span>
        </h1>
      </Link>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <div className="relative">
            <Button variant="outline" size="icon" className="cursor-pointer">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            {cartAmount > 0 && (
              <Badge className="absolute -top-1 -right-1 text-xs px-1.5 py-0.5 rounded-full">
                {cartAmount}
              </Badge>
            )}
          </div>
        </SheetTrigger>

        <SheetContent side="right" className="flex flex-col">
          <SheetHeader>
            <SheetTitle>Seu Carrinho</SheetTitle>
            <SheetDescription>
              Revise os produtos antes de finalizar a compra.
            </SheetDescription>
          </SheetHeader>

          <h1 className="font-bold text-2xl text-center my-4">Carrinho</h1>

          {/* Scroll interno com limite de altura */}
          {cart.length > 0 ? (
            <div className="flex-1 overflow-y-auto space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b-2 border-gray-300 px-6 py-3 max-w-[380px] mx-auto"
                >
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="w-20 h-20 object-contain"
                  />
                  <div className="flex flex-col items-end">
                    <strong className="text-sm">
                      {item.total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </strong>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => removeItemCart(item)}
                        className="bg-blue-400 hover:bg-blue-600 px-2 rounded text-white"
                      >
                        -
                      </button>
                      <span className="text-sm">{item.amount}</span>
                      <button
                        onClick={() => addItemCart(item)}
                        className="bg-blue-400 hover:bg-blue-600 px-2 rounded text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-10">Seu carrinho esta vazio</p>
          )}
          <div className="flex justify-between px-2">
            <p className="font-bold ">
              Total:
              <span className="text-blue-600">
                {(total || 0).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </p>
              {cart.length > 0 && (
                            <Button 
              onClick={clearCart} className="w-30  bg-red-600 hover:bg-red-500 mb-5 cursor-pointer">
              Limpar carrinho
            </Button>
              )}
          </div>
          {/* Link para página do carrinho */}
          <div className="mt-6 mx-auto">
            <Link to="/cart">
              <Button
                onClick={() => setOpen(false)}
                className="w-50  bg-blue-600 hover:bg-blue-500 mb-5 cursor-pointer"
              >
                Ir para o carrinho
              </Button>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
