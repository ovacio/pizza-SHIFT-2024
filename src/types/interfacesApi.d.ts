export interface DebitCard {
  pan: string;
  expireDate: string;
  cvv: string;
}

export interface InformationOrder {
  phone: string;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  receiverAddress: RecipientAddress[];
}

export interface RecipientAddress {
  street: string;
  house: string;
  apartment: string;
  comment: string;
}

export interface PostData {
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

export interface UserInfo {
  phone: string;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  city: string;
}

export interface User {
  phone: string;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  city: string;
}

export interface SessionResponse {
  success: boolean;
  reason: string;
  user: User;
}
