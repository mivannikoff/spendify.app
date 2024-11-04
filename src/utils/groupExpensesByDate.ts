import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/ru';

dayjs.extend(customParseFormat);
dayjs.extend(localeData);

dayjs.locale('ru');

export function groupExpensesByDate(expenses) {
  const groupedData = {};

  expenses.forEach((expense) => {
    const date = dayjs(expense.date.split('T')[0]).format('DD MMMM YYYY');

    const expenseObject = {
      id: expense.id,
      description: expense.description,
      amount: expense.amount,
      category: expense.expand.category_id.name,
    };

    if (!groupedData[date]) {
      groupedData[date] = { data: [], totalAmount: 0 };
    }
    groupedData[date].data.push(expenseObject);
    groupedData[date].totalAmount += expense.amount;
  });

  // @ts-ignore
  return Object.entries(groupedData).map(([date, { data, totalAmount }]) => ({
    date,
    totalAmount: parseFloat(totalAmount.toFixed(2)),
    data,
  }));
}

export default groupExpensesByDate;
