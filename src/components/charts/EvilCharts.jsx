import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

// Custom Tooltip
const CustomTooltip = ({ active, payload, isDark }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`
        px-4 py-2 rounded-apple
        ${isDark ? 'bg-[#252526] border border-[#3e3e42]' : 'bg-white border border-gray-200'}
        shadow-lg
      `}>
        <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
          {payload[0].name}
        </p>
        <p className={`text-sm ${isDark ? 'text-[#00FFD1]' : 'text-blue-600'}`}>
          {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

// Payment Methods Donut Chart
export function PaymentMethodsEvilChart({ data }) {
  const { isDark } = useTheme();
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="0" dy="2" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="85%"
          paddingAngle={2}
          dataKey="value"
          animationBegin={0}
          animationDuration={800}
          animationEasing="ease-out"
          filter="url(#shadow)"
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color}
              stroke={isDark ? '#1e1e1e' : '#ffffff'}
              strokeWidth={3}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip isDark={isDark} />} />
        <Legend 
          verticalAlign="bottom" 
          height={50}
          iconType="circle"
          iconSize={10}
          formatter={(value) => (
            <span className={isDark ? 'text-[#d4d4d4]' : 'text-gray-700'}>
              {value}
            </span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
