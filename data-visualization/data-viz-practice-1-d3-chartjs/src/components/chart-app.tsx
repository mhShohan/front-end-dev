import React, { useState } from 'react';
import { VerticalBarChart, HorizontalBarChart, PieChart, RadarChart } from './chart-components';

// Sample data for all charts
const datasets = {
  sales: [
    { category: 'Electronics', value: 1200, color: '#3b82f6' },
    { category: 'Clothing', value: 900, color: '#10b981' },
    { category: 'Food', value: 600, color: '#f59e0b' },
    { category: 'Books', value: 300, color: '#ef4444' },
    { category: 'Toys', value: 400, color: '#8b5cf6' },
  ],
  marketShare: [
    { category: 'Company A', value: 35, color: '#3b82f6' },
    { category: 'Company B', value: 25, color: '#10b981' },
    { category: 'Company C', value: 20, color: '#f59e0b' },
    { category: 'Company D', value: 15, color: '#ef4444' },
    { category: 'Others', value: 5, color: '#8b5cf6' },
  ],
  performance: [
    { category: 'Speed', value: 90, color: '#3b82f6' },
    { category: 'Reliability', value: 85, color: '#10b981' },
    { category: 'Usability', value: 70, color: '#f59e0b' },
    { category: 'Features', value: 95, color: '#ef4444' },
    { category: 'Support', value: 75, color: '#8b5cf6' },
    { category: 'Price', value: 60, color: '#ec4899' },
  ],
  expenses: [
    { category: 'Rent', value: 1500, color: '#3b82f6' },
    { category: 'Utilities', value: 350, color: '#10b981' },
    { category: 'Salaries', value: 3000, color: '#f59e0b' },
    { category: 'Marketing', value: 800, color: '#ef4444' },
    { category: 'Equipment', value: 600, color: '#8b5cf6' },
  ],
};

// Chart type enum
const ChartType = {
  VERTICAL_BAR: 'Vertical Bar Chart',
  HORIZONTAL_BAR: 'Horizontal Bar Chart',
  PIE: 'Pie Chart',
  RADAR: 'Radar Chart',
} as const;

// Dataset type enum
const DatasetType = {
  SALES: 'Sales Data',
  MARKET_SHARE: 'Market Share',
  PERFORMANCE: 'Performance Metrics',
  EXPENSES: 'Expenses Breakdown',
};

type TChartType = (typeof ChartType)[keyof typeof ChartType];
type TDatasetType = (typeof DatasetType)[keyof typeof DatasetType];

export const ChartApp = () => {
  // State for chart type and dataset
  const [chartType, setChartType] = useState<TChartType>(ChartType.VERTICAL_BAR);
  const [datasetType, setDatasetType] = useState<TDatasetType>(DatasetType.SALES);

  // Get current dataset
  const getCurrentData = () => {
    switch (datasetType) {
      case DatasetType.SALES:
        return datasets.sales;
      case DatasetType.MARKET_SHARE:
        return datasets.marketShare;
      case DatasetType.PERFORMANCE:
        return datasets.performance;
      case DatasetType.EXPENSES:
        return datasets.expenses;
      default:
        return datasets.sales;
    }
  };

  // Render the selected chart type
  const renderChart = () => {
    const currentData = getCurrentData();

    switch (chartType) {
      case ChartType.VERTICAL_BAR:
        return <VerticalBarChart data={currentData} height={400} />;
      case ChartType.HORIZONTAL_BAR:
        return <HorizontalBarChart data={currentData} height={400} />;
      case ChartType.PIE:
        return <PieChart data={currentData} height={400} />;
      case ChartType.RADAR:
        return <RadarChart data={currentData} height={400} />;
      default:
        return <VerticalBarChart data={currentData} height={400} />;
    }
  };

  // Get title based on current dataset
  const getChartTitle = (): string => {
    switch (datasetType) {
      case DatasetType.SALES:
        return 'Sales by Category';
      case DatasetType.MARKET_SHARE:
        return 'Market Share Analysis';
      case DatasetType.PERFORMANCE:
        return 'Performance Evaluation';
      case DatasetType.EXPENSES:
        return 'Expense Distribution';
      default:
        return 'Chart';
    }
  };

  // Get description based on current dataset
  const getChartDescription = (): string => {
    switch (datasetType) {
      case DatasetType.SALES:
        return 'Distribution of sales across product categories for the current quarter.';
      case DatasetType.MARKET_SHARE:
        return 'Market share percentage of major companies in the industry.';
      case DatasetType.PERFORMANCE:
        return 'Performance metrics evaluation across different dimensions.';
      case DatasetType.EXPENSES:
        return 'Monthly expense breakdown by category.';
      default:
        return 'Data visualization';
    }
  };

  return (
    <div className='max-w-6xl mx-auto p-6'>
      <header className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-2'>Interactive D3 Charts</h1>
        <p className='text-gray-600'>Select different chart types and datasets to visualize data</p>
      </header>

      <div className='mb-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Chart Type</label>
          <select
            className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            value={chartType}
            onChange={(e) => setChartType(e.target.value as TChartType)}
          >
            {Object.values(ChartType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Dataset</label>
          <select
            className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            value={datasetType}
            onChange={(e) => setDatasetType(e.target.value as TChartType)}
          >
            {Object.values(DatasetType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='bg-white rounded-lg shadow-lg p-6 mb-8'>
        <div className='mb-4'>
          <h2 className='text-xl font-semibold mb-1'>{getChartTitle()}</h2>
          <p className='text-gray-500 text-sm'>{getChartDescription()}</p>
        </div>

        {renderChart()}
      </div>
    </div>
  );
};
