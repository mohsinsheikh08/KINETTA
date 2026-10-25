import DekstopNavbar from "@/src/components/LandingComp/DekstopNavbar";
import Footer from "@/src/components/LandingComp/Footer";
import MobileSidebar from "@/src/components/LandingComp/MobileSidebar";
import Navbar from "@/src/components/LandingComp/Navbar";
import ProductGrid from "@/src/components/MenComp/ProductGrid";

const Men = () => {
  return (
    <div>
      <DekstopNavbar />
      <MobileSidebar />
      <Navbar />
      <ProductGrid category="Men" heading="Kinetta Men's" />
      <Footer />
    </div>
  );
};

export default Men;
