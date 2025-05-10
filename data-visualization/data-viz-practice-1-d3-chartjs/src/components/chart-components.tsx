import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

// Common data interface for all charts
export interface DataItem {
  category: string;
  value: number;
  color?: string;
}

// Base props for all charts
interface BaseChartProps {
  data: DataItem[];
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  animationDuration?: number;
}

// Vertical Bar Chart Component
export const VerticalBarChart: React.FC<BaseChartProps> = ({
  data,
  width = 600,
  height = 400,
  margin = { top: 30, right: 30, bottom: 70, left: 60 },
  animationDuration = 750,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

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

    // Define scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.category))
      .range([0, innerWidth])
      .padding(0.3);

    const yScale = d3
      .scaleLinear()
      .domain([0, (d3.max(data, (d) => d.value) as number) * 1.1])
      .range([innerHeight, 0]);

    // Create a color scale
    const colorScale = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.category))
      .range(d3.schemeCategory10);

    // Add x-axis
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end')
      .style('font-size', '12px');

    // Add y-axis
    svg
      .append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale))
      .selectAll('text')
      .style('font-size', '12px');

    // Add grid lines
    svg
      .append('g')
      .attr('class', 'grid')
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-innerWidth)
          .tickFormat(() => '')
      )
      .attr('stroke-opacity', 0.1);

    // Create and animate bars
    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.category) as number)
      .attr('width', xScale.bandwidth())
      .attr('y', innerHeight)
      .attr('height', 0)
      .attr('fill', (d) => d.color || (colorScale(d.category) as string))
      .transition()
      .duration(animationDuration)
      .attr('y', (d) => yScale(d.value))
      .attr('height', (d) => innerHeight - yScale(d.value));

    // Add value labels on top of bars
    svg
      .selectAll('.label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', (d) => (xScale(d.category) as number) + xScale.bandwidth() / 2)
      .attr('y', (d) => yScale(d.value) - 5)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('opacity', 0)
      .text((d) => d.value)
      .transition()
      .duration(animationDuration)
      .style('opacity', 1);

    // Add axis titles
    svg
      .append('text')
      .attr('class', 'x-label')
      .attr('text-anchor', 'middle')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + margin.bottom - 10)
      .style('font-size', '14px')
      .text('Categories');

    svg
      .append('text')
      .attr('class', 'y-label')
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(${-margin.left + 15}, ${innerHeight / 2}) rotate(-90)`)
      .style('font-size', '14px')
      .text('Values');
  }, [data, width, height, margin, animationDuration]);

  return <svg ref={svgRef} className='w-full'></svg>;
};

// Horizontal Bar Chart Component
export const HorizontalBarChart: React.FC<BaseChartProps> = ({
  data,
  width = 600,
  height = 400,
  margin = { top: 30, right: 30, bottom: 50, left: 120 },
  animationDuration = 750,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

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

    // Define scales
    const yScale = d3
      .scaleBand()
      .domain(data.map((d) => d.category))
      .range([0, innerHeight])
      .padding(0.3);

    const xScale = d3
      .scaleLinear()
      .domain([0, (d3.max(data, (d) => d.value) as number) * 1.1])
      .range([0, innerWidth]);

    // Create a color scale
    const colorScale = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.category))
      .range(d3.schemeCategory10);

    // Add y-axis
    svg
      .append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale))
      .selectAll('text')
      .style('font-size', '12px');

    // Add x-axis
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .style('font-size', '12px');

    // Add grid lines
    svg
      .append('g')
      .attr('class', 'grid')
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(innerHeight)
          .tickFormat(() => '')
      )
      .attr('transform', `translate(0, 0)`)
      .attr('stroke-opacity', 0.1);

    // Create and animate bars
    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('y', (d) => yScale(d.category) as number)
      .attr('height', yScale.bandwidth())
      .attr('x', 0)
      .attr('width', 0)
      .attr('fill', (d) => d.color || (colorScale(d.category) as string))
      .transition()
      .duration(animationDuration)
      .attr('width', (d) => xScale(d.value));

    // Add value labels at the end of bars
    svg
      .selectAll('.label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('y', (d) => (yScale(d.category) as number) + yScale.bandwidth() / 2)
      .attr('x', (d) => xScale(d.value) + 5)
      .attr('dy', '0.35em')
      .style('font-size', '12px')
      .style('opacity', 0)
      .text((d) => d.value)
      .transition()
      .duration(animationDuration)
      .style('opacity', 1);

    // Add axis title
    svg
      .append('text')
      .attr('class', 'x-label')
      .attr('text-anchor', 'middle')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + margin.bottom - 10)
      .style('font-size', '14px')
      .text('Values');
  }, [data, width, height, margin, animationDuration]);

  return <svg ref={svgRef} className='w-full'></svg>;
};

// Pie Chart Component
export const PieChart: React.FC<BaseChartProps> = ({
  data,
  width = 600,
  height = 400,
  margin = { top: 30, right: 30, bottom: 50, left: 30 },
  animationDuration = 750,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !svgRef.current) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    // Chart dimensions
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const radius = Math.min(innerWidth, innerHeight) / 2;

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Create a color scale
    const colorScale = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.category))
      .range(d3.schemeCategory10);

    // Compute the position of each group on the pie
    const pie = d3.pie<DataItem>().value((d) => d.value);
    const pieData = pie(data);

    // Create the arcs
    const arc = d3.arc<d3.PieArcDatum<DataItem>>().innerRadius(0).outerRadius(radius);

    const arcHover = d3
      .arc<d3.PieArcDatum<DataItem>>()
      .innerRadius(0)
      .outerRadius(radius * 1.1);

    const arcLabel = d3
      .arc<d3.PieArcDatum<DataItem>>()
      .innerRadius(radius * 0.6)
      .outerRadius(radius * 0.6);

    // Add slices
    const paths = svg
      .selectAll('path')
      .data(pieData)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => d.data.color || (colorScale(d.data.category) as string))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 0.7);

    // Add animation
    paths
      .transition()
      .duration(animationDuration)
      .attrTween('d', function (d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function (t) {
          return arc(interpolate(t)) as string;
        };
      });

    // Add interactivity
    paths
      .on('mouseover', function (event, d) {
        d3.select(this).transition().duration(200).attr('d', arcHover).style('opacity', 1);
      })
      .on('mouseout', function (event, d) {
        d3.select(this).transition().duration(200).attr('d', arc).style('opacity', 0.7);
      });

    // Add labels
    svg
      .selectAll('text')
      .data(pieData)
      .enter()
      .append('text')
      .attr('transform', (d) => `translate(${arcLabel.centroid(d)})`)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#fff')
      .style('font-weight', 'bold')
      .style('opacity', 0)
      .text((d) => `${d.data.category} (${d.data.value})`)
      .transition()
      .delay(animationDuration * 0.5)
      .duration(animationDuration * 0.5)
      .style('opacity', function (d) {
        // Only show label if the slice is big enough
        return d.endAngle - d.startAngle > 0.25 ? 1 : 0;
      });

    // Add a legend
    const legend = svg
      .selectAll('.legend')
      .data(pieData)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(${radius + 20}, ${-radius + i * 25})`);

    legend
      .append('rect')
      .attr('width', 18)
      .attr('height', 18)
      .attr('fill', (d) => d.data.color || (colorScale(d.data.category) as string));

    legend
      .append('text')
      .attr('x', 24)
      .attr('y', 9)
      .attr('dy', '0.35em')
      .style('font-size', '12px')
      .text((d) => `${d.data.category} (${d.data.value})`);
  }, [data, width, height, margin, animationDuration]);

  return <svg ref={svgRef} className='w-full'></svg>;
};

// Radar Chart Component
export const RadarChart: React.FC<BaseChartProps> = ({
  data,
  width = 600,
  height = 400,
  margin = { top: 50, right: 50, bottom: 50, left: 50 },
  animationDuration = 750,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !svgRef.current) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    // Chart dimensions
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const radius = Math.min(innerWidth, innerHeight) / 2;
    const center = { x: width / 2, y: height / 2 };

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${center.x},${center.y})`);

    // Scale for the radius
    const rScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) as number])
      .range([0, radius]);

    // Create a color scale
    const colorScale = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.category))
      .range(d3.schemeCategory10);

    // Define number of "spokes" based on data length
    const numAxes = data.length;
    const angleSlice = (Math.PI * 2) / numAxes;

    // Draw the background circles
    const levels = 5;
    const circles = svg
      .selectAll('.grid-circle')
      .data(d3.range(1, levels + 1).reverse())
      .enter()
      .append('circle')
      .attr('class', 'grid-circle')
      .attr('r', (d) => (radius * d) / levels)
      .style('fill', 'none')
      .style('stroke', '#ddd')
      .style('stroke-dasharray', '4,4');

    // Draw the axes (spokes)
    const axes = svg
      .selectAll('.axis')
      .data(data)
      .enter()
      .append('line')
      .attr('class', 'axis')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr(
        'x2',
        (d, i) =>
          rScale(d3.max(data, (d) => d.value) as number) * Math.cos(angleSlice * i - Math.PI / 2)
      )
      .attr(
        'y2',
        (d, i) =>
          rScale(d3.max(data, (d) => d.value) as number) * Math.sin(angleSlice * i - Math.PI / 2)
      )
      .style('stroke', '#ddd')
      .style('stroke-width', '1px');

    // Create the radar chart blobs
    const radarLine = d3
      .lineRadial<DataItem>()
      .radius((d) => rScale(d.value))
      .angle((d, i) => i * angleSlice);

    // Convert data for radial line
    const radarData = data.map((d, i) => ({
      ...d,
      angle: angleSlice * i,
    }));

    // Add the radar area
    const radarArea = svg
      .append('path')
      .datum(radarData)
      .attr('class', 'radar-area')
      .attr('d', (d) => {
        const points = d.map((point, i) => [
          rScale(point.value) * Math.cos(point.angle - Math.PI / 2),
          rScale(point.value) * Math.sin(point.angle - Math.PI / 2),
        ]);
        return `M ${points.map((p) => p.join(',')).join(' L ')} Z`;
      })
      .style('fill', '#3b82f6')
      .style('fill-opacity', 0.3)
      .style('stroke', '#3b82f6')
      .style('stroke-width', '2px')
      .style('opacity', 0)
      .transition()
      .duration(animationDuration)
      .style('opacity', 1);

    // Add circles at each data point
    const circles2 = svg
      .selectAll('.radar-circle')
      .data(radarData)
      .enter()
      .append('circle')
      .attr('class', 'radar-circle')
      .attr('r', 5)
      .attr('cx', (d, i) => rScale(d.value) * Math.cos(d.angle - Math.PI / 2))
      .attr('cy', (d, i) => rScale(d.value) * Math.sin(d.angle - Math.PI / 2))
      .style('fill', '#3b82f6')
      .style('fill-opacity', 0.8)
      .style('stroke', '#fff')
      .style('stroke-width', '2px')
      .style('opacity', 0)
      .transition()
      .duration(animationDuration)
      .style('opacity', 1);

    // Add labels
    svg
      .selectAll('.axis-label')
      .data(radarData)
      .enter()
      .append('text')
      .attr('class', 'axis-label')
      .attr('x', (d, i) => (radius + 20) * Math.cos(d.angle - Math.PI / 2))
      .attr('y', (d, i) => (radius + 20) * Math.sin(d.angle - Math.PI / 2))
      .attr('text-anchor', (d, i) => {
        const x = Math.cos(d.angle - Math.PI / 2);
        if (Math.abs(x) < 0.1) return 'middle';
        return x > 0 ? 'start' : 'end';
      })
      .attr('dy', (d, i) => {
        const y = Math.sin(d.angle - Math.PI / 2);
        if (Math.abs(y) < 0.1) return y > 0 ? '1em' : '-0.5em';
        return '0.3em';
      })
      .style('font-size', '12px')
      .text((d) => `${d.category} (${d.value})`)
      .style('opacity', 0)
      .transition()
      .duration(animationDuration)
      .style('opacity', 1);

    // Add value labels
    svg
      .selectAll('.value-label')
      .data(radarData)
      .enter()
      .append('text')
      .attr('class', 'value-label')
      .attr('x', (d, i) => (rScale(d.value) + 10) * Math.cos(d.angle - Math.PI / 2))
      .attr('y', (d, i) => (rScale(d.value) + 10) * Math.sin(d.angle - Math.PI / 2))
      .attr('text-anchor', 'middle')
      .style('font-size', '10px')
      .style('font-weight', 'bold')
      .text((d) => d.value)
      .style('opacity', 0)
      .transition()
      .duration(animationDuration)
      .style('opacity', 1);
  }, [data, width, height, margin, animationDuration]);

  return <svg ref={svgRef} className='w-full'></svg>;
};
