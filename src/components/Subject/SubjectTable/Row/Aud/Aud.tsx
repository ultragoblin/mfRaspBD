import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import styles from "./Aud.module.scss";
import { autocompleteNamings } from "../Row";
import { TAudOptions } from "../../../../../Redux/reducers/data";

export interface AudProps {
  handleFunc: (event: any,value: any, subID: string) => void,
  addStyles?: React.CSSProperties;
  options: TAudOptions[];
}

const Aud = ({ options, addStyles, handleFunc }: AudProps) => {
  const [added, setAdded] = useState<boolean>(false);
  const {first, second} = autocompleteNamings._aud;

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
        id={first}
        onChange={(event, value) => handleFunc(event, value, first)}
        style={addStyles}
        options={options}
        getOptionLabel={(option) => option.aud}
        renderInput={(params) => (
          <TextField {...params} label="" variant="outlined" />
        )}
      />
      {added ? (
        <Autocomplete
          id={second}
          onChange={(event, value) => handleFunc(event, value, second)}
          style={{ marginLeft: 4 }}
          options={options}
          getOptionLabel={(option) => option.aud}
          renderInput={(params) => (
            <TextField {...params} label="" variant="outlined" />
          )}
        />
      ) : (
        ""
      )}
      <div className={styles.icon}>
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
