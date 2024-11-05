import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/ru';

dayjs.extend(customParseFormat);
dayjs.extend(localeData);

dayjs.locale('ru');

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

export function groupExpensesByDate(
  expenses: any[],
  totalAmountsByDate: Record<string, number>,
): GroupedData[] {
  const groupedData: Record<string, { data: ExpenseItem[] }> = {};

  expenses.forEach((expense) => {
    const date = dayjs(expense.date.split('T')[0]).format('DD MMMM YYYY');
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
