import { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import styles from "./Row.module.scss";

interface RowProps {
  number: number;
  timer: string;
}

type ISubj = {
  name: string
}

// ! Сюда подгрузим список предметов 
const options: ISubj[] = [
  {
    name: "keker",
  },
];

const Row = ({ number, timer }: RowProps) => {
  const [double, setDouble] = useState(false);

  const doubleHandler = () => {
    setDouble(!double);
    console.log(double);
  };

  return (
    <tr className={styles.tr}>
      <td width={42} className={styles.td}>
        {number}
      </td>
      <td width={121} className={styles.td}>
        {timer}
      </td>
      <td width={42} className={styles.td}>
        <Checkbox color="primary" checked={double} onChange={doubleHandler} />
      </td>
      <td width={442} className={styles.td}>
        <Autocomplete
          id="combo-box-demo"
          options={options}
          getOptionLabel={(option) => option.name}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="" variant="outlined" />
          )}
        />
      </td>
      <td width={392} className={styles.td}>
      <Autocomplete
          id="combo-box-demo"
          options={options}
          getOptionLabel={(option) => option.name}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="" variant="outlined" />
          )}
        />
      </td>
      <td width={213} className={styles.td}>
        6
      </td>
      <td width={124} className={styles.td}>
        7
      </td>
    </tr>
  );
};

export default Row;
