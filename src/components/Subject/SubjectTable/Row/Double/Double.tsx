import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import { RowChildProps, RowWidth } from "../Row";
import Subgroup from "../Subgroup";
import Aud from "../Aud";
import { useState } from "react";
import { pairT } from "../../../../../Redux/reducers/raspData";

const Double = ({
                  state,
                  timer,
                  handler,
                  stateFunc,
                  number,
                  options: { subGroup, aud, teacher, subject }
                }: RowChildProps) => {

  const { AUD, SUBJECT, TIMER, SUBGROUP, CHECKBOX, NUMBER, TEACHER } = RowWidth;
  const [doubleRow, setDoubleRow] = useState<pairT | {}>({});

  const handleChange = () => {

  }

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
            options={subject}
            style={{ width: SUBJECT }}
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
            style={{ width: TEACHER }}
            renderInput={(params) => (
              <TextField {...params} label="" variant="outlined"/>
            )}
          />
        </td>
        <td width={AUD} className="td">
          <Aud handleFunc={handleChange} options={aud}/>
        </td>
        <td width={SUBGROUP} className="td">
          <Subgroup options={subGroup}/>
        </td>
      </tr>

      <tr>
        <td width={SUBJECT} className="td__dobule">
          <Autocomplete
            options={subject}
            style={{ width: SUBJECT }}
            getOptionLabel={(option) => option.subject}
            renderInput={(params) => (
              <TextField {...params} label="" variant="outlined"/>
            )}
          />
        </td>
        <td width={TEACHER} className="td__dobule">
          <Autocomplete
            options={teacher}
            getOptionLabel={(option) => option.teacher}
            style={{ width: TEACHER }}
            renderInput={(params) => (
              <TextField {...params} label="" variant="outlined"/>
            )}
          />
        </td>
        <td width={AUD} className="td__dobule">
          <Aud handleFunc={handleChange} options={aud}/>
        </td>
        <td width={SUBGROUP} className="td__dobule">
          <Subgroup options={subGroup}/>
        </td>
      </tr>
    </>
  );
};

export default Double;
