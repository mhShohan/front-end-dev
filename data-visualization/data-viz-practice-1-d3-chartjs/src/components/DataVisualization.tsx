import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from 'chart.js';
import { Line, Bar, Pie, Doughnut, PolarArea, Radar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

// Define types for our data structure
interface SalesDataItem {
  month: string;
  amount: number;
  category: string;
}

interface SampleData {
  sales: SalesDataItem[];
}

type ChartTypeOption = 'bar' | 'line' | 'pie' | 'doughnut' | 'polar' | 'radar';

// Sample data
const sampleData: SampleData = {
  sales: [
    { month: 'January', amount: 65, category: 'Electronics' },
    { month: 'February', amount: 59, category: 'Electronics' },
    { month: 'March', amount: 80, category: 'Electronics' },
    { month: 'April', amount: 81, category: 'Electronics' },
    { month: 'May', amount: 56, category: 'Electronics' },
    { month: 'June', amount: 55, category: 'Electronics' },
    { month: 'January', amount: 40, category: 'Clothing' },
    { month: 'February', amount: 45, category: 'Clothing' },
    { month: 'March', amount: 60, category: 'Clothing' },
    { month: 'April', amount: 70, category: 'Clothing' },
    { month: 'May', amount: 65, category: 'Clothing' },
    { month: 'June', amount: 75, category: 'Clothing' },
    { month: 'January', amount: 30, category: 'Books' },
    { month: 'February', amount: 25, category: 'Books' },
    { month: 'March', amount: 35, category: 'Books' },
    { month: 'April', amount: 28, category: 'Books' },
    { month: 'May', amount: 40, category: 'Books' },
    { month: 'June', amount: 45, category: 'Books' },
    { month: 'June', amount: 45, category: 'Laptop' },
  ],
};

const DataVisualization: React.FC = () => {
  const [chartType, setChartType] = useState<ChartTypeOption>('bar');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'Electronics',
    'Clothing',
    'Books',
    'Laptop',
  ]);

  // Get unique categories
  const categories: string[] = [...new Set(sampleData.sales.map((item) => item.category))];
  // Get unique months
  const months: string[] = [...new Set(sampleData.sales.map((item) => item.month))];

  // Filter data based on selected categories
  const filteredData: SalesDataItem[] = sampleData.sales.filter((item) =>
    selectedCategories.includes(item.category)
  );

  // Colors for the charts
  const colors: string[] = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)', // Added one more color for 'Laptop' category
  ];

  const borderColors: string[] = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)', // Added one more color for 'Laptop' category
  ];

  // Prepare data for Chart.js (Bar, Line, Radar charts)
  const chartData: ChartData<'bar' | 'line' | 'radar'> = {
    labels: months,
    datasets: categories
      .filter((category) => selectedCategories.includes(category))
      .map((category, index) => {
        return {
          label: category,
          data: months.map((month) => {
            const item = filteredData.find((d) => d.month === month && d.category === category);
            return item ? item.amount : 0;
          }),
          backgroundColor: colors[index % colors.length],
          borderColor: borderColors[index % borderColors.length],
          borderWidth: 1,
        };
      }),
  };

  // Prepare data for pie/doughnut/polar charts
  const pieChartData: ChartData<'pie' | 'doughnut' | 'polarArea'> = {
    labels: selectedCategories,
    datasets: [
      {
        data: selectedCategories.map((category) =>
          filteredData
            .filter((item) => item.category === category)
            .reduce((sum, item) => sum + item.amount, 0)
        ),
        backgroundColor: selectedCategories.map((_, index) => colors[index % colors.length]),
        borderColor: selectedCategories.map(
          (_, index) => borderColors[index % borderColors.length]
        ),
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales Data Visualization',
      },
    },
  };

  // Toggle category selection
  const toggleCategory = (category: string): void => {
    if (selectedCategories.includes(category)) {
      if (selectedCategories.length > 1) {
        // Ensure at least one category is selected
        setSelectedCategories(selectedCategories.filter((c) => c !== category));
      }
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Render appropriate chart based on selected type
  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return <Line data={chartData} options={options} />;
      case 'bar':
        return <Bar data={chartData} options={options} />;
      case 'pie':
        return <Pie data={pieChartData} options={options} />;
      case 'doughnut':
        return <Doughnut data={pieChartData} options={options} />;
      case 'polar':
        return <PolarArea data={pieChartData} options={options} />;
      case 'radar':
        return <Radar data={chartData} options={options} />;
      default:
        return <Bar data={chartData} options={options} />;
    }
  };

  // Calculate summary data
  const calculateSummaryData = (category: string): number => {
    return filteredData
      .filter((item) => item.category === category)
      .reduce((sum, item) => sum + item.amount, 0);
  };

  return (
    <div className='flex flex-col p-4 w-full max-w-4xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Interactive Data Visualization</h1>

      {/* Controls */}
      <div className='flex flex-col md:flex-row justify-between mb-6 gap-4'>
        <div className='flex flex-col'>
          <label className='text-sm font-medium mb-1'>Chart Type:</label>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value as ChartTypeOption)}
            className='p-2 border border-gray-300 rounded bg-white'
          >
            <option value='bar'>Bar Chart</option>
            <option value='line'>Line Chart</option>
            <option value='pie'>Pie Chart</option>
            <option value='doughnut'>Doughnut Chart</option>
            <option value='polar'>Polar Area Chart</option>
            <option value='radar'>Radar Chart</option>
          </select>
        </div>

        <div className='flex flex-col'>
          <label className='text-sm font-medium mb-1'>Filter Categories:</label>
          <div className='flex flex-wrap gap-2'>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-3 py-1 text-sm rounded ${
                  selectedCategories.includes(category)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className='p-4 border border-gray-200 rounded-lg bg-white shadow'>{renderChart()}</div>

      {/* Summary */}
      <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
        <h2 className='text-lg font-semibold mb-2'>Data Summary</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {selectedCategories.map((category) => {
            const totalSales = calculateSummaryData(category);

            return (
              <div key={category} className='p-3 bg-white rounded shadow'>
                <h3 className='font-medium'>{category}</h3>
                <p className='text-2xl font-bold'>{totalSales}</p>
                <p className='text-sm text-gray-500'>Total Sales</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DataVisualization;
