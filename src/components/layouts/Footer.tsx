import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import logo from "../../../public/logos/logo5.png";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <Image src={logo} alt="FoodPrime Logo" width={40} height={40} />
            <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter italic">
              food<span className="text-yellow-500">prime</span>
            </span>
          </div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 max-w-sm">
            Discover & order delicious meals from your favorite restaurants.
            Fast, fresh, and reliable food delivery at your doorstep.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-5">
            <Link href="#" className="text-gray-500 hover:text-yellow-500">
              <Facebook size={20} />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-yellow-500">
              <Instagram size={20} />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-yellow-500">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-yellow-500">
              <Youtube size={20} />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:text-yellow-500">
                Home
              </Link>
            </li>
            <li>
              <Link href="/menu" className="hover:text-yellow-500">
                Menu
              </Link>
            </li>
            <li>
              <Link href="/providers" className="hover:text-yellow-500">
                Providers
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-yellow-500">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Company
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link href="/about" className="hover:text-yellow-500">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-yellow-500">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-yellow-500">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Contact
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>Email: support@foodprime.com</li>
            <li>Phone: +880 1234-567890</li>
            <li>Dhaka, Bangladesh</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} foodprime. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Built with ❤️ for food lovers</p>
        </div>
      </div>
    </footer>
  );
}
