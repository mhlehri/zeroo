import { Blend } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black bg-cover bg-fixed pt-10 pb-16 text-slate-50 md:pb-10">
      <div className="container grid grid-cols-1 gap-8 px-6 md:grid-cols-3 md:px-16 lg:px-32">
        {/* About Section */}
        <div>
          <Blend />
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            About Rongberong
          </h3>
          <p className="text-sm leading-relaxed text-slate-100">
            Rongberong is your go-to destination for high-quality kids&apos;
            items and accessories. We strive to provide the best products for
            your little ones, ensuring safety, comfort, and style.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:underline">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/terms-and-condition" className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>
              Email:{" "}
              <Link
                href="mailto:support@Rongberong.com"
                className="text-blue-400 hover:underline"
              >
                support@Rongberong.com
              </Link>
            </li>
            <li>
              Phone:{" "}
              <Link
                href="tel:+1234567890"
                className="text-blue-400 hover:underline"
              >
                +1 234 567 890
              </Link>
            </li>
            <li>
              Address: 123 Rongberong Lane, Suite 456, Commerce City, ZZ 78901
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-primary-700 mt-8 border-t pt-6 text-center">
        <p className="text-sm text-slate-300">
          © {new Date().getFullYear()} Rongberong. All rights reserved.
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <Link href="#" className="text-slate-200 hover:text-slate-200">
            <i className="fab fa-facebook-f"></i> Facebook
          </Link>
          <Link href="#" className="text-slate-200 hover:text-slate-200">
            <i className="fab fa-twitter"></i> Twitter
          </Link>
          <Link href="#" className="text-slate-200 hover:text-slate-200">
            <i className="fab fa-instagram"></i> Instagram
          </Link>
        </div>
      </div>
    </footer>
  );
}
