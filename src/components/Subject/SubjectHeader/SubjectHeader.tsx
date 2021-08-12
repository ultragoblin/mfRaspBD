import { useEffect } from "react";
import Button from "@material-ui/core/Button";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import SaveIcon from "@material-ui/icons/Save";
import styles from "./SubjectHeader.module.scss";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

export interface SubjectHeaderInteface {
  name: string;
}

const SubjectHeader = ({ name }: SubjectHeaderInteface) => {
  const { collectData } = useActions();
  const raspData = useTypedSelector((store) => store.raspData);
  const collectingDataState = useTypedSelector((state) => state.collectData)

  useEffect(() => {
    if (collectingDataState.sendReq) {
      let json = JSON.stringify(raspData);
      console.log('sending json >>>', raspData,'jsonnn >>>>' ,json)
      fetch('https://mf.bmstu.ru/rasp/api/adm/group', {
        method: "POST",
        headers: {
          'Content-Type': 'text/plain',
        },
        body: json
      })
        .then((v) => console.log('COL fetch >>> ', v))
        .catch((error) => console.log('COL fetch >>> ', error))
    }

  }, [collectingDataState])

  return (
    <div className={styles.header}>
      <h1>{name}</h1>
      <div className={styles.buttons}>
        <Button
          startIcon={<AutorenewIcon/>}
          variant="contained"
          color="secondary"
        >
          Отменить
        </Button>
        <Button onClick={collectData} style={{ backgroundColor: '#007DFF' }} startIcon={<SaveIcon/>} variant="contained" color="primary">
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default SubjectHeader;
