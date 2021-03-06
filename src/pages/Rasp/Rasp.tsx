import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import RaspHeader from "../../components/Rasp/RaspHeader";
import RaspTable from "../../components/Rasp/RaspTable";
import "./Rasp.css";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import { raspDayT } from "../../Redux/reducers/raspData";

export type RaspProps = {
    setPage: () => void
};

function Rasp({setPage}: RaspProps) {
    const [groupName, setGroupName] = useState<string>('...')
    const admList = useTypedSelector((store) => store.data.admLists);
    const tables = useTypedSelector((store) => store.raspData);
    const timings = useTypedSelector((store) => store.timing);

    return (!admList.loading && timings.length > 0) ? <div className="App">
        <div className="App__container">
            <Header setPage={setPage} setGroupName={setGroupName}/>
            <RaspHeader name={groupName}/>
            <div className={"tables__container"}>
                {
                    tables.day.map((day: raspDayT) => <RaspTable day={day} key={day.id}/>)
                }
            </div>
        </div>
    </div> : <div className="Spinner">
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>;

}

export default Rasp;
