import PageMotion from "@/components/PageMotion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/cart/CartProvider";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageMotion>
      <CartProvider>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </CartProvider>
    </PageMotion>
  );
}