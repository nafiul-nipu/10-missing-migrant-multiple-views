import './App.css';

import { useWorldAtlas } from './components/BubbleMap/useWorldAtlas';
import {useData} from './components/useData'
import { BubbleMap } from './components/BubbleMap/BubbleMap';
import {DateHistogram} from './components/DataHistogram/DateHistogram';


const width = 960;
const height = 500;

function App() {
  const worldAtlas = useWorldAtlas()
  const data = useData()

  if(!worldAtlas || !data){
    return <pre>Loading ...</pre>
  }


  return (
    <svg width={width} height={height}>      
      <BubbleMap 
        worldAtlas={worldAtlas}
        data={data}
      />

      <DateHistogram 
        data={data}      
      />
    </svg>
  );

}

export default App;
 