export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  salesCount: number;
  image: string;
  gallery: string[];
  category: 'cue' | 'shaft' | 'accessory' | 'blindbag';
  label?: string;
  description: string;
  specs: {
    weight?: string;
    shaftSize?: string;
    carbonContent?: string;
    tipType?: string;
    jointStyle?: string;
    material?: string;
    [key: string]: string | undefined;
  };
  reviews: {
    name: string;
    rating: number;
    date: string;
    comment: string;
  }[];
}

export interface CartItem {
  id: string; // unique id supporting customization attributes for duplicate item tracking
  product: Product;
  quantity: number;
  selectedSpecs?: {
    weight?: string;
    wrap?: string;
    tipDiameter?: string;
    [key: string]: string | undefined;
  };
}

export interface CustomCue {
  buttMaterial: string;
  shaftType: string;
  wrapStyle: string;
  jointType: string;
  diameter: string;
  weight: string;
  engravingText: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  category: string;
  image: string;
}

export interface CustomerFeedback {
  id: string;
  name: string;
  avatar: string;
  title: string;
  comment: string;
  rating: number;
}
