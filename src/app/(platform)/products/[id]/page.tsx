import ProductsDetailsScreen from "@/features/products/screens/ProductsDetailsScreen";
type params = Promise<{ id: string }>;

export default async function ProductDetailsPage({
  params,
}: {
  params: params;
}) {
  const { id } = await params;
  return (
    <>
      <ProductsDetailsScreen id={id} />
    </>
  );
}
