import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import "./Header.scss";

const Header = () => {
  const [select, setSelect] = useState(0);

  const handleChange = (e) => {
    setSelect(e.target.value);
  };

  return (
    <header>
      <FormControl variant="outlined" value={select} onChange={handleChange}>
        <InputLabel htmlFor="select-year-label">Учебный год</InputLabel>
        <Select
          inputProps={{
            name: "age",
            id: "select-year-label",
          }}
          native
          id="year__select"
          labelId="select-year-label"
        >
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
        </Select>
      </FormControl>
    </header>
  );
};

export default Header;
