import {useEffect} from "react";
import Header from "../../components/Header";
import SubjectHeader from "../../components/Subject/SubjectHeader";
import SubjectTable from "../../components/Subject/SubjectTable";
import "./Rasp.scss";
import days from "../../utils/days";
import {useTypedSelector} from "../../hooks/useTypedSelector";

const group: string = "Группа К3-63Б";

function Rasp() {
    const fullList = useTypedSelector((store) => store.data.fullList);

    return fullList.data.length > 0 ? <div className="App">
        <div className="App__container">
            <Header/>
            <SubjectHeader name={group}/>
            <div className={"tables__container"}>
                {
                    days.map((day) => <SubjectTable day={day} key={day.id}/>)
                }
            </div>
        </div>
    </div> : 'loading';

}

export default Rasp;
