import { CartContext } from "@/contexts/CartContext";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

export function Cart() {
  const { cart, total, cartAmount, clearCart } = useContext(CartContext);
  const [address, setAddress] = useState("");
  const phoneNumber = "5511940094503";

  function handleSendWhatsApp() {
    if (!address.trim()) {
      toast.error("Por favor, informe seu endereço para continuar.");
      return;
    }

    const message = cart.map((item) => {
        const unitPrice = (item.total / item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const itemTotal = item.total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        return `🛍️ ${item.title}\nQtd: ${item.amount}\nValor unid.: ${unitPrice}\nSubtotal: ${itemTotal}\n`;
      }).join("\n");

    const formattedTotal = (total || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const fullMessage = `📦 *Pedido PetshopDEV*\n\n${message}\n🧾 *Valor Total:* ${formattedTotal}\n📍 *Endereço:* ${address}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(fullMessage)}`;

    window.open(url, "_blank");

    clearCart();
    setAddress('');
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Seu Carrinho</h1>

      {cartAmount > 0 ? (
        <div className="space-y-4">
          {cart.map((item) => (
            <section
              key={item.id}
              className="flex items-center justify-between border p-4 rounded shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.cover}
                  alt={item.title}
                  className="w-20 h-20 object-contain"
                />
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-gray-600">Quantidade: {item.amount}</p>
                  <strong className="text-blue-600">
                    Preço:
                    {item.total.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </strong>
                </div>
              </div>
            </section>
          ))}

          <div className="text-right mt-6 text-xl font-bold">
            Total: <span className="text-blue-600">{total}</span>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-center">Seu carrinho está vazio.</p>
      )}
      <div className="mt-6">
        <label className="block mb-2 font-medium">Endereço de entrega:</label>
        <input
          type="text"
          placeholder="Rua, número, bairro, cidade"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>

      <button
        onClick={handleSendWhatsApp}
        className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded cursor-pointer"
      >
        Enviar pedido via WhatsApp
      </button>
    </div>
  );
}
