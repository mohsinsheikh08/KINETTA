import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "../context/AuthProvider";
import ProductProvider from "../context/ProductProvider";
import CartProvider from "../context/CartProvider";
import OrderProvider from "../context/OrderProvider";
import ReviewProvider from "../context/ReviewProvider";
import WishlistProvider from "../context/WishlistProvider";

import { Montserrat, Roboto } from "next/font/google";

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const roboto = Roboto({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "KINETTA — Premium Gym Wear",
  description: "Premium gym wear for those who train with purpose. Built for movement. Designed for performance.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <OrderProvider>
                <ReviewProvider>
                  <WishlistProvider>{children}</WishlistProvider>
                </ReviewProvider>
              </OrderProvider>
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
