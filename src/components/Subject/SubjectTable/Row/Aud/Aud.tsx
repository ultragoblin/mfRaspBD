import { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import styles from "./Aud.module.scss";
import { IOptions } from "../Row";

export interface AudProps {
  addStyles?: React.CSSProperties;
  options: IOptions[];
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
          style={{ marginLeft: 4 }}
          options={options}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="" variant="outlined" />
          )}
        />
      ) : (
        ""
      )}
      <div className="icon">
        {added ? (
          <RemoveIcon style={{ color: '#FF505F' }} onClick={handleChange} />
        ) : (
          <AddIcon style={{ color: '#007DFF' }} onClick={handleChange} />
        )}
      </div>
    </div>
  );
};

export default Aud;
