import './App.css';

import { useWorldAtlas } from './components/BubbleMap/useWorldAtlas';
import {useData} from './components/useData'
import { BubbleMap } from './components/BubbleMap/BubbleMap';
import {DateHistogram} from './components/DataHistogram/DateHistogram';


const width = 960;
const height = 500;

const dateHistogramSize = 0.2;

function App() {
  const worldAtlas = useWorldAtlas();
  const data = useData();

  if(!worldAtlas || !data){
    return <pre>Loading ...</pre>
  }


  return (
    <svg width={width} height={height}>      
      <BubbleMap 
        worldAtlas={worldAtlas}
        data={data}
      />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram 
          data={data}   
          width={width}
          height = {dateHistogramSize * height}   
        />
      </g>
    </svg>
  );

}

export default App;
 