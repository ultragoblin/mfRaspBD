import React from "react";
import {Autocomplete} from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import {InputsProps} from "../CustomModal";

export interface CustomAutocompleteProps extends InputsProps {
    options: string[]
}

const CustomAutocomplete = ({options, id, stateFun, label}: CustomAutocompleteProps) => {
    return (
        <Autocomplete
            id={id}
            onChange={(event, value) => stateFun(event, options, id, value)}
            options={options}
            getOptionLabel={(option) => option}
            renderInput={(params => (
                <TextField {...params} label={label} variant='outlined'/>
            ))}
        />
    )
};

export default CustomAutocomplete;
