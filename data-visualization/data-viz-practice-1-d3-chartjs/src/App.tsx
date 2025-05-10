/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import StockPriceChart from './components/d3-react-chart';

// Sample data
const generateSampleData = () => {
  const startDate = new Date(2024, 0, 1); // Jan 1, 2024
  const data = [];

  // Generate 60 days of stock data with realistic patterns
  let price = 150; // Starting price
  let volume = 1000000; // Starting volume

  for (let i = 0; i < 60; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    // Create a somewhat realistic price movement with some trends and volatility
    const change = (Math.random() - 0.48) * 5; // Slight upward bias
    price = Math.max(50, price + change);

    // Volume also changes daily
    volume = Math.max(100000, volume + (Math.random() - 0.5) * 500000);

    data.push({
      date,
      price,
      volume: Math.round(volume),
    });
  }

  return data;
};

const App = () => {
  const [stockData] = useState(generateSampleData());
  const [selectedPoint, setSelectedPoint] = useState<any>(null);

  const handleDataPointClick = (data: any) => {
    setSelectedPoint(data);
    console.log('Selected data point:', data);
  };

  return (
    <div className='max-w-6xl mx-auto p-6'>
      <header className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-2'>Stock Price Analysis</h1>
        <p className='text-gray-600'>Interactive visualization of stock performance over time</p>
      </header>

      <div className='bg-white rounded-lg shadow-lg p-6 mb-8'>
        <h2 className='text-xl font-semibold mb-4'>Price Trends</h2>
        <StockPriceChart
          data={stockData}
          height={400}
          tooltipEnabled={true}
          onDataPointClick={handleDataPointClick}
        />
      </div>

      {selectedPoint && (
        <div className='bg-white rounded-lg shadow-lg p-6'>
          <h2 className='text-xl font-semibold mb-4'>Selected Data Analysis</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='p-4 bg-blue-50 rounded-md'>
              <p className='text-sm text-gray-500'>Date</p>
              <p className='text-lg font-medium'>{selectedPoint.date.toLocaleDateString()}</p>
            </div>
            <div className='p-4 bg-green-50 rounded-md'>
              <p className='text-sm text-gray-500'>Price</p>
              <p className='text-lg font-medium'>${selectedPoint.price.toFixed(2)}</p>
            </div>
            <div className='p-4 bg-purple-50 rounded-md'>
              <p className='text-sm text-gray-500'>Volume</p>
              <p className='text-lg font-medium'>{selectedPoint.volume.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
