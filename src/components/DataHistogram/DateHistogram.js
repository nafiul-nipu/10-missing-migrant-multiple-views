import {
    select,
    scaleLinear,  
    extent, 
    scaleTime, 
    timeFormat, 
    bin,
    timeMonths,
    sum,
    max,
    brushX
} from 'd3';
import { useRef, useEffect } from 'react';

import {HistogramPlot} from './HistogramPlot';
import {AxisBottom} from './AxisBottom';
import {AxisLeft} from './AxisLeft';

// const width = 960;
// const height = 100;
const margin = {top:0, right:30, bottom:20, left:50} 

const xAxisLabelOffset = 50
const yAxisLabelOffset = 30

export const DateHistogram = ({
    data,
    width,
    height,
    setBrushExtent,
    xValue
}) =>{
    const brushRef = useRef();

    const xAxisLabel = 'Time'
  
  
    const yValue = d =>d["Total Dead and Missing"] ;
    const yAxisLabel = 'Total Dead and Missing'
  
  
    const innerHeight = height - margin.top - margin.bottom
    const innerWidth = width - margin.left - margin.right
  
    const xAxisTickFormat = timeFormat("%m/%d/%Y")
  
    const xScale = scaleTime()
                    .domain(extent(data, xValue))
                    .range([0, innerWidth])
                    .nice()
  
  
    const [start, stop] = xScale.domain()
  
    const binnedData = bin()
                    .value(xValue)
                    .domain(xScale.domain())
                    .thresholds(timeMonths(start, stop))
                    (data)
                    .map(array => ({
                      y : sum(array, yValue),
                      x0: array.x0,
                      x1: array.x1
                    }));
  
    const yScale = scaleLinear()
                  .domain([0, max(binnedData, d=> d.y)])
                  .range([innerHeight, 0])
                  .nice()

    useEffect(() => {
        const brush = brushX()
                        .extent([[0,0], [innerWidth, innerHeight]])
        
        brush(select(brushRef.current));

        brush.on('brush end', (event) => {
            setBrushExtent(event.selection && event.selection.map(xScale.invert))

        });

    }, [innerWidth, innerHeight]);

    return(
        <>
            <rect 
                    width={width}
                    height={height}
                    fill='white'
                />
            <g transform={`translate(${margin.left}, ${margin.top})`}>

                <AxisBottom 
                xScale ={xScale}
                innerHeight = {innerHeight}
                tickFormat = {xAxisTickFormat}
                tickOffset = {5}
                />
        
                <text
                className='axis-label'
                x={innerWidth / 2}
                y={innerHeight + xAxisLabelOffset}
                textAnchor='middle'
                >{xAxisLabel}</text>
        
                <AxisLeft 
                yScale = {yScale}
                innerWidth={innerWidth}
                tickOffset = {5}
                />
                
                <text
                className='axis-label'       
                textAnchor='middle'
                transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2} )rotate(-90)`}
                >{yAxisLabel}</text>
        
                <HistogramPlot 
                binnedData={binnedData}
                xScale = {xScale}
                yScale = {yScale}
                tooltipFormat = {xAxisTickFormat}
                innerHeight={innerHeight}
                />
                <g ref={brushRef} />
            </g>
        </>
    )

}