import React from "react";
import {TextField} from "@material-ui/core";
import {createStyles, makeStyles} from '@material-ui/core/styles';
import styles from './Searcher.module.css';

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
        <div className={styles.searcher}>
            <TextField
                value={state}
                onChange={setState}
                className={classes.input}
                id="standard-basic"
                placeholder="Поиск"
            />
        </div>
    )
}

export default Searcher;
