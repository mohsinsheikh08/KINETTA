"use client";
import Image from "next/image";
import Link from "next/link";
import { Roboto } from "next/font/google";
import useProduct from "@/src/hooks/useProduct";
import { X } from "lucide-react";
import MainImage from "@/public/men_landing_page_image.jpg";

const roboto = Roboto({ subsets: ["latin"], weight: ["600"] });

const collections = [
  { label: "Men's Collection", href: "/mens" },
  { label: "Women's Collection", href: "/womens" },
  { label: "Shop", href: "/shop" },
  { label: "New Arrivals", href: "/new" },
];
const MobileSidebar = () => {
  const { isOpen, setIsOpen } = useProduct();

  return (
    <div
      className={`fixed md:hidden inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}
      inert={!isOpen}
    >
      {/* Dark backdrop */}
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 motion-reduce:transition-none ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Sidebar panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className={`${roboto.className} absolute left-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-white font-semibold text-black shadow-xl transition-transform duration-300 ease-out motion-reduce:transition-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top: logo with a full-width bottom border */}
        <header className="flex w-full items-center justify-between border-b border-black/20 px-5 py-4">
          <Link
            href="/"
            className="text-2xl tracking-[0.2em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            <Image
              width={500}
              height={500}
              className="w-[50%]"
              src="https://ik.imagekit.io/mohsinsheikh08/kinetta/product/KinettaText.png?updatedAt=1791505574850"
              alt="Man"
            />
          </Link>

          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            type="button"
            aria-label="Close menu"
            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
          >
            <X />
          </button>
        </header>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto px-5 py-2">
          <ul>
            {collections.map((item, idx) => (
              <li key={idx} className="border-b border-black/10">
                <Link
                  href={item.href}
                  className="flex items-center justify-between py-4 text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom: image, full width of the panel with side padding, 1/3 height */}
        <div className="h-1/3 shrink-0 px-5 pb-5 pt-3">
          <div className="relative h-full w-full overflow-hidden rounded-lg bg-black/5">
            <Image
              src={MainImage}
              alt="KINETTA gym wear"
              fill
              sizes="(max-width: 640px) 85vw, 384px"
              className="object-cover"
            />
          </div>
        </div>
      </aside>
    </div>
  );
};

export default MobileSidebar;
