import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type SadPathData = {
  name: string;
  value: number;
};

const COLORS = ["#2563eb", "#38bdf8", "#a5b4fc", "#c7d2fe"];

export default function SadPathChart() {
  const data: SadPathData[] = [
    { name: "Wrong Intent", value: 35 },
    { name: "Language Issue", value: 25 },
    { name: "User Frustration", value: 20 },
    { name: "Disconnected", value: 20 },
  ];

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">
            Sad Path Analysis
          </h2>
          <p className="text-sm text-gray-500">
            Reasons for unsuccessful conversations
          </p>
        </div>

        <div className="bg-red-50 text-red-600 text-sm font-medium px-3 py-1 rounded-full">
          Total: {total}%
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-4 space-y-2">
        {data.map((item, i) => (
          <div
            key={item.name}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[i] }}
              />
              <span className="text-gray-600">
                {item.name}
              </span>
            </div>
            <span className="font-medium">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
