import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/ru';

dayjs.extend(customParseFormat);
dayjs.extend(localeData);
dayjs.locale('ru');

interface Expense {
  id: string;
  description: string;
  amount: number;
  expand: {
    category_id: {
      name: string;
    };
  };
  date: string;
}

interface ExpenseItem {
  id: string;
  description: string;
  amount: number;
  category: string;
}

interface GroupedData {
  date: string;
  totalAmount: number;
  data: ExpenseItem[];
}

/**
 * Groups expenses by date and calculates total amount for each date.
 * @param expenses - The list of paginated expenses.
 * @param allExpenses - The complete list of expenses for calculating total amounts per date.
 * @returns Grouped data by date with total amounts.
 */
export function groupExpensesByDate(
  expenses: Expense[],
  allExpenses: Expense[],
): GroupedData[] {
  const totalAmountsByDate = allExpenses.reduce<Record<string, number>>(
    (acc, expense) => {
      const date = dayjs(expense.date).format('DD MMMM YYYY');

      acc[date] = (acc[date] || 0) + expense.amount;

      return acc;
    },
    {},
  );

  const groupedData: Record<string, { data: ExpenseItem[] }> = {};

  expenses.forEach((expense) => {
    const date = dayjs(expense.date).format('DD MMMM YYYY');
    const expenseObject: ExpenseItem = {
      id: expense.id,
      description: expense.description,
      amount: expense.amount,
      category: expense.expand.category_id.name,
    };

    if (!groupedData[date]) {
      groupedData[date] = { data: [] };
    }

    groupedData[date].data.push(expenseObject);
  });

  return Object.entries(groupedData).map(([date, { data }]) => ({
    date,
    totalAmount: parseFloat((totalAmountsByDate[date] || 0).toFixed(2)),
    data,
  }));
}

export default groupExpensesByDate;
