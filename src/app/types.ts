export interface Product {
  id: string;
  brand: string;
  name: string;
  subtitle: string;
  model: string;
  image: string;
  color: string;
  retail: number | null;
  koreanName?: string;
  colorway?: string;
  retailUsd?: number;
  sourceUrl?: string;
  releaseDate: string;
  upcoming: boolean;
  popular: number;
  change: number;
  description: string;
  history: { date: string; price: number }[];
  price: number | null;
  sizes: number[];
}
export interface User {
  id: string;
  email: string;
  name: string;
}
export interface Account extends User {
  salt: string;
  passwordHash: string;
  following: string[];
}
export interface Offer {
  id: string;
  productId: string;
  userId: string;
  size: number;
  price: number;
  condition: "new" | "used";
  status: "on_sale" | "sold" | "cancelled";
  createdAt: string;
}
export interface Order {
  id: string;
  userId: string;
  productId: string;
  offerId: string;
  size: number;
  price: number;
  shipping: number;
  total: number;
  recipient: string;
  address: string;
  status: "confirmed" | "cancelled";
  createdAt: string;
}
export interface Comment {
  id: string;
  productId: string;
  userId: string;
  author: string;
  text: string;
  createdAt: string;
}
export interface News {
  id: string;
  title: string;
  category: string;
  image: string;
  summary: string;
  paragraphs: string[];
}
export interface Database {
  version: 2;
  catalogRevision?: number;
  products: Product[];
  accounts: Account[];
  offers: Offer[];
  orders: Order[];
  comments: Comment[];
  session: string | null;
}
export interface Session {
  user: User | null;
  following: string[];
}
export interface Profile {
  orders: Order[];
  listings: Offer[];
}
