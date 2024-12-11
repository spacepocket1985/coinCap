import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useGetCurrencyHistoryQuery } from '../../store/slices/apiSlice';
import { Spinner } from '../spinner/Spinner';
import { SubTitle } from '../ui/SubTitle';

export const CurrencyHistory: React.FC<{ currencyId: string }> = ({
  currencyId,
}) => {
  const { data: currency, isFetching } = useGetCurrencyHistoryQuery(currencyId);
  const content = (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={currency?.data}>
        <XAxis dataKey="date" />
        <YAxis
          label={{
            value: 'USD',
            angle: -90,
            position: 'insideLeft',
            offset: 0,
          }}
        />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
        <Line
          type="monotone"
          dataKey="priceUsd"
          stroke="#1976d2"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
  const contentOrSpinner = isFetching ? <Spinner /> : content;
  return (
    <>
      <SubTitle titleText={'Price change chart for the last 30 days'} />

      {contentOrSpinner}
    </>
  );
};
