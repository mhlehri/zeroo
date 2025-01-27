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
  type TProduct = {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    images: string[];
    isDeleted: boolean;
  };
  type TCategory = {
    _id: string;
    name: string;
    isDeleted: boolean;
  };

  type Status = "active" | "inactive" | "suspended";
}
export {};
