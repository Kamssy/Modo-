import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const data = payload[0];

  return (
    <div className="bg-ink rounded-sm px-3 py-2 shadow-elevated">
      <p className="text-[10px] font-semibold text-white">{data.name}</p>
      <p className="text-[10px] text-white/70">
        ₦{data.value.toLocaleString()} · {data.payload.percentage}%
      </p>
    </div>
  );
};

const SpendingDonut = ({ data = [], totalSpend = "₦0" }) => {
  return (
    <div>
      {/* Donut */}
      <div className="flex justify-center mb-2">
        <div className="relative w-[180px] h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={72}
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Center label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <div className="font-display text-[15px] leading-tight text-ink">
              {totalSpend}
            </div>
            <div className="text-[9px] text-ink-40 mt-0.5">Total Spend</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-2.5 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2.5 text-[13px]">
            <span
              className="w-3 h-3 rounded-[3px] shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="flex-1 text-ink font-medium">{item.name}</span>
            <span className="text-[13px] font-semibold text-ink">
              ₦{item.value.toLocaleString()}
            </span>
            <span className="text-[11px] text-ink-40">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpendingDonut;
