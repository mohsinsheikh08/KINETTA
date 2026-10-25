import DekstopNavbar from "@/src/components/LandingComp/DekstopNavbar";
import MobileSidebar from "@/src/components/LandingComp/MobileSidebar";
import Navbar from "@/src/components/LandingComp/Navbar";
import ProductGrid from "@/src/components/MenComp/ProductGrid";

const Men = () => {
  return (
    <div>
      <DekstopNavbar />
      <MobileSidebar />
      <Navbar />
      <div className="flex flex-col  gap-12">
        <h1 className="font-heading md:pt-20 pt-5 md:pl-10 pl-4 font-semibold  text-3xl sm:text-4xl leading-15 md:text-6xl lg:7xl">Kinetta Men&rsquo;s</h1>
        <ProductGrid />
      </div>
    </div>
  );
};

export default Men;
