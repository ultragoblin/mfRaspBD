import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { IOptions } from "../Row";

export interface AudProps {
  styles?: React.CSSProperties;
  options: IOptions[];
}

const Subgroup = ({ options, styles }: AudProps) => {
  return (
    <Autocomplete
      style={styles}
      options={options}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField {...params} label="" variant="outlined" />
      )}
    />
  );
};

export default Subgroup;
