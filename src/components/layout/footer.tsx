import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-200 py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Zeroo</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Zeroo is your go-to destination for high-quality kids&apos; items
            and accessories. We strive to provide the best products for your
            little ones, ensuring safety, comfort, and style.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
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
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>
              Email:{" "}
              <Link
                href="mailto:support@zeroo.com"
                className="text-blue-400 hover:underline"
              >
                support@zeroo.com
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
            <li>Address: 123 Zeroo Lane, Suite 456, Commerce City, ZZ 78901</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-slate-700 pt-6 text-center">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} Zeroo. All rights reserved.
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <Link href="#" className="text-slate-400 hover:text-slate-200">
            <i className="fab fa-facebook-f"></i> Facebook
          </Link>
          <Link href="#" className="text-slate-400 hover:text-slate-200">
            <i className="fab fa-twitter"></i> Twitter
          </Link>
          <Link href="#" className="text-slate-400 hover:text-slate-200">
            <i className="fab fa-instagram"></i> Instagram
          </Link>
        </div>
      </div>
    </footer>
  );
}
