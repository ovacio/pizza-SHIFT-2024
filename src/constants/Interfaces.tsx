export interface Modal {
  isVisible: boolean;
  children?: React.ReactNode;
  selectedPizzaId: number | null;
  className?: string;
  overlayClassName?: string;
  onClose: () => void;
}

export interface DebitCard {
  pan: string;
  expireDate: string;
  cvv: string;
}

export interface PizzaSize {
  name: string;
  price: number;
}

export interface PizzaDough {
  name: string;
  price: number;
}

export interface CartItem {
  pizza: Pizza;
  size: string;
  toppings: PizzaToppings[];
  price: number;
  initialPrice: number;
}

export interface Pizza {
  id: number;
  name: string;
  description: string;
  img: string;
  calories: string;
  doughs: PizzaDough[];
  toppings: PizzaToppings[];
  sizes: PizzaSize[];
}

export interface PizzaToppings {
  name: string;
  cost: number;
  img: string;
}

export interface InformationOrder {
  phone: string;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  receiverAddress: ReceiverAdress[];
}

export interface ReceiverAdress {
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

export interface ApiResponse {
  catalog: Pizza[];
}

export interface Session {
  phone: string;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  city: string;
}
