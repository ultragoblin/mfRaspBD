import React, {useState} from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const Header = () => {
    const [select, setSelect] = useState(0);

    const handleChange = (e) => {
       setSelect(e.target.value); 
    }

    return (
        <header>
            <FormControl
                value={select}
                onChange={handleChange}
            >
                <Select>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                </Select>
            </FormControl>
        </header>
    )
}

export default Header;
