export interface IWellnessItem {
  _id: string;
  title: string;
  imageUrl: string;
  shortDescription: string;
  fullDescription?: string;
  price: number;
  date: string;
  rating: number;
  location: string;
  category: string;
  createdBy?: string;
}
