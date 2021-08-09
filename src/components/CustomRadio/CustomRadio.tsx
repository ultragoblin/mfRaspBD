import { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import styles from "./CustomRadio.module.scss";
import { withStyles } from "@material-ui/core/styles";

export type radioType = {
  label?: {
    first: string;
    second: string;
  };
  value: {
    first: string;
    second: string;
  };
  handler: (e: any) => void;
};

const BlueRadio = withStyles({
  root: {
    color: "#000000",
    "&$checked": {
      color: "#007DFF",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const CustomRadio = ({ value, label, handler }: radioType) => {
  const [val, setVal] = useState<string>(value.first);

  const handleChange = (e: any) => {
    setVal(e.target.value);
    handler(e);
  };

  return (
    <FormControl className={styles.form__radio} component="fieldset">
      <RadioGroup
        row
        aria-label="position"
        name="position"
        value={val}
        onChange={handleChange}
      >
        <FormControlLabel
          value={value.first}
          control={<BlueRadio />}
          label={label?.first}
        />
        <FormControlLabel
          value={value.second}
          control={<BlueRadio />}
          label={label?.second}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default CustomRadio;
