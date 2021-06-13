import styles from "./Header.module.scss";
import CustomRadio from "../../../CustomRadio";
import { radioType } from "../../../CustomRadio/CustomRadio";

const radio: radioType = {
  value: {
    first: "common",
    second: "special",
  },
  label: {
    first: "Обычное расписание",
    second: "Особое расписание",
  },
};

const Header = () => {
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
