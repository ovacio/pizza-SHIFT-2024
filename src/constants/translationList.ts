enum Ingredients {
  PINEAPPLE = 'PINEAPPLE',
  MOZZARELLA = 'MOZZARELLA',
  PEPERONI = 'PEPERONI',
  GREEN_PEPPER = 'GREEN_PEPPER',
  MUSHROOMS = 'MUSHROOMS',
  BASIL = 'BASIL',
  CHEDDAR = 'CHEDDAR',
  PARMESAN = 'PARMESAN',
  FETA = 'FETA',
  HAM = 'HAM',
  PICKLE = 'PICKLE',
  TOMATO = 'TOMATO',
  BACON = 'BACON',
  ONION = 'ONION',
  CHILE = 'CHILE',
  SHRIMPS = 'SHRIMPS',
  CHICKEN_FILLET = 'CHICKEN_FILLET',
  MEATBALLS = 'MEATBALLS'
}

enum SizesPizza {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE'
}

export const translationSizesPizza: { [key: string]: string } = {
  [SizesPizza.SMALL]: 'Маленькая, 25 см',
  [SizesPizza.MEDIUM]: 'Средняя, 30 см',
  [SizesPizza.LARGE]: 'Большая, 35 см'
}

export const translationIngredients: { [key: string]: string } = {
  [Ingredients.BACON]: 'Бекон',
  [Ingredients.BASIL]: 'Базилик',
  [Ingredients.CHEDDAR]: 'Чеддер',
  [Ingredients.CHICKEN_FILLET]: 'Куриное филе',
  [Ingredients.CHILE]: 'Чили',
  [Ingredients.FETA]: 'Сыр Фета',
  [Ingredients.GREEN_PEPPER]: 'Зеленый перец',
  [Ingredients.HAM]: 'Ветчина',
  [Ingredients.MEATBALLS]: 'Фрикадельки',
  [Ingredients.MOZZARELLA]: 'Моцарелла',
  [Ingredients.MUSHROOMS]: 'Грибы',
  [Ingredients.ONION]: 'Лук',
  [Ingredients.PEPERONI]: 'Пепперони',
  [Ingredients.PICKLE]: 'Соленые огурцы',
  [Ingredients.PINEAPPLE]: 'Ананас',
  [Ingredients.SHRIMPS]: 'Креветки',
  [Ingredients.TOMATO]: 'Помидоры',
  [Ingredients.PARMESAN]: 'Пармезан'
};
