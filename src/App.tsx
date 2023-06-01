import './App.css';
import PasteTestComp from './components/execution/PasteTestComp';
import SavingDatabaseComp from './components/execution/SavingDatabaseComp';
import SlateComp from './components/execution/SlateComp';

function App() {
  return (
    <>
      <SlateComp />
      <SavingDatabaseComp />
      <PasteTestComp />
    </>
  );
}

export default App;
