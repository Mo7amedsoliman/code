import ShopScreen from "@/features/products/screens/ShopScreen";
import getAllProducts from "@/features/products/services/getAllProducts";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ keyword?: string | string[] }>;
}) {
  const params = await searchParams;
  const keywordValue = params.keyword;
  const keyword = Array.isArray(keywordValue) ? keywordValue[0] : keywordValue;
  const response = await getAllProducts({ keyword, limit: 40 });

  return (
    <ShopScreen
      products={response.data}
      total={response.results}
      initialSearch={keyword}
    />
  );
}
