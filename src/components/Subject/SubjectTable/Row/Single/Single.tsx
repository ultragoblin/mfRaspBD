import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import { RowChildProps, RowWidth } from "../Row";
import Aud from "../Aud";

const Single = ({ number, timer, state, handler, options }: RowChildProps) => {
  const {AUD, SUBJECT, TIMER, SUBGROUP, CHECKBOX, NUMBER, TEACHER} = RowWidth;

  return (
    <tr className="tr">
      <td width={NUMBER} className="tr">
        {number}
      </td>
      <td width={TIMER} className="td">
        {timer}
      </td>
      <td width={CHECKBOX} className="td">
        <Checkbox color="primary" checked={state} onChange={handler} />
      </td>
      <td width={SUBJECT} className="td">
        <Autocomplete
          options={options}
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
          renderInput={(params) => (
            <TextField {...params} label="" variant="outlined" />
          )}
        />
      </td>
      <td width={AUD} className="td">
        <Aud options={options} />
      </td>
      <td width={SUBGROUP} className="td">
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="" variant="outlined" />
          )}
        />
      </td>
    </tr>
  );
};

export default Single;
