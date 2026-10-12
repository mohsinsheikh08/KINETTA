import Navbar from "../components/Navbar";
import DekstopNavbar from "../components/DekstopNavbar";
import MenImage from "@/public/Man_standing_in_studio_2K_20261012145115.jpg";
import BackImage from "@/public/Man_standing_in_studio_2K_20261012145201.jpg";
import WomenVideo from "../components/WomenVideo";
import WomenImage from '@/public/Woman_posing_in_athletic_wear_2K_20261009000152.jpg'
import BackWomenImage from '@/public/Woman_posing_in_athletic_wear_2K_20261009000245.jpg'
import ProductsGrid from "../components/ProductsGrid";
import Footer from "../components/Footer";
const page = () => {
  return (
    <div className="w-full  h-screen ">
      <Navbar />
      <DekstopNavbar />
      <ProductsGrid backImage={BackImage} frontImage={MenImage} price={4000} detail="KINETTA Performance Tee" heading="MEN'S COLLECTION" />
      <WomenVideo />
      <ProductsGrid backImage={BackWomenImage} frontImage={WomenImage} price={2000} detail="KINETTA Women's Training Set" heading="WOMEN'S COLLECTION"  />
      <Footer/>
    </div>
  );
};

export default page;
