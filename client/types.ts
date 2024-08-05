export interface SharedNavProps {
  navOpen: boolean;
  setNavOpen: (value: boolean) => void;
}

export interface Book
{
  id: string;
  title: string;
  author: string;
  price: number | null;
  rating: number | null;
  favourited: boolean | null;
}

export interface PaginatedBooks {
  data: Book[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ApiResponse
{
  data: Book[];
}