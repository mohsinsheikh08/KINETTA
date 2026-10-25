import DekstopNavbar from "@/src/components/LandingComp/DekstopNavbar";
import Footer from "@/src/components/LandingComp/Footer";
import MobileSidebar from "@/src/components/LandingComp/MobileSidebar";
import Navbar from "@/src/components/LandingComp/Navbar";
import ProductGrid from "@/src/components/ShopComp/ProductGrid";

const ShopAll = () => {
  return (
    <div>
      <DekstopNavbar />
      <MobileSidebar />
      <Navbar />
      <ProductGrid heading="Kinetta All" />
      <Footer />
    </div>
  );
};

export default ShopAll;
