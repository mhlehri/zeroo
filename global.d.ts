declare global {
  type TUser = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    role: string;
    createdAt?: string;
    updatedAt?: string;
  };

  type TCartProduct = {
    id: string;
    name: string;
    price: number;
    image?: string;
    stock: number;
  };

  type TOrder = {
    _id: string;
    user: TUser;
    name: string;
    email: string;
    phone: string;
    address: string;
    products: {
      product: TProduct | string;
      quantity: number;
    }[];
    paymentMethod: string;
    paymentStatus: string;
    totalAmount: number;
    orderStatus: string;
    transactionId: string;
    isDeleted: boolean;
    createdAt?: string;
    updatedAt?: string;
  };
  type TReview = {
    _id: string;
    productId: string;
    userId?: string;
    rating: number;
    comment: string;
    isShown?: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
  type TProduct = {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    images: string[];
    isDeleted: boolean;
    discountPrice?: number;
    discountType?: string;
    sku?: string;
    isPublished?: boolean;
    variants?: {
      size: string;
      stock: number;
    }[];
    tags?: string[];
  };
  type TCategory = {
    _id: string;
    name: string;
    image: string;
    subCategories: {
      name: string;
      isPublished?: boolean;
      isDeleted?: boolean;
    }[];
    isDeleted: boolean;
    createdAt?: string;
    updatedAt?: string;
  };

  type Status = "active" | "inactive" | "suspended";
}
export {};
