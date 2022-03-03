export interface Attribute {
  displayValue: string;
  value: string;
  id: string;
}

export interface AttributeSet {
  id: string;
  name: string;
  interface: string;
  items: Attribute[];
}
export interface Price {
    currency: Currency;
    amount: number;
  }
export interface Product {
  id: string;
  name: string;
  inStock: Boolean;
  gallery: string[];
  description: string;
  category: string;
  attributes: AttributeSet[];
  prices: Price[];
  brand: string;
}

export interface Category {
  name: string;
  products: Product[];
}

export interface Currency {
  label: string;
  symbol: string;
}

export interface CategoryInput {
  title: string;
}

export interface Query {
  categories: Category[];
  category(input: CategoryInput): Category;
  product(id: string): Product;
  currencies: Currency[];
}
