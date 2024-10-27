import './App.css'
import { VirtualizedList } from './components/VitualizedList'

const numberOfItems = 100000;

function App() {

  return (
    <>
     <h1>Virtualized Scroll</h1>
     <VirtualizedList numberOfItems={numberOfItems} />
    </>
  )
}

export default App
