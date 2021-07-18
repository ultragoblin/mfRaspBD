import { useState } from "react";
import Header from "./components/Header";
import SubjectHeader from "./components/Subject/SubjectHeader";
import SubjectTable from "./components/Subject/SubjectTable";
// import { useTypedSelector } from "./hooks/useTypedSelector";
// import { useActions } from "./hooks/useActions";
import "./App.scss";
import days from "./utils/days";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { useActions } from "./hooks/useActions";

const group: string = "Группа К3-63Б";

function App() {

  // Как правильно юзать редакс
  // const timings = useTypedSelector(state => state.timing);
  // const {getTiming} = useActions();
  // console.log(timings);

  return (
    <div className="App">
      <div className="App__container">
        <Header/>
        <SubjectHeader name={group}/>
        <div className={"tables__container"}>
          {
            days.map((day) => <SubjectTable day={day} key={day.id}/>)
          }
        </div>
        {/* {timings} */}
      </div>
    </div>
  );
}

export default App;
