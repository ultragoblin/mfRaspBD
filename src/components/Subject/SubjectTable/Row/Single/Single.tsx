import React, {useEffect, useState} from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import {autocompleteNamings, RowChildProps, RowWidth} from "../Row";
import Aud from "../Aud";
import {pairT} from "../../../../../Redux/reducers/raspData";

const Single = ({
                    number,
                    timer,
                    state,
                    handler,
                    stateFunc,
                    options: {subGroup, aud, teacher, subject}
                }: RowChildProps) => {
    const [singleRow, setSingleRow] = useState<pairT | {}>({});
    const {AUD, SUBJECT, TIMER, SUBGROUP, CHECKBOX, NUMBER, TEACHER} = RowWidth;
    const {_subgroup, _subject, _teacher} = autocompleteNamings;

    const handleChange = (event: any, value: any, subID: string) => {
        let name: string = '';
        let id: number = 0;

        for (let key in value) {
            if (key.includes("id")) {
                id = value[key];
            } else {
                name = key;
            }
        }

        if (name.length > 0) {
            setSingleRow({...singleRow, [name]: id});
        } else {
            setSingleRow({...singleRow, [subID.split('-')[0]]: 0})
        }

    }

    useEffect(() => {
        stateFunc(singleRow)
    }, [singleRow])

    return (
        <tr className="tr">
            <td width={NUMBER} className="tr">
                {number}
            </td>
            <td width={TIMER} className="td">
                {timer}
            </td>
            <td width={CHECKBOX} className="td">
                <Checkbox color="primary" checked={state} onChange={handler}/>
            </td>
            <td width={SUBJECT} className="td">
                <Autocomplete
                    id={_subject}
                    onChange={(event, value) => handleChange(event, value, _subject)}
                    options={subject}
                    getOptionLabel={(option) => option.subject}
                    renderInput={(params) => (
                        <TextField {...params} label="" variant="outlined"/>
                    )}
                />
            </td>
            <td width={TEACHER} className="td">
                <Autocomplete
                    id={_teacher}
                    onChange={(event, value) => handleChange(event, value, _teacher)}
                    options={teacher}
                    getOptionLabel={(option) => option.teacher}
                    renderInput={(params) => (
                        <TextField {...params} name='teacher' label="" variant="outlined"/>
                    )}
                />
            </td>
            <td width={AUD} className="td">
                <Aud handleFunc={handleChange} options={aud}/>
            </td>
            <td width={SUBGROUP} className="td">
                <Autocomplete
                    id={_subgroup}
                    onChange={(event, value) => handleChange(event, value, _subgroup)}
                    options={subGroup}
                    getOptionLabel={(option) => option.subgroup}
                    renderInput={(params) => (
                        <TextField {...params} label="" variant="outlined"/>
                    )}
                />
            </td>
        </tr>
    );
};

export default Single;
