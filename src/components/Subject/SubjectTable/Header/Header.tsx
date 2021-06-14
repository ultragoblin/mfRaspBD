import styles from "./Header.module.scss";
import CustomRadio from "../../../CustomRadio";
import { radioType } from "../../../CustomRadio/CustomRadio";
import { EDayType } from "../SubjectTable";

export interface HeaderProps {
  setDayTVal: (e: any) => void 
}

const Header = ({setDayTVal}: HeaderProps) => {
  const radio: radioType = {
    value: {
      first: EDayType.COMMON,
      second: EDayType.SPECIAL,
    },
    label: {
      first: "Обычное расписание",
      second: "Особое расписание",
    },
    handler: setDayTVal
  };

  return (
    <tr className={styles.tr}>
      <td colSpan={2}>
        <h2 className={styles.capton_h}>Понедельник</h2>
      </td>
      <td colSpan={5}>
        <CustomRadio {...radio} />
      </td>
    </tr>
  );
};

export default Header;
