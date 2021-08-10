import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from "@material-ui/core/MenuItem";
import "./CustomSelect.scss";
import { TOptions } from "../Header/Header";

export interface CustomSelectInterface {
  width: number,
  selectItems: TOptions[] | undefined,
  stateFunc: (e: any) => void,
  label: string,
  id: {
    label: string,
    select: string
  }
};

const CustomSelect = ({ selectItems, width, label, id, stateFunc }: CustomSelectInterface) => {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: width,
      padding: 0
    },
    select: {
      padding: 0
    },
  }));

  const classes = useStyles();
  const [select, setSelect] = useState('');
  const handleChange = (e: any) => {
    stateFunc(e);
    setSelect(e.target.value);
  };

  return (
    <FormControl variant="outlined" className={`${classes.formControl} Select ${id.label}`}>
      <InputLabel id={id.label}>{label}</InputLabel>
      <Select
        className={classes.select}
        labelId={id.label}
        id={id.select}
        value={select}
        onChange={handleChange}
        label={label}
      >
        {selectItems && selectItems.map((item) => <MenuItem key={item.placeholder} value={item.value}>{item.placeholder}</MenuItem>)}
      </Select>
    </FormControl>
  )
};

export default CustomSelect;
