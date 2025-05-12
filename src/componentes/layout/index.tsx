import { Outlet } from "react-router-dom";
import { Header } from "../header";
import { Footer } from "../footer";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Header />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
