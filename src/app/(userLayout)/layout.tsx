import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar/navbar";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { Toaster } from "@/components/ui/sonner";
import Provider from "@/lib/provider";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zeroo - Start from zero",
  description: "e-commerce, clothing store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${roboto.variable} text-slate-900 antialiased`}>
        <Provider>
          <Navbar />
          {children}
          <Footer />
          <Toaster
            position="top-center"
            mobileOffset={{ top: "1rem", bottom: "90%" }}
          />
          <ScrollToTopButton />
        </Provider>
      </body>
    </html>
  );
}
