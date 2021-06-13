import { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import styles from "./CustomRadio.module.scss";

export type radioType = {
  label?: {
    first: string;
    second: string;
  };
  value: {
    first: string;
    second: string;
  };
};

const defaultColor: React.CSSProperties = { color: "#000000" };
const activeColor: React.CSSProperties = { color: "#007DFF" };

const CustomRadio = ({ value, label }: radioType) => {
  const [firstColor, setFirstColor] =
    useState<React.CSSProperties>(defaultColor);
  const [secondColor, setSecondColor] =
    useState<React.CSSProperties>(defaultColor);

  const handleFirst = () => {
    setFirstColor(activeColor);
    setSecondColor(defaultColor);
  };

  const handleSecond = () => {
    setFirstColor(defaultColor);
    setSecondColor(activeColor);
  };

  return (
    <FormControl className={styles.form__radio} component="fieldset">
      <RadioGroup row aria-label="position" name="position">
        <FormControlLabel
          onChange={handleFirst}
          value={value.first}
          control={<Radio style={firstColor} />}
          label={label?.first}
        />
        <FormControlLabel
          onChange={handleSecond}
          value={value.second}
          control={<Radio style={secondColor} />}
          label={label?.second}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default CustomRadio;
