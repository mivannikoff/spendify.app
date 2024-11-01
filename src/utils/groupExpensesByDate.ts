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
    const category = expense.expand.category_id.name;
    const description = expense.description;
    const amount = expense.amount;

    const expenseObject = {
      description: description,
      amount: amount,
      category: category,
    };

    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    groupedData[date].push(expenseObject);
  });

  return Object.entries(groupedData).map(([title, data]) => ({
    title,
    data,
  }));
}

export default groupExpensesByDate;
