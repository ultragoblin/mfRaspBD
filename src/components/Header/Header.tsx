import React from "react";
import CustomSelect, { CustomSelectInterface } from "../CustomSelect/CustomSelect";
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import PrintIcon from '@material-ui/icons/Print';
import StorageIcon from '@material-ui/icons/Storage';
import Button from "@material-ui/core/Button";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import styles from "./Header.module.scss";

const selectWidth: number = 167;

const selects: CustomSelectInterface[] = [
    {
        label: 'Учебный год',
        id: {
            label: 'id__label_year',
            select: 'id__select_year'
        },
        width: selectWidth,
        selectItems: [
            {
                value: "2020",
                placeholder: "2020"
            },
            {
                value: "2021",
                placeholder: "2021"
            }
        ]
    },
    {
        label: 'Факультет',
        id: {
            label: 'id__label_fac',
            select: 'id__select_fac'
        },
        width: selectWidth,
        selectItems: [// Значения забирать с бэкенда
            {
                value: "2020",
                placeholder: "2020"
            },
            {
                value: "2021",
                placeholder: "2021"
            }
        ]
    },
    {
        label: 'Кафедра',
        id: {
            label: 'id__label_caf',
            select: 'id__select_caf'
        },
        width: selectWidth,
        selectItems: [// Значения забирать с бэкенда
            {
                value: "2020",
                placeholder: "2020"
            },
            {
                value: "2021",
                placeholder: "2021"
            }
        ]
    },
    {
        label: 'Группа',
        id: {
            label: 'id__label_group',
            select: 'id__select_group'
        },
        width: selectWidth,
        selectItems: [// Значения забирать с бэкенда
            {
                value: "2020",
                placeholder: "2020"
            },
            {
                value: "2021",
                placeholder: "2021"
            }
        ]
    },
];

const Header = () => {

    return (
        <header className={styles.header}>
            <div className={styles.header__form}>
                {
                    selects.map((select) => <CustomSelect
                        width={select.width}
                        selectItems={select.selectItems}
                        label={select.label}
                        id={select.id}
                    />)
                }
                <FormControl className={styles.form__radio} component="fieldset">
                    <RadioGroup row aria-label="position" name="position" defaultValue="end">
                        <FormControlLabel value="семестр 1" control={<Radio color="primary" />} label="1" />
                        <FormControlLabel value="семестр 2" control={<Radio color="primary" />} label="2" />
                    </RadioGroup>
                </FormControl>
            </div>
            <div className={styles.header__buttons}>
                <Button startIcon={<StorageIcon />} variant="contained">База данных</Button>
                <Button startIcon={<PrintIcon />} variant="contained">Печать</Button>
                <Button startIcon={<DirectionsRunIcon />} variant="contained" color="primary">
                    Выход
                </Button>
            </div>
        </header>
    );
};

export default Header;
