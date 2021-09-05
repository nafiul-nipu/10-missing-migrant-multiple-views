import { WorldMap } from './WorldMap';
import { scaleSqrt, max } from 'd3';

export const BubbleMap = ({
    worldAtlas = {worldAtlas},
    data = {data}
}) => {

    const sizeValue = d => d['Total Dead and Missing'];
    const maxRadius = 15;
  
    const sizeScale = scaleSqrt()
                      .domain([0, max(data, sizeValue)])
                      .range([0, maxRadius])

    return(
      <WorldMap 
        worldAtlas={worldAtlas}
        data={data}
        sizeScale={sizeScale}
        sizeValue = {sizeValue}
      />
    )

  }