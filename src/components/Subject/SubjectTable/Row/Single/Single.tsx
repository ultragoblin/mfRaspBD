import React, {useState} from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import {OptionsTypes, RowChildProps, RowWidth} from "../Row";
import Aud from "../Aud";
import {pairT} from "../../../../../Redux/reducers/raspData";

const Single = ({
                    number,
                    timer,
                    state,
                    handler,
                    options: {subGroup, aud, teacher, subject}
                }: RowChildProps) => {
    const [singleRow, setSingleRow] = useState<pairT>({
        aud: 0,
        subgroup: 0,
        subject: 0,
        teacher: 0,
        week: 0
    });
    const {AUD, SUBJECT, TIMER, SUBGROUP, CHECKBOX, NUMBER, TEACHER} = RowWidth;

    const handleChange = (event: any, value: any) => {
        let name: string = '';
        let id: number = 0;

        for (let key in value) {
            if (key.includes("id")) {
                id = value[key];
            } else {
                name = value[key]
            }
        }

        console.log(value)
        console.log(name,id)

        console.log(singleRow)
    }

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
                    onChange={(event, value) => handleChange(event, value)}
                    options={subject}
                    getOptionLabel={(option) => option.subject}
                    renderInput={(params) => (
                        <TextField {...params} label="" variant="outlined"/>
                    )}
                />
            </td>
            <td width={TEACHER} className="td">
                <Autocomplete
                    options={teacher}
                    getOptionLabel={(option) => option.teacher}
                    renderInput={(params) => (
                        <TextField {...params} name='teacher' label="" variant="outlined"/>
                    )}
                />
            </td>
            <td width={AUD} className="td">
                <Aud options={aud}/>
            </td>
            <td width={SUBGROUP} className="td">
                <Autocomplete
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
