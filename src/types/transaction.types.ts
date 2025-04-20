export interface TransactionViewModel {
  id: number;
  name: string;
  description: string | null;
  amount: number;
  type: string;
  date: Date;
  categoryId: number | null;
  budgetId: number;
}
