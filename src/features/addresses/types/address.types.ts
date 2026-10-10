export type ShippingAddress = {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
};

export type AddressFields = Omit<ShippingAddress, "_id">;

export type AddressActionResult = {
  success: boolean;
  message: string;
  addresses?: ShippingAddress[];
  address?: ShippingAddress;
};
