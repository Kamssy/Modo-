import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-ink rounded-sm px-3 py-2 shadow-elevated">
      <p className="text-[10px] font-semibold text-white mb-1.5 border-b border-white/10 pb-1">{label}</p>
      {payload.map((entry, index) => (
        <p key={index} className="text-[10px] text-white/90 flex items-center justify-between gap-4 py-0.5">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
            {entry.name}
          </span>
          <span className="font-medium">₦{entry.value.toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
};

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex justify-center gap-6 mt-4">
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-[3px]" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-[12px] font-medium text-ink-60">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const TrendBarChart = ({ data = [] }) => {
  return (
    <div className="w-full h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          barGap={4}
        >
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="var(--color-ink-05)"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--color-ink-40)", fontSize: 11, fontWeight: 500 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--color-ink-40)", fontSize: 11 }}
            tickFormatter={(val) => `${val / 1000}k`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--color-ink-05)', opacity: 0.4 }} />
          <Legend content={<CustomLegend />} />
          
          <Bar 
            dataKey="income" 
            name="Income" 
            fill="var(--color-primary)" 
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
          <Bar 
            dataKey="expense" 
            name="Expenses" 
            fill="var(--color-secondary-deep)" 
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendBarChart;
