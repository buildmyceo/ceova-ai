export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export interface ChatState {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
}

export enum PlatformCategory {
  SHOPIFY = 'Shopify',
  WORDPRESS = 'WordPress',
  ODOO = 'Odoo',
  WOO_COMMERCE = 'WooCommerce',
  CODE_BASED = 'Code Based',
  APP = 'Application'
}

export interface Product {
  name: string;
  price: string;
  url: string;
  category: PlatformCategory;
}