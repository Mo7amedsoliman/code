import { VerifyToken } from "@/features/auth/services/auth.actions";
import { getUserOrders } from "@/features/orders/services/orders.actions";
import OrdersScreen from "@/features/orders/screens/OrdersScreen";

export default async function OrdersPage() {
  const auth = await VerifyToken();
  if (!auth.isAuthenticated || !auth.userInfo?.id) {
    return <OrdersScreen orders={[]} isAuthenticated={auth.isAuthenticated} error={auth.isAuthenticated ? "Could not identify your account. Please sign in again." : undefined} />;
  }

  const result = await getUserOrders(auth.userInfo.id);
  return <OrdersScreen orders={result.orders} error={result.error} isAuthenticated />;
}
