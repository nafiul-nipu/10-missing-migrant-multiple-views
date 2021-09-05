import { WorldMap } from './WorldMap';
import { scaleSqrt, max } from 'd3';
import { useMemo } from 'react';

const sizeValue = d => d['Total Dead and Missing'];
const maxRadius = 15;

export const BubbleMap = ({
    worldAtlas,
    data,
    filteredData
}) => {    
  
    const sizeScale = useMemo(() => scaleSqrt()
                      .domain([0, max(data, sizeValue)])
                      .range([0, maxRadius])
    , [data])
    return(
      <WorldMap 
        worldAtlas={worldAtlas}
        data={filteredData}
        sizeScale={sizeScale}
        sizeValue = {sizeValue}
      />
    )

  }