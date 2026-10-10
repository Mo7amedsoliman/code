export type OrderProduct = {
  _id?: string;
  title?: string;
  name?: string;
  imageCover?: string;
  price?: number;
};

export type OrderLineItem = {
  _id?: string;
  count: number;
  price: number;
  product?: OrderProduct | null;
};

export type OrderShippingAddress = {
  city?: string;
  details?: string;
  phone?: string;
};

export type CustomerOrder = {
  _id: string;
  createdAt?: string;
  status?: string;
  isPaid?: boolean;
  isDelivered?: boolean;
  totalOrderPrice?: number;
  totalPrice?: number;
  paymentMethodType?: string;
  cartItems?: OrderLineItem[];
  shippingAddress?: OrderShippingAddress;
};

export type OrdersResult = {
  orders: CustomerOrder[];
  error?: string;
};
