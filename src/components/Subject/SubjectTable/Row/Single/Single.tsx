import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import { RowChildProps, RowWidth } from "../Row";
import Aud from "../Aud";
import { useState } from "react";
import { pairT } from "../../../../../Redux/reducers/raspData";

const Single = ({ number, timer, state, handler, options, options: {subGroup, aud, teacher, subject} }: RowChildProps) => {
  const [singleRow, setSingleRow] = useState<pairT>({
    aud: 0,
    subgroup: 0,
    subject: 0,
    teacher: 0,
    week: 0
  });
  const { AUD, SUBJECT, TIMER, SUBGROUP, CHECKBOX, NUMBER, TEACHER } = RowWidth;

  const handleChange = (event: any) => {
    let name = event?.target.name;
    // console.log(name)
    // console.log(Object.entries(options))
    Object.entries(options).forEach((item) => {
      if (item[0] === name) {
        // item[1].forEach((values) => {})
        setSingleRow({...singleRow, [name]: item[event?.target?.value]})
        console.log('row', singleRow);
      }
    })
    // let val = Object.keys(options)[name][event?.target.value];
    // console.log(val)
    // console.log(options[event.target.value])
    // setSingleRow({ ...singleRow, [name]: val });
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
          options={subject}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} name='subject' onChange={handleChange} label="" variant="outlined"/>
          )}
        />
      </td>
      <td width={TEACHER} className="td">
        <Autocomplete
          options={teacher}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} name='teacher' onChange={handleChange} label="" variant="outlined"/>
          )}
        />
      </td>
      <td width={AUD} className="td">
        <Aud options={aud}/>
      </td>
      <td width={SUBGROUP} className="td">
        <Autocomplete
          options={subGroup}
          getOptionLabel={(option) => option.name}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField {...params}  label="" variant="outlined"/>
          )}
        />
      </td>
    </tr>
  );
};

export default Single;
