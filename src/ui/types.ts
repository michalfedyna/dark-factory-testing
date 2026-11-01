import type { ImageSourcePropType } from 'react-native';
export type Category = 'All' | 'Electric' | 'Road' | 'Mountain' | 'Accessories';
export interface ProductView { id: string; name: string; category: Category; categoryLabel: string; priceLabel: string; image: ImageSourcePropType; description: string; specifications: readonly {label: string; value: string}[]; favorite: boolean }
export interface CartLineView { product: ProductView; quantity: number }
export interface TotalsView { subtotal: string; shipping: string; discount: string; total: string }
export type AddressField = 'name' | 'street' | 'city' | 'region' | 'postalCode' | 'country';
export type AddressView = Record<AddressField, string>;
