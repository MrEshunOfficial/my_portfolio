export interface Contact {
  _id: string;
  name: string;
  email: string;
  description: string;
  createdAt: string;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalContacts: number;
  pageSize: number;
}