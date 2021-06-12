import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import styles from "./SubjectTable.module.scss";
import Naming from "./Naming";

const SubjectTable = () => {
  return (
    <table>
      <thead>
        <tr>
          <td>
            <h2 className={styles.capton_h}>Понедельник</h2>
          </td>
          <td>
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
        <Naming />
      </thead>
      <tbody>
        <tr>
          <td>kekke</td>
          <td>kekek2</td>
        </tr>
      </tbody>
    </table>
  );
};

export default SubjectTable;
