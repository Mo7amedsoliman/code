import ShopScreen from "@/features/products/screens/ShopScreen";
import getAllProducts from "@/features/products/services/getAllProducts";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{
    brand?: string | string[];
    category?: string | string[];
  }>;
}) {
  const params = await searchParams;
  const brandValue = params.brand;
  const brandId = Array.isArray(brandValue) ? brandValue[0] : brandValue;
  const categoryValue = params.category;
  const categoryId = Array.isArray(categoryValue)
    ? categoryValue[0]
    : categoryValue;
  const response = await getAllProducts({
    brand: brandId,
    category: categoryId,
    limit: 40,
  });

  return (
    <ShopScreen
      products={response.data}
      total={response.results}
      brandId={brandId}
      categoryId={categoryId}
    />
  );
}
