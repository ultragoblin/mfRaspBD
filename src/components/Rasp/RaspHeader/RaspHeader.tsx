import {useEffect} from "react";
import Button from "@material-ui/core/Button";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import SaveIcon from "@material-ui/icons/Save";
import styles from "./RaspHeader.module.css";
import {useActions} from "../../../hooks/useActions";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {TGroupInfo} from "../../../Redux/reducers/raspData";

export interface SubjectHeaderInteface {
    name: string;
}

const RaspHeader = ({name}: SubjectHeaderInteface) => {
    const {collectData} = useActions();
    const raspData = useTypedSelector((store) => store.raspData);
    const collectingDataState = useTypedSelector((state) => state.collectData)
    const {setData, sendData, sendedData} = useActions();

    useEffect(() => {
        if (collectingDataState.sendReq) {
            console.log('sending json >>>', raspData, 'jsonnn >>>>', JSON.stringify(raspData));
            sendData(raspData);
            sendedData()
        }

    }, [collectingDataState])

    const handleGetRasp = () => {
        const query: TGroupInfo = {
            semester: raspData.semester,
            year: raspData.year,
            group: raspData.group
        }

        setData(query);
    }

    return (
        <div className={styles.header}>
            <h1>Группа {name}</h1>
            <div className={styles.buttons}>
                <Button
                    onClick={handleGetRasp}
                    startIcon={<AutorenewIcon/>}
                    variant="contained"
                    color="secondary"
                >
                    Загрузить
                </Button>
                <Button onClick={collectData} style={{backgroundColor: '#007DFF'}} startIcon={<SaveIcon/>}
                        variant="contained" color="primary">
                    Сохранить
                </Button>
            </div>
        </div>
    );
};

export default RaspHeader;
