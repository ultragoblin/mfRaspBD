import React from "react";
import {TextField} from "@material-ui/core";
import {createStyles, makeStyles} from '@material-ui/core/styles';

export interface SearcherProps {
    state: string,
    setState: (e: any) => void,
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            '& > *': {
                margin: 0,
                width: '25ch',
            },
        },
        input: {
            '& > *': {
                padding: '0 21px',
            },

            padding: '0 21px',
            width: '100%',

            '& .MuiInput-underline:before': {
                borderBottomColor: 'white',
            },
        }
    }),
);

const Searcher = ({state, setState}: SearcherProps) => {
    const classes = useStyles();

    return (
        <TextField
            value={state}
            onChange={setState}
            className={classes.input}
            id="standard-basic"
            label="Поиск"
        />
    )
}

export default Searcher;
