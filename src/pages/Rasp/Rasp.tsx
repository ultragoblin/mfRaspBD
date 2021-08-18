import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import SubjectHeader from "../../components/Subject/SubjectHeader";
import SubjectTable from "../../components/Subject/SubjectTable";
import "./Rasp.css";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import { raspDayT } from "../../Redux/reducers/raspData";

export type RaspProps = {
    setPage: () => void
};

function Rasp({setPage}: RaspProps) {
    const [groupName, setGroupName] = useState<string>('...')
    const fullList = useTypedSelector((store) => store.data.fullList);
    const tables = useTypedSelector((store) => store.raspData);
    const timings = useTypedSelector((store) => store.timing);

    return (fullList.data.length > 0 && timings.length > 0) ? <div className="App">
        <div className="App__container">
            <Header setPage={setPage} setGroupName={setGroupName}/>
            <SubjectHeader name={groupName}/>
            <div className={"tables__container"}>
                {
                    tables.day.map((day: raspDayT) => <SubjectTable day={day} key={day.id}/>)
                }
            </div>
        </div>
    </div> : <div className="Spinner">
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>;

}

export default Rasp;
