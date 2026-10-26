import ProductPage from "@/src/components/ArrivalComp/ProductPage";
import DekstopNavbar from "@/src/components/LandingComp/DekstopNavbar";
import MobileSidebar from "@/src/components/LandingComp/MobileSidebar";
import Navbar from "@/src/components/LandingComp/Navbar";
const NewArrivals = () => {

  return (
    <div>
      <DekstopNavbar />
      <MobileSidebar />
      <Navbar />
      <ProductPage />
    </div>
  );
};

export default NewArrivals;
