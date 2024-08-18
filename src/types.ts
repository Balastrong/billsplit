export type Bill = {
  id: string;
  name: string;
  createdAt: Date;
  members: Member[];
};

export type Member = {
  id: string;
  name?: string;
  items: BillItem[];
};

export type BillItem = {
  id: string;
  name?: string;
  price?: number;
};
