export interface PizzaSize {
  name: string;
  price: number;
}

export interface PizzaDough {
  name: string;
  price: number;
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

export interface CartItem {
  pizza: Pizza;
  size: string;
  toppings: PizzaToppings[];
  price: number;
  initialPrice: number;
}
