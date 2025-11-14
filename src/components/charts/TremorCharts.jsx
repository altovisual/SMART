import { AreaChart, DonutChart, BarChart } from '@tremor/react';

// Sales Trend Chart
export function SalesTrendChart({ data }) {
  return (
    <AreaChart
      className="h-64"
      data={data}
      index="date"
      categories={["amount"]}
      colors={["blue"]}
      valueFormatter={(value) => `$${value.toFixed(2)}`}
      showLegend={false}
      showGridLines={true}
      curveType="natural"
      showAnimation={true}
    />
  );
}

// Payment Methods Donut Chart
export function PaymentMethodsChart({ data }) {
  return (
    <DonutChart
      className="h-64"
      data={data}
      category="value"
      index="name"
      colors={["orange", "blue", "green"]}
      valueFormatter={(value) => `${value}%`}
      showAnimation={true}
      showLabel={true}
    />
  );
}

// Monthly Revenue Bar Chart
export function MonthlyRevenueChart({ data }) {
  return (
    <BarChart
      className="h-64"
      data={data}
      index="month"
      categories={["revenue"]}
      colors={["blue"]}
      valueFormatter={(value) => `$${value.toFixed(0)}`}
      showAnimation={true}
      showGridLines={true}
      yAxisWidth={48}
    />
  );
}

// Transaction Volume Chart
export function TransactionVolumeChart({ data }) {
  return (
    <AreaChart
      className="h-48"
      data={data}
      index="time"
      categories={["transactions"]}
      colors={["cyan"]}
      valueFormatter={(value) => `${value}`}
      showLegend={false}
      showGridLines={false}
      curveType="monotone"
      showAnimation={true}
    />
  );
}
