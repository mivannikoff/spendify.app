import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/ru';

dayjs.extend(customParseFormat);
dayjs.extend(localeData);
dayjs.locale('ru');

interface Income {
  id: string;
  description: string;
  amount: number;
  expand: {
    source_id: {
      name: string;
    };
  };
  date: string;
}

interface IncomeItem {
  id: string;
  description: string;
  amount: number;
  source: string;
}

interface GroupedData {
  date: string;
  totalAmount: number;
  data: IncomeItem[];
}

/**
 * Groups incomes by date and calculates total amount for each date.
 * @param incomes - The list of paginated incomes.
 * @param allIncomes - The complete list of incomes for calculating total amounts per date.
 * @returns Grouped data by date with total amounts.
 */
export function groupIncomesByDate(
  incomes: Income[],
  allIncomes: Income[],
): GroupedData[] {
  const totalAmountsByDate = allIncomes.reduce<Record<string, number>>(
    (acc, income) => {
      const date = dayjs(income.date).format('DD MMMM YYYY');

      acc[date] = (acc[date] || 0) + income.amount;

      return acc;
    },
    {},
  );

  const groupedData: Record<string, { data: IncomeItem[] }> = {};

  incomes.forEach((income) => {
    const date = dayjs(income.date).format('DD MMMM YYYY');
    const incomeObject: IncomeItem = {
      id: income.id,
      description: income.description,
      amount: income.amount,
      source: income.expand.source_id.name,
    };

    if (!groupedData[date]) {
      groupedData[date] = { data: [] };
    }

    groupedData[date].data.push(incomeObject);
  });

  return Object.entries(groupedData).map(([date, { data }]) => ({
    date,
    totalAmount: parseFloat((totalAmountsByDate[date] || 0).toFixed(2)),
    data,
  }));
}

export default groupIncomesByDate;
