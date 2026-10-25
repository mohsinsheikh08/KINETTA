import DekstopNavbar from "@/src/components/LandingComp/DekstopNavbar";
import Footer from "@/src/components/LandingComp/Footer";
import MobileSidebar from "@/src/components/LandingComp/MobileSidebar";
import Navbar from "@/src/components/LandingComp/Navbar";
import ProductGrid from "@/src/components/MenComp/ProductGrid";

const Women = () => {
  return (
    <div>
      <DekstopNavbar />
      <MobileSidebar />
      <Navbar />
      <ProductGrid category="Women" heading="Kinetta Women's" />
      <Footer />
    </div>
  );
};

export default Women;
