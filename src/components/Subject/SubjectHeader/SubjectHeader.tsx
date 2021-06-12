import Button from "@material-ui/core/Button";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import SaveIcon from "@material-ui/icons/Save";
import styles from "./SubjectHeader.module.scss";

export interface SubjectHeaderInteface {
  name: string;
}

const SubjectHeader = ({ name }: SubjectHeaderInteface) => {
  return (
    <div className={styles.header}>
      <h1>{name}</h1>
      <div className={styles.buttons}>
        <Button
          startIcon={<AutorenewIcon />}
          variant="contained"
          color="secondary"
        >
          Сбросить
        </Button>
        <Button startIcon={<SaveIcon />} variant="contained" color="primary">
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default SubjectHeader;
