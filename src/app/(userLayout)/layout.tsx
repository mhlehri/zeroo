import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar/navbar";
import { Toaster } from "@/components/ui/sonner";
import Provider from "@/lib/provider";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "../globals.css";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";

const lato = Lato({
  weight: ["400", "900", "700"],
  variable: "--font-lato-sans",
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
      <body className={` ${lato.variable} antialiased`}>
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
