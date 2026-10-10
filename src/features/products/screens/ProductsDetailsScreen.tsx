import getSpecifcProduct from "../services/getSpecifcProduct";
import ProductInfo from "../components/ProductDetails/ProductInfo";

export default async function ProductsDetailsScreen({ id }: { id: string }) {
  const ProductDetailsResponse = await getSpecifcProduct(id);

  return <ProductInfo productInfo={ProductDetailsResponse.data} />;
}
