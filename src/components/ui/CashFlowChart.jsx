import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-ink rounded-sm px-3 py-2 shadow-elevated">
      <p className="text-[10px] font-semibold text-secondary mb-0.5">
        {label}
      </p>
      {payload.map((entry, index) => (
        <p key={index} className="text-[10px] text-white">
          {entry.name}: ₦{entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

const CashFlowChart = ({ data = [] }) => {
  return (
    <div className="w-full h-[180px] -mx-1">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#670626" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#670626" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="0"
            stroke="var(--color-ink-10)"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--color-ink-40)", fontSize: 11 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--color-ink-40)", fontSize: 11 }}
            tickFormatter={(val) => `${val / 1000}k`}
          />
          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="income"
            stroke="#670626"
            strokeWidth={2.5}
            fill="url(#incomeGradient)"
            name="Income"
            dot={{ fill: "#670626", stroke: "#fff", strokeWidth: 2, r: 4 }}
            activeDot={{
              fill: "#fff",
              stroke: "#670626",
              strokeWidth: 2.5,
              r: 5,
              filter: "drop-shadow(0 0 6px rgba(103,6,38,0.4))",
            }}
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#8fb872"
            strokeWidth={2}
            strokeDasharray="5 3"
            dot={false}
            name="Expenses"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CashFlowChart;
