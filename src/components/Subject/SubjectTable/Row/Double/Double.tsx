import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import { RowChildProps, RowWidth } from "../Row";

const Double = ({ state, timer, handler, number, options }: RowChildProps) => {
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
        <tr>
          <Autocomplete
            options={options}
            style={{ width: 442 }}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="" variant="outlined" />
            )}
          />
        </tr>
        <tr>
          <Autocomplete
            options={options}
            getOptionLabel={(option) => option.name}
            style={{ width: 442 }}
            renderInput={(params) => (
              <TextField {...params} label="" variant="outlined" />
            )}
          />
        </tr>
      </td>
      <td width={TEACHER} className="td">
        <tr>
          <Autocomplete
            options={options}
            getOptionLabel={(option) => option.name}
            style={{ width: 392 }}
            renderInput={(params) => (
              <TextField {...params} label="" variant="outlined" />
            )}
          />
        </tr>
        <tr>
          <Autocomplete
            id="combo-box-demo"
            options={options}
            getOptionLabel={(option) => option.name}
            style={{ width: 392 }}
            renderInput={(params) => (
              <TextField {...params} label="" variant="outlined" />
            )}
          />
        </tr>
      </td>
      <td width={AUD} className="td">
        6
      </td>
      <td width={SUBGROUP} className="td">
        7
      </td>
    </tr>
  );
};

export default Double;
