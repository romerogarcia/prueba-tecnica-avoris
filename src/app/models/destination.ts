// Modelo compartido entre results.ts (que genera/filtra la lista) y card.ts (que la pinta).
export interface Destination {
  id: string;
  category: string; // ej. "Asia" (el h3 que agrupa la sección en results)
  place: string; // ej. "Marruecos, África · 6 días"
  title: string;
  imageUrl: string;
  price: number;
  isBundle: boolean;
  activityTags: string[]; // para el filtrado por checkbox: ['parapente', 'buceo', ...]
  priceBreakdown: {
    priceBeforeTax: number;
    tax: number;
    extra: number; // el concepto "Lorem ipsum" del mockup, renómbralo si quieres
    finalPrice: number;
  };
}
