import React from "react";
import {TextField} from "@material-ui/core";
import {InputsProps} from "../CustomModal";

const CustomInput = ({stateFun, label, id}: InputsProps) => {

    return (
        <TextField
            style={{width: "100%"}}
            id={id}
            // @ts-ignore
            onChange={(event, value) => stateFun(event, id, value)}
            label={label}
            variant="outlined"/>
    )
};

export default CustomInput;
