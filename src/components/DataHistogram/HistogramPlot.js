export const HistogramPlot = ({
    binnedData, 
    xScale, 
    yScale, 
    tooltipFormat, 
    innerHeight
    }) => (
        <g className='mark'> 
            {/* <path 
                d={line()
                    .x(d=>xScale(xValue(d)))
                    .y(d=>yScale(yValue(d)))
                    .curve(curveNatural)
                    (data)}
            /> */}
            {binnedData.map(d => 
                <rect                  
                    x={xScale(d.x0)}
                    y={yScale(d.y)}
                    width={xScale(d.x1) - xScale(d.x0)}
                    height={innerHeight - yScale(d.y)}

                >
                    <title>{tooltipFormat(d.y)}</title>
                </rect>
            )}
        </g>
    );