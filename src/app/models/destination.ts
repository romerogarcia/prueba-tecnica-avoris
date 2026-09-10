export interface Destination {
  id: string;
  category: string;
  place: string; 
  title: string;
  imageUrl: string;
  price: number;
  isBundle: boolean;
  activityTags: string[];
  priceBreakdown: {
    priceBeforeTax: number;
    tax: number;
    extra: number;
    finalPrice: number;
  };
}
