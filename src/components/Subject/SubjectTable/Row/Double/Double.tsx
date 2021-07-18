import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import { RowChildProps, RowWidth } from "../Row";
import Subgroup from "../Subgroup";
import Aud from "../Aud";

const Double = ({ state, timer, handler, number, options: {subGroup, aud, teacher, subject} }: RowChildProps) => {
  const { AUD, SUBJECT, TIMER, SUBGROUP, CHECKBOX, NUMBER, TEACHER } = RowWidth;

  return (
    <>
      <tr className="tr">
        <td rowSpan={2} width={NUMBER} className="tr">
          {number}
        </td>
        <td rowSpan={2} width={TIMER} className="td">
          {timer}
        </td>
        <td rowSpan={2} width={CHECKBOX} className="td">
          <Checkbox color="primary" checked={state} onChange={handler} />
        </td>
        <td width={SUBJECT} className="td">
          <Autocomplete
            options={subject}
            style={{ width: SUBJECT }}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="" variant="outlined" />
            )}
          />
        </td>
        <td width={TEACHER} className="td">
          <Autocomplete
            options={teacher}
            getOptionLabel={(option) => option.name}
            style={{ width: TEACHER }}
            renderInput={(params) => (
              <TextField {...params} label="" variant="outlined" />
            )}
          />
        </td>
        <td width={AUD} className="td">
          <Aud options={aud} />
        </td>
        <td width={SUBGROUP} className="td">
          <Subgroup options={subGroup} />
        </td>
      </tr>

      <tr>
        <td width={SUBJECT} className="td__dobule">
          <Autocomplete
            options={subject}
            style={{ width: SUBJECT }}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="" variant="outlined" />
            )}
          />
        </td>
        <td width={TEACHER} className="td__dobule">
          <Autocomplete
            options={teacher}
            getOptionLabel={(option) => option.name}
            style={{ width: TEACHER }}
            renderInput={(params) => (
              <TextField {...params} label="" variant="outlined" />
            )}
          />
        </td>
        <td width={AUD} className="td__dobule">
          <Aud options={aud} />
        </td>
        <td width={SUBGROUP} className="td__dobule">
          <Subgroup options={subGroup} />
        </td>
      </tr>
    </>
  );
};

export default Double;
