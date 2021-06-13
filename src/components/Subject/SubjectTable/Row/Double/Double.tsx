import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import { RowChildProps, RowWidth } from "../Row";
import Subgroup from "../Subgroup";
import Aud from "../Aud";

const Double = ({ state, timer, handler, number, options }: RowChildProps) => {
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
            options={options}
            style={{ width: SUBJECT }}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="" variant="outlined" />
            )}
          />
        </td>
        <td width={TEACHER} className="td">
          <Autocomplete
            options={options}
            getOptionLabel={(option) => option.name}
            style={{ width: TEACHER }}
            renderInput={(params) => (
              <TextField {...params} label="" variant="outlined" />
            )}
          />
        </td>
        <td width={AUD} className="td">
          <Aud options={options} />
        </td>
        <td width={SUBGROUP} className="td">
          <Subgroup options={options} />
        </td>
      </tr>

      <tr>
        <td width={SUBJECT} className="td__dobule">
          <Autocomplete
            options={options}
            style={{ width: SUBJECT }}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="" variant="outlined" />
            )}
          />
        </td>
        <td width={TEACHER} className="td__dobule">
          <Autocomplete
            options={options}
            getOptionLabel={(option) => option.name}
            style={{ width: TEACHER }}
            renderInput={(params) => (
              <TextField {...params} label="" variant="outlined" />
            )}
          />
        </td>
        <td width={AUD} className="td__dobule">
          <Aud options={options} />
        </td>
        <td width={SUBGROUP} className="td__dobule">
          <Subgroup options={options} />
        </td>
      </tr>
    </>
  );
};

export default Double;
