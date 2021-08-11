import Button from "@material-ui/core/Button";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import SaveIcon from "@material-ui/icons/Save";
import styles from "./SubjectHeader.module.scss";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useEffect } from "react";

export interface SubjectHeaderInteface {
  name: string;
}

const SubjectHeader = ({ name }: SubjectHeaderInteface) => {
  const { collectData, clearData } = useActions();
  const isCol = useTypedSelector((state) => state.collectData.collecting)

  useEffect(() => {
    // clearData();
    console.log('...', isCol)
  }, [isCol])

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
