import BrandsScreen from "@/features/brands/screens/BrandsScreen";
import getAllBrands from "@/features/brands/services/getAllBrands";

export default async function BrandsPage() {
  const response = await getAllBrands();
  return <BrandsScreen brands={response.data} />;
}
