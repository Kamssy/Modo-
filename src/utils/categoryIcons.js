import { 
  ShoppingCart, 
  Briefcase, 
  UtensilsCrossed, 
  Car, 
  Music, 
  Zap, 
  Smartphone, 
  Heart,
  TrendingUp,
  Gift,
  Plus
} from "lucide-react";

export const CATEGORY_ICONS = {
  groceries: ShoppingCart,
  salary: Briefcase,
  food: UtensilsCrossed,
  transport: Car,
  subscription: Music,
  bills: Zap,
  entertainment: Smartphone,
  health: Heart,
  investment: TrendingUp,
  gift: Gift,
  "side-hustle": Plus,
  "Groceries": ShoppingCart,
  "Income": Briefcase,
  "Food": UtensilsCrossed,
  "Transport": Car,
  "Subscription": Music,
};

export const getIconForCategory = (category) => {
  return CATEGORY_ICONS[category] || ShoppingCart;
};
