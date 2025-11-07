export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: Date;
}

export interface Income {
  _id: string;
  name: string;
  description: string;
  amount: number;
  category: string;
}
