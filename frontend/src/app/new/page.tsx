import ProductPage from "@/src/components/ArrivalComp/ProductPage";
import DekstopNavbar from "@/src/components/LandingComp/DekstopNavbar";
import Footer from "@/src/components/LandingComp/Footer";
import MobileSidebar from "@/src/components/LandingComp/MobileSidebar";
import Navbar from "@/src/components/LandingComp/Navbar";
const NewArrivals = () => {

  return (
    <div>
      <DekstopNavbar />
      <MobileSidebar />
      <Navbar />
      <ProductPage />
      <Footer />
    </div>
  );
};

export default NewArrivals;
