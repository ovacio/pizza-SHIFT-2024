// src/@types/interfacesApi.d.ts

interface DebitCard {
  pan: string;
  expireDate: string;
  cvv: string;
}

interface InformationOrder {
  phone: string;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  receiverAddress: RecipientAddress[];
}

interface RecipientAddress {
  street: string;
  house: string;
  apartment: string;
  comment: string;
}

interface PostData {
  receiverAddress: {
    street: string;
    house: string;
    apartment: string;
    comment: string;
  };
  person: {
    firstname: string;
    lastname: string;
    middlename?: string;
    phone: string;
  };
  debitCard: DebitCard;
  pizzas: {
    id: string;
    name: string;
    toppings: { name: string; cost: number; img: string }[];
    description: string;
    size: {
      name: string;
      price: number;
    };
    doughs: {
      name: string;
      price: number;
    };
  }[];
}

interface User {
  phone: string;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  city: string;
}

interface SessionResponse {
  success: boolean;
  reason: string;
  user: User;
}

interface Profile {
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  city: string;
}

interface Person {
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
}

interface Order {
  _id: string;
  person: Person;
  receiverAddress: RecipientAddress;
  status: number;
  cancellable: boolean;
}

interface OrdersResponse {
  orders: Order[];
  success: boolean;
}

interface Data {
  profile: Profile;
  phone: string;
}

interface SignIn {
  success: boolean;
  reason: string;
  user: User;
  token: string;
}
