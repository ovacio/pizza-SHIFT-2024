interface PizzaSize {
  name: string;
  price: number;
}

interface PizzaDough {
  name: string;
  price: number;
}

interface Pizza {
  id: number;
  name: string;
  description: string;
  img: string;
  calories: string;
  doughs: PizzaDough[];
  toppings: PizzaToppings[];
  sizes: PizzaSize[];
}

interface PizzaToppings {
  name: string;
  cost: number;
  img: string;
}

interface CartItem {
  pizza: Pizza;
  size: string;
  toppings: PizzaToppings[];
  price: number;
  initialPrice: number;
}
