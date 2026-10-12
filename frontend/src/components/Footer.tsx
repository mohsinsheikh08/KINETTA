import Link from "next/link";
import {
  faTwitter,
  faInstagram,
  faFacebook,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Footer = () => {
  return (
    <footer className="w-full bg-[#282D31] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          <div className="col-span-2 lg:col-span-2">
            <h2 className="font-heading font-bold text-3xl tracking-wider mb-4">
              KINETTA
            </h2>
            <p className="font-body text-sm text-white/70 max-w-xs">
              Premium gym wear for those who don&apos;t skip. Engineered for
              performance, built for every move.
            </p>

            <div className="flex gap-4 pt-4">
              <FontAwesomeIcon icon={faTwitter} className="w-5 h-5 " />
              <FontAwesomeIcon icon={faYoutube} className="w-5 h-5" />
              <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
              <FontAwesomeIcon icon={faFacebook} className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              Shop
            </h3>
            <ul className="space-y-3 font-body text-sm text-white/70">
              <li>
                <Link href="/mens" className="hover:text-white transition">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/womens" className="hover:text-white transition">
                  Women
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/new" className="hover:text-white transition">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              Help
            </h3>
            <ul className="space-y-3 font-body text-sm text-white/70">
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3 font-body text-sm text-white/70">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-white transition">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-white/50">
              © 2026 KINETTA. All rights reserved.
            </p>
            <div className="flex items-center gap-6 font-body text-xs text-white/50">
              <Link href="/privacy" className="hover:text-white transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
