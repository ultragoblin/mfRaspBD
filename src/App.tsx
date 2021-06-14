import { useState } from "react";
import Header from "./components/Header";
import SubjectHeader from "./components/Subject/SubjectHeader";
import SubjectTable from "./components/Subject/SubjectTable";
// import { useTypedSelector } from "./hooks/useTypedSelector";
// import { useActions } from "./hooks/useActions";
import "./App.scss";

const group: string = "Группа К3-63Б";

function App() {
  // Как правильно юзать редакс
  // const timings = useTypedSelector(state => state.timing);
  // const {getTiming} = useActions();
  // console.log(timings);

  return (
    <div className="App">
      <div className="App__container">
        <Header />
        <SubjectHeader name={group} />
        <SubjectTable />
        {/* {timings} */}
      </div>
    </div>
  );
}

export default App;
