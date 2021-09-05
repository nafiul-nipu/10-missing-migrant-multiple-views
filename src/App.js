import './App.css';

import { useWorldAtlas } from './components/BubbleMap/useWorldAtlas';
import {useData} from './components/useData'
import { BubbleMap } from './components/BubbleMap/BubbleMap';
import {DateHistogram} from './components/DataHistogram/DateHistogram';
import { useState } from 'react';


const width = 960;
const height = 500;

const dateHistogramSize = 0.2;

const xValue = d => d["Reported Date"] ;

function App() {
  const worldAtlas = useWorldAtlas();
  const data = useData();

  const [brushExtent, setBrushExtent] = useState();

  if(!worldAtlas || !data){
    return <pre>Loading ...</pre>
  }

  const filteredData = brushExtent ? data.filter(d => {
    const date = xValue(d)
    return date > brushExtent[0] && date < brushExtent[1] ;
  }) : data ;


  return (
    <svg width={width} height={height}>      
      <BubbleMap 
        worldAtlas={worldAtlas}
        data={filteredData}
      />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram 
          data={data}   
          width={width}
          height = {dateHistogramSize * height}   
          setBrushExtent={setBrushExtent}
          xValue = {xValue}
        />
      </g>
    </svg>
  );

}

export default App;
 