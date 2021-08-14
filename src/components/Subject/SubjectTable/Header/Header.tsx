import styles from "./Header.module.scss";
import CustomRadio from "../../../CustomRadio";
import { radioType } from "../../../CustomRadio/CustomRadio";
import { EDayType } from "../SubjectTable";

export interface HeaderProps {
  setDayTVal: (e: any) => void,
  dayName: string,
  dayType: EDayType,
}

const Header = ({ setDayTVal, dayName, dayType }: HeaderProps) => {
  const radio: radioType = {
    value: {
      first: EDayType.COMMON,
      second: EDayType.SPECIAL,
    },
    label: {
      first: "Обычное расписание",
      second: "Особое расписание",
    },
    defValue: dayType,
    handler: setDayTVal
  };

  return (
    <tr className={styles.tr}>
      <td colSpan={7}>
        <div className={styles.header}>
          <h2 className={styles.capton_h}>{dayName}</h2>
          <CustomRadio {...radio} />
        </div>
      </td>
    </tr>
  );
};

export default Header;
