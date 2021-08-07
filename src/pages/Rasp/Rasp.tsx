import Header from "../../components/Header";
import SubjectHeader from "../../components/Subject/SubjectHeader";
import SubjectTable from "../../components/Subject/SubjectTable";
import "./Rasp.scss";
import days from "../../utils/days";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { useEffect } from "react";

const group: string = "Группа К3-63Б";

function Rasp() {
  const data = useTypedSelector((store) => store.data);
  const { getFullList } = useActions();

  useEffect(() => {
    getFullList();
  }, [])

  useEffect(() => {
    console.log('data >>> ', data);
  }, [data])

  return data.fullList !== undefined ? <div className="App">
    <div className="App__container">
      <Header/>
      <SubjectHeader name={group}/>
      <div className={"tables__container"}>
        {
          days.map((day) => <SubjectTable day={day} key={day.id}/>)
        }
      </div>
    </div>
  </div> : 'kek'


}

export default Rasp;
