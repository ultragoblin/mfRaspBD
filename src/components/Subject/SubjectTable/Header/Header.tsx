import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import styles from "./Header.module.scss";

const Header = () => {
    return (
        <tr className={styles.tr}>
          <td colSpan={2}>
            <h2 className={styles.capton_h}>Понедельник</h2>
          </td>
          <td colSpan={5}>
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue="end"
              >
                <FormControlLabel
                  value="Обычное расписание"
                  control={<Radio color="primary" />}
                  label="1"
                />
                <FormControlLabel
                  value="Особое расписание"
                  control={<Radio color="primary" />}
                  label="2"
                />
              </RadioGroup>
            </FormControl>
          </td>
        </tr>
    )
};

export default Header;
