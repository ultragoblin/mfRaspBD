import React from "react";
import { Autocomplete } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import { InputsProps } from "../CustomModal";
import styles from './Items.module.scss';

export interface CustomAutocompleteProps {
  id: string,
  label: string,
  stateFun: (e: any, id: string, fieldValue: any, options?: string[]) => void,
  options: string[]
}

const CustomAutocomplete = ({ options, id, stateFun, label }: CustomAutocompleteProps) => {
  return (
    <Autocomplete
      className={styles.autocomplete}
      id={id}
      onChange={(event, value) => stateFun(event, id, value, options)}
      options={options}
      getOptionLabel={(option) => option}
      renderInput={(params => (
        <TextField {...params} label={label} variant='outlined'/>
      ))}
    />
  )
};

export default CustomAutocomplete;
