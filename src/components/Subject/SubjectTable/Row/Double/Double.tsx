import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import {autocompleteNamings, DoubleRowProps, RowWidth} from "../Row";
import Aud from "../Aud";
import React, {useEffect, useState} from "react";
import {pairT} from "../../../../../Redux/reducers/raspData";
import {editAud, editOthersFields} from "../../../../../utils/editting";

const Double = ({
                    state,
                    timer,
                    handler,
                    stateFuncFirstRow,
                    stateFuncSecondRow,
                    number,
                    options: {subgroup, aud, teacher, subject},
                    defaultOptions
                }: DoubleRowProps) => {

    const {AUD, SUBJECT, TIMER, SUBGROUP, CHECKBOX, NUMBER, TEACHER} = RowWidth;
    const {_subgroup, _subject, _teacher} = autocompleteNamings;
    const [firstRow, setFirstRow] = useState<pairT>({});
    const [secondRow, setSecondRow] = useState<pairT>({});

    const handleChangeFirstRow = (event: any, value: any, subID: string) => {
        if (subID.includes('aud')) {
            editAud(event, value, subID, firstRow, setFirstRow);
        } else {
            editOthersFields(event, value, subID, firstRow, setFirstRow);
        }
    }

    const handleChangeSecondRow = (event: any, value: any, subID: string) => {
        if (subID.includes('aud')) {
            editAud(event, value, subID, secondRow, setSecondRow);
        } else {
            editOthersFields(event, value, subID, secondRow, setSecondRow);
        }
    }

    useEffect(() => {

    }, [firstRow, secondRow])

    useEffect(() => {
        if (Object.keys(firstRow).length > 0) {
            stateFuncFirstRow({
                ...firstRow,
                week: 1
            });
        } else {
            stateFuncFirstRow(firstRow)
        }

    }, [firstRow])

    useEffect(() => {
        if (Object.keys(secondRow).length > 0) {
            stateFuncSecondRow({
                ...secondRow,
                week: 2
            });
        } else {
            stateFuncSecondRow(secondRow)
        }

    }, [secondRow])

    return (
        <>
            <tr className="tr">
                <td rowSpan={2} width={NUMBER} className="td">
                    {number}
                </td>
                <td rowSpan={2} width={TIMER} className="td">
                    {timer}
                </td>
                <td rowSpan={2} width={CHECKBOX} className="td">
                    <Checkbox color="primary" checked={state} onChange={handler}/>
                </td>
                <td width={SUBJECT} className="td">
                    <Autocomplete
                        onChange={(event, value) => handleChangeFirstRow(event, value, _subject)}
                        id={_subject}
                        options={subject}
                        defaultValue={subject[defaultOptions.first.subject]}
                        style={{width: SUBJECT}}
                        getOptionLabel={(option) => option.subject}
                        renderInput={(params) => (
                            <TextField {...params} label="" variant="outlined"/>
                        )}
                    />
                </td>
                <td width={TEACHER} className="td">
                    <Autocomplete
                        onChange={(event, value) => handleChangeFirstRow(event, value, _teacher)}
                        id={_teacher}
                        options={teacher}
                        defaultValue={teacher[defaultOptions.first.teacher]}
                        getOptionLabel={(option) => option.teacher}
                        style={{width: TEACHER}}
                        renderInput={(params) => (
                            <TextField {...params} label="" variant="outlined"/>
                        )}
                    />
                </td>
                <td width={AUD} className="td">
                    <Aud defaultOption={defaultOptions.first} handleFunc={handleChangeFirstRow} options={aud}/>
                </td>
                <td width={SUBGROUP} className="td">
                    <Autocomplete
                        onChange={(event, value) => handleChangeFirstRow(event, value, _subgroup)}
                        id={_subgroup}
                        options={subgroup}
                        defaultValue={subgroup[defaultOptions.first.subgroup]}
                        getOptionLabel={(option) => option.subgroup}
                        renderInput={(params) => (
                            <TextField {...params} label="" variant="outlined"/>
                        )}
                    />
                </td>
            </tr>

            <tr>
                <td width={SUBJECT} className="td__dobule">
                    <Autocomplete
                        onChange={(event, value) => handleChangeSecondRow(event, value, _subject)}
                        id={_subject}
                        options={subject}
                        defaultValue={subject[defaultOptions.second.subject]}
                        style={{width: SUBJECT}}
                        getOptionLabel={(option) => option.subject}
                        renderInput={(params) => (
                            <TextField {...params} label="" variant="outlined"/>
                        )}
                    />
                </td>
                <td width={TEACHER} className="td__dobule">
                    <Autocomplete
                        onChange={(event, value) => handleChangeSecondRow(event, value, _teacher)}
                        id={_teacher}
                        options={teacher}
                        defaultValue={teacher[defaultOptions.second.teacher]}
                        getOptionLabel={(option) => option.teacher}
                        style={{width: TEACHER}}
                        renderInput={(params) => (
                            <TextField {...params} label="" variant="outlined"/>
                        )}
                    />
                </td>
                <td width={AUD} className="td__dobule">
                    <Aud defaultOption={defaultOptions.second} handleFunc={handleChangeSecondRow} options={aud}/>
                </td>
                <td width={SUBGROUP} className="td__dobule">
                    <Autocomplete
                        onChange={(event, value) => handleChangeSecondRow(event, value, _subgroup)}
                        id={_subgroup}
                        options={subgroup}
                        defaultValue={subgroup[defaultOptions.second.subgroup]}
                        getOptionLabel={(option) => option.subgroup}
                        renderInput={(params) => (
                            <TextField {...params} label="" variant="outlined"/>
                        )}
                    />
                </td>
            </tr>
        </>
    );
};

export default Double;
