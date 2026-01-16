export interface Modifier {
  id: string;
  name: string;
  price: number;
  type: 'boolean' | 'quantity';
  default: boolean | number;
}
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  calories: number;
  image: string;
  categoryId: string;
  popular?: boolean;
  modifiers?: Modifier[];
}
export interface Category {
  id: string;
  name: string;
}
export const CATEGORIES: Category[] = [
  { id: 'featured', name: 'Featured' },
  { id: 'cravings', name: 'Cravings Value' },
  { id: 'tacos', name: 'Tacos' },
  { id: 'burritos', name: 'Burritos' },
  { id: 'quesadillas', name: 'Quesadillas' },
  { id: 'sides', name: 'Sides & Sweets' },
  { id: 'drinks', name: 'Drinks' },
];
const COMMON_MODIFIERS: Modifier[] = [
  { id: 'no-lettuce', name: 'No Lettuce', price: 0, type: 'boolean', default: false },
  { id: 'extra-cheese', name: 'Extra Cheese', price: 0.60, type: 'boolean', default: false },
  { id: 'add-sour-cream', name: 'Add Sour Cream', price: 0.50, type: 'boolean', default: false },
  { id: 'sub-steak', name: 'Swap for Steak', price: 1.20, type: 'boolean', default: false },
];
export const PRODUCTS: Product[] = [
  // Featured / Tacos
  {
    id: 't1',
    name: 'Crunchy Taco Supreme®',
    description: 'A crunchy corn tortilla shell filled with seasoned beef, cool sour cream, crisp shredded lettuce, shredded cheddar cheese and ripe tomatoes.',
    price: 2.39,
    calories: 190,
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80',
    categoryId: 'tacos',
    popular: true,
    modifiers: COMMON_MODIFIERS
  },
  {
    id: 't2',
    name: 'Soft Taco',
    description: 'A warm flour tortilla filled with seasoned beef, crisp shredded lettuce and shredded cheddar cheese.',
    price: 1.79,
    calories: 180,
    image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=800&q=80',
    categoryId: 'tacos',
    modifiers: COMMON_MODIFIERS
  },
  {
    id: 't3',
    name: 'Doritos® Locos Tacos',
    description: 'A crunchy taco shell made from Nacho Cheese Doritos® is filled with seasoned beef, crisp shredded lettuce, and shredded cheddar cheese.',
    price: 2.59,
    calories: 170,
    image: 'https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&w=800&q=80',
    categoryId: 'tacos',
    popular: true,
    modifiers: COMMON_MODIFIERS
  },
  // Burritos
  {
    id: 'b1',
    name: 'Bean Burrito',
    description: 'A warm flour tortilla loaded with hearty beans, real cheddar cheese, and tangy red sauce.',
    price: 1.99,
    calories: 350,
    image: 'https://images.unsplash.com/photo-1566740933430-b5e70b06d2d5?auto=format&fit=crop&w=800&q=80',
    categoryId: 'burritos',
    modifiers: COMMON_MODIFIERS
  },
  {
    id: 'b2',
    name: 'Beefy 5-Layer Burrito',
    description: 'Seasoned beef, beans, sour cream, cheese and nacho cheese sauce wrapped in a flour tortilla.',
    price: 3.69,
    calories: 490,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
    categoryId: 'burritos',
    popular: true,
    modifiers: COMMON_MODIFIERS
  },
  // Quesadillas
  {
    id: 'q1',
    name: 'Chicken Quesadilla',
    description: 'An extra large flour tortilla filled with melty three-cheese blend, fire grilled chicken, and creamy jalapeño sauce.',
    price: 5.19,
    calories: 510,
    image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=800&q=80',
    categoryId: 'quesadillas',
    modifiers: COMMON_MODIFIERS
  },
  // Cravings
  {
    id: 'c1',
    name: 'Cheesy Roll Up',
    description: 'A flour tortilla rolled up with a three-cheese blend. Simple and delicious.',
    price: 1.00,
    calories: 180,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cravings',
    modifiers: []
  },
  {
    id: 'c2',
    name: 'Spicy Potato Soft Taco',
    description: 'Crispy potato bites, lettuce, cheese and creamy chipotle sauce in a flour tortilla.',
    price: 1.29,
    calories: 240,
    image: 'https://images.unsplash.com/photo-1624300626419-bda14d960916?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cravings',
    popular: true,
    modifiers: COMMON_MODIFIERS
  },
  // Sides
  {
    id: 's1',
    name: 'Nachos BellGrande®',
    description: 'A portion of crispy tortilla chips topped with warm nacho cheese sauce, refried beans, seasoned beef, ripe tomatoes and cool sour cream.',
    price: 5.69,
    calories: 740,
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80',
    categoryId: 'sides',
    modifiers: COMMON_MODIFIERS
  },
  {
    id: 's2',
    name: 'Cinnabon® Delights',
    description: 'Warm donut holes filled with Cinnabon® frosting and dusted with Makara cinnamon sugar.',
    price: 2.29,
    calories: 160,
    image: 'https://images.unsplash.com/photo-1621251336073-6775d7208856?auto=format&fit=crop&w=800&q=80',
    categoryId: 'sides',
    modifiers: []
  },
  // Drinks
  {
    id: 'd1',
    name: 'Baja Blast®',
    description: 'A tropical lime storm.',
    price: 2.49,
    calories: 280,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    categoryId: 'drinks',
    modifiers: []
  }
];