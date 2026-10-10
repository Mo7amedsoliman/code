import FethuredProducts from "../components/FethuredProducts";
import Homecategories from "../components/Homecategories";
import HomeSlider from "../components/HomeSlider";

export default function HomeScreen() {
  return (
    <>
      <HomeSlider />
      <Homecategories />
      <FethuredProducts />
    </>
  );
}
