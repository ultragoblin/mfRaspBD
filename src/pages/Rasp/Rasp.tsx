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
    const tables = useTypedSelector((store) => store.raspData);

    useEffect(() => {
        console.log('tables >>>', tables, 'inJSON', JSON.stringify(tables))
    }, [tables])


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
    </div> : <div className="Spinner">
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>;

}

export default Rasp;
