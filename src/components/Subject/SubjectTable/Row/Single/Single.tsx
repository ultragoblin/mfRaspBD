import React, { useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import {autocompleteNamings, RowChildProps, RowWidth, SingleRowProps} from "../Row";
import Aud from "../Aud";
import { pairT } from "../../../../../Redux/reducers/raspData";
import { editAud, editOthersFields } from "../../../../../utils/editting";

const Single = ({
                  number,
                  timer,
                  state,
                  handler,
                  stateFunc,
                  options: { subGroup, aud, teacher, subject }
                }: SingleRowProps) => {

  const [singleRow, setSingleRow] = useState<pairT | {}>({});
  const { AUD, SUBJECT, TIMER, SUBGROUP, CHECKBOX, NUMBER, TEACHER } = RowWidth;
  const { _subgroup, _subject, _teacher } = autocompleteNamings;

  const handleChange = (event: any, value: any, subID: string) => {
    if (subID.includes('aud')) {
      editAud(event, value, subID, singleRow, setSingleRow);
    } else {
      editOthersFields(event, value, subID, singleRow, setSingleRow);
    }
  }

  useEffect(() => {
    if (Object.keys(singleRow).length > 0) {
      stateFunc({
        ...singleRow,
        week: 0
      });
    } else {
      stateFunc({...singleRow});
    }

  }, [singleRow])

  return (
    <tr className="tr">
      <td width={NUMBER} className="td">
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
          defaultValue={subject[2]}
          style={{ width: SUBJECT }}
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
          style={{ width: TEACHER }}
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
  )
};

export default Single;
