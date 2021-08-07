import CustomSelect, { CustomSelectInterface } from "../CustomSelect/CustomSelect";
import { Link } from "react-router-dom";
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import PrintIcon from '@material-ui/icons/Print';
import StorageIcon from '@material-ui/icons/Storage';
import Button from "@material-ui/core/Button";
import styles from "./Header.module.scss";
import CustomRadio, { radioType } from "../CustomRadio/CustomRadio";
import routing from "../../utils/path/routing";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useEffect, useState } from "react";

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

const radio: radioType = {
  handler(e: any): void {
    console.log('kek')
  },
  value: {
    first: '1 семестр',
    second: '2 семестр'
  },
  label: {
    first: '1',
    second: '2'
  }
}

type TYearOptionsValue = {
  year: number,
  year_id: number
}

type TOptions = {
  value: string,
  placeholder: string
}

const Header = () => {
  const fullList = useTypedSelector((store) => store.data);
  const [yearOptions, setYearOptions] = useState<TOptions[]>([]);
  let kek = {
    label: 'id__label_year',
    select: 'id__select_year'
  }
  useEffect(() => {
    let yearOp: TOptions[] = [];
    let temp: TOptions;
    fullList?.fullList?.data.forEach((year) => {
      temp = {
        value: String(year.year),
        placeholder: String(year.year)
      }
      yearOp.push(temp)
    })
    setYearOptions(yearOp);
  }, [])

  return (
    <header className={styles.header}>
      <div className={styles.header__form}>
        <CustomSelect width={selectWidth} selectItems={yearOptions} label={'Учебный год'} id={kek}/>
        {/*{*/}
        {/*    selects.map((select) => <CustomSelect*/}
        {/*        key={select.label}*/}
        {/*        width={select.width}*/}
        {/*        selectItems={select.selectItems}*/}
        {/*        label={select.label}*/}
        {/*        id={select.id}*/}
        {/*    />)*/}
        {/*}*/}
        <CustomRadio {...radio}/>
      </div>
      <div className={styles.header__buttons}>
        <Link to={routing.database}><Button startIcon={<StorageIcon/>} variant="contained">База данных</Button></Link>
        <Button startIcon={<PrintIcon/>} variant="contained">Печать</Button>
        <Button style={{ backgroundColor: '#007DFF' }} startIcon={<DirectionsRunIcon/>} variant="contained" color="primary">
          Выход
        </Button>
      </div>
    </header>
  );
};

export default Header;
