export interface IBlog {
  title: string;
  author: string;
  url: string;
  user?: string;
  id: string;
  likes?: number;
  showRemoveBtn: boolean;
  _id: string;
}
