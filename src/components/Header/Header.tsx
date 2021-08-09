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
import { TDataSemesters } from "../../Redux/reducers/data";

const selectWidth: number = 167;

const selectsIDs = {
  year: {
    label: 'id__label_year',
    select: 'id__select_year'
  },
  fac: {
    label: 'id__label_fac',
    select: 'id__select_fac'
  },
  caf: {
    label: 'id__label_caf',
    select: 'id__select_caf'
  },
  group: {
    label: 'id__label_group',
    select: 'id__select_group'
  }
};

const radio = {
  value: {
    first: '1',
    second: '2'
  },
  label: {
    first: '1',
    second: '2'
  }
}

export type TOptions = {
  value: string,
  placeholder: string,
}

type TRaspValue = {
  arr: TOptions[],
  semesters: {
    1: TDataSemesters[],
    2: TDataSemesters[]
  },
  year?: number,
  year_id?: number,
  active: number
}

const Header = () => {
  const fullList = useTypedSelector((store) => store.data.fullList);
  const [raspSelect, setRaspSelect] = useState<TRaspValue>({
    semesters: {
      1: [],
      2: []
    },
    arr: [],
    active: 1
  });

  const handleYearSelect = (e: any): void => {

    fullList.data.forEach((dataItem) => {
      if (Number(e.target.value) === dataItem.year) {
        return setRaspSelect(prevState => {
          return {
            ...prevState,
            semesters: dataItem.semesters,
            year: dataItem.year,
            year_id: dataItem.year_id
          }
        })
      } else {
        return;
      }
    })
  }

  const handleRadio = (e: any) => {
    setRaspSelect(prevState => {
      return {
        ...prevState,
        active: Number(e.target.value)
      }
    });
  }

  useEffect(() => {
    console.log('radio >>> ', raspSelect.active)
    switch (raspSelect.active) {
      case 1:
        console.log(fullList.data[0].semesters["1"]);
        break;
      case 2:
        console.log(fullList.data[0].semesters["2"]);
        break;
      default:
        break;
    }
  }, [raspSelect.active])

  useEffect(() => {
    let yearOp: TOptions[] = [];
    let temp: TOptions;
    fullList?.data.forEach((year) => {
      temp = {
        value: String(year.year),
        placeholder: String(year.year)
      }
      yearOp.push(temp)
    })

    setRaspSelect(prevState => {
      return {
        ...prevState,
        arr: yearOp
      }
    })
  }, [])

  return (
    <header className={styles.header}>
      <div className={styles.header__form}>
        <CustomSelect
          width={selectWidth}
          stateFunc={handleYearSelect}
          selectItems={raspSelect.arr}
          label={'Учебный год'}
          id={selectsIDs.year}
        />
        {/*{*/}
        {/*    selects.map((select) => <CustomSelect*/}
        {/*        key={select.label}*/}
        {/*        width={select.width}*/}
        {/*        selectItems={select.selectItems}*/}
        {/*        label={select.label}*/}
        {/*        id={select.id}*/}
        {/*    />)*/}
        {/*}*/}
        <CustomRadio {...radio} handler={handleRadio} />
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
