export type ShippingAddress = {
  city: string;
  details: string;
  phone: string;
};

export type CheckoutResult = {
  success: boolean;
  message: string;
  orderId?: string;
  checkoutUrl?: string;
};
