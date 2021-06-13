import { useState } from "react";
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
  const [added, setAdded] = useState<boolean>(false);

  const handleChange = () => {
    setAdded(!added);
  };

  return (
    <div
      className={`${styles.aud} ${
        added ? styles.aud_double : styles.aud_single
      }`}
    >
      <Autocomplete
        style={addStyles}
        options={options}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label="" variant="outlined" />
        )}
      />
      {added ? (
        <Autocomplete
          style={{marginLeft: 4}}
          options={options}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="" variant="outlined" />
          )}
        />
      ) : (
        ""
      )}
      {added ? (
        <RemoveIcon onClick={handleChange} />
      ) : (
        <AddIcon onClick={handleChange} />
      )}
    </div>
  );
};

export default Aud;
