import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

// Define our data type
interface StockData {
  date: Date;
  price: number;
  volume: number;
}

// Component props interface
interface StockPriceChartProps {
  data: StockData[];
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  lineColor?: string;
  tooltipEnabled?: boolean;
  onDataPointClick?: (data: StockData) => void;
}

const StockPriceChart: React.FC<StockPriceChartProps> = ({
  data,
  width = 800,
  height = 400,
  margin = { top: 20, right: 30, bottom: 50, left: 60 },
  lineColor = '#2563eb', // Tailwind blue-600
  tooltipEnabled = true,
  onDataPointClick,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [selectedDataPoint, setSelectedDataPoint] = useState<StockData | null>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !svgRef.current) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    // Chart dimensions
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date) as [Date, Date])
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, (d3.max(data, (d) => d.price) as number) * 1.1]) // Add 10% padding
      .range([innerHeight, 0]);

    // Line generator
    const line = d3
      .line<StockData>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.price))
      .curve(d3.curveMonotoneX); // Smoother curve

    // Add the axes
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(
        d3
          .axisBottom(xScale)
          .ticks(5)
          .tickFormat((d) => d3.timeFormat('%b %d, %Y')(d as Date))
      )
      .selectAll('text')
      .attr('y', 10)
      .attr('transform', 'rotate(0)')
      .style('text-anchor', 'middle')
      .style('font-size', '12px');

    svg
      .append('g')
      .attr('class', 'y-axis')
      .call(
        d3
          .axisLeft(yScale)
          .ticks(5)
          .tickFormat((d) => `$${d}`)
      )
      .selectAll('text')
      .style('font-size', '12px');

    // Add grid lines
    svg
      .append('g')
      .attr('class', 'grid')
      .selectAll('line')
      .data(yScale.ticks(5))
      .enter()
      .append('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', (d) => yScale(d))
      .attr('y2', (d) => yScale(d))
      .attr('stroke', '#e5e7eb') // Tailwind gray-200
      .attr('stroke-dasharray', '5,5');

    // Draw the line
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', lineColor)
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add circle markers for data points
    const circles = svg
      .selectAll('.data-point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'data-point')
      .attr('cx', (d) => xScale(d.date))
      .attr('cy', (d) => yScale(d.price))
      .attr('r', 5)
      .attr('fill', 'white')
      .attr('stroke', lineColor)
      .attr('stroke-width', 2)
      .style('opacity', 0)
      .style('cursor', 'pointer');

    // Add axis labels
    svg
      .append('text')
      .attr('class', 'x-label')
      .attr('text-anchor', 'middle')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + margin.bottom - 10)
      .text('Date')
      .style('font-size', '14px');

    svg
      .append('text')
      .attr('class', 'y-label')
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(${-margin.left + 15},${innerHeight / 2}) rotate(-90)`)
      .text('Stock Price ($)')
      .style('font-size', '14px');

    // Handle tooltip & interactivity if enabled
    if (tooltipEnabled) {
      // Create tooltip div if it doesn't exist
      if (!tooltipRef.current) {
        tooltipRef.current = document.createElement('div');
        tooltipRef.current.className =
          'absolute pointer-events-none bg-white p-2 rounded shadow-lg text-sm';
        tooltipRef.current.style.opacity = '0';
        tooltipRef.current.style.position = 'absolute';
        tooltipRef.current.style.pointerEvents = 'none';
        document.body.appendChild(tooltipRef.current);
      }

      const tooltip = d3.select(tooltipRef.current);

      // Create transparent overlay for mouse tracking
      const overlay = svg
        .append('rect')
        .attr('width', innerWidth)
        .attr('height', innerHeight)
        .attr('fill', 'none')
        .attr('pointer-events', 'all');

      // Handle mouse events
      overlay
        .on('mousemove', (event) => {
          const [mouseX] = d3.pointer(event);

          // Find closest data point
          const bisect = d3.bisector<StockData, Date>((d) => d.date).left;
          const x0 = xScale.invert(mouseX);
          const i = bisect(data, x0, 1);
          const d0 = data[i - 1];
          const d1 = data[i];

          if (!d0 || !d1) return;

          const d = x0.valueOf() - d0.date.valueOf() > d1.date.valueOf() - x0.valueOf() ? d1 : d0;

          // Highlight the point
          circles
            .style('opacity', 0)
            .filter((pd) => pd.date.valueOf() === d.date.valueOf())
            .style('opacity', 1);

          // Update tooltip
          tooltip
            .style('opacity', 0.9)
            .style('left', `${event.pageX + 10}px`)
            .style('top', `${event.pageY - 30}px`).html(`
              <div>
                <div class="font-bold">${d3.timeFormat('%b %d, %Y')(d.date)}</div>
                <div>Price: $${d.price.toFixed(2)}</div>
                <div>Volume: ${d3.format(',')(d.volume)}</div>
              </div>
            `);
        })
        .on('mouseout', () => {
          circles.style('opacity', 0);
          tooltip.style('opacity', 0);
        })
        .on('click', (event) => {
          if (!onDataPointClick) return;

          const [mouseX] = d3.pointer(event);
          const bisect = d3.bisector<StockData, Date>((d) => d.date).left;
          const x0 = xScale.invert(mouseX);
          const i = bisect(data, x0, 1);
          const d0 = data[i - 1];
          const d1 = data[i];

          if (!d0 || !d1) return;

          const d = x0.valueOf() - d0.date.valueOf() > d1.date.valueOf() - x0.valueOf() ? d1 : d0;
          setSelectedDataPoint(d);
          onDataPointClick(d);
        });
    }

    // Cleanup
    return () => {
      if (tooltipRef.current) {
        document.body.removeChild(tooltipRef.current);
        tooltipRef.current = null;
      }
    };
  }, [data, width, height, margin, lineColor, tooltipEnabled, onDataPointClick]);

  return (
    <div className='relative'>
      <svg ref={svgRef} className='w-full'></svg>
      {selectedDataPoint && (
        <div className='mt-4 p-4 bg-gray-50 rounded-md border border-gray-200'>
          <h3 className='font-semibold'>Selected Data Point</h3>
          <p>Date: {selectedDataPoint.date.toLocaleDateString()}</p>
          <p>Price: ${selectedDataPoint.price.toFixed(2)}</p>
          <p>Volume: {selectedDataPoint.volume.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default StockPriceChart;
