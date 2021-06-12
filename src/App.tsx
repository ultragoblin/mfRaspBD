import Header from './components/Header';
import SubjectHeader from './components/Subject/SubjectHeader';
import './App.scss';
import SubjectTable from './components/Subject/SubjectTable';

const group: string = "Группа К3-63Б";

function App() {
  return (
    <div className="App">
      <div className="App__container">
        <Header/>
        <SubjectHeader name={group}/>
        <SubjectTable />
      </div>
    </div>
  );
}

export default App;
