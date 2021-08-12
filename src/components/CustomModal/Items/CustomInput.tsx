import React from "react";
import {TextField} from "@material-ui/core";
import {InputsProps} from "../CustomModal";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
        marginBottom: '20px'
    }
  })
);

const CustomInput = ({stateFun, label, id}: InputsProps) => {
    const classes = useStyles();

    return (
        <TextField
            className={classes.input}
            style={{width: "100%"}}
            id={id}
            // @ts-ignore
            onChange={(event, value) => stateFun(event, id, value)}
            label={label}
            variant="outlined"
        />
    )
};

export default CustomInput;
