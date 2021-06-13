import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import styles from "./Aud.module.scss";
import { ISubj } from "../Row";

export interface AudProps {
  addStyles?: React.CSSProperties;
  options: ISubj[];
}

const Aud = ({ options, addStyles }: AudProps) => {
  return (
    <div className={styles.aud}>
      <Autocomplete
        style={styles}
        options={options}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label="" variant="outlined" />
        )}
      />
      <AddIcon />
    </div>
  );
};

export default Aud;
