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
import { TDataFac, TDataSemesters } from "../../Redux/reducers/data";

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
  yearOptions: TOptions[],
  activeSemester: number,
  semester?: TDataSemesters[],
  year?: number,
  year_id?: number,
  fac?: {
    options?: TOptions[],
    val?: TDataSemesters
  }
}

const Header = () => {

  const fullList = useTypedSelector((store) => store.data.fullList);

  const [raspSelect, setRaspSelect] = useState<TRaspValue>({
    yearOptions: [],
    activeSemester: 1,
  });

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
        yearOptions: yearOp
      }
    })
  }, [])

  const handleYearSelect = (e: any): void => {
    fullList.data.forEach((dataItem) => {
      if (Number(e.target.value) === dataItem.year) {
        return setRaspSelect(prevState => {
          return {
            ...prevState,
            semester: dataItem.semesters["1"],
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
        activeSemester: Number(e.target.value)
      }
    });
  }

  const handleFac = (e: any) => {
    raspSelect.semester?.forEach((fac) => {
      if (fac.fac_name === e.target.value) {
        setRaspSelect(prevState => {
          return {
            ...prevState,
            fac: {
              options: prevState.fac?.options,
              val: fac
            }
          }
        })
      } else {
        return
      }
    })
  }

  useEffect(() => {
    fullList.data.forEach((year) => {
      if (raspSelect.year === year.year) {
        switch (raspSelect.activeSemester) {
          case 1:
            setRaspSelect(prevState => {
              return {
                ...prevState,
                semester: year.semesters["1"]
              }
            })
            break;
          case 2:
            setRaspSelect(prevState => {
              return {
                ...prevState,
                semester: year.semesters["2"]
              }
            })
            break;
          default:
            break;
        }
      }
    })

  }, [raspSelect.activeSemester, raspSelect.year])

  useEffect(() => {
    let facOp: TOptions[] = [];
    let temp: TOptions;
    raspSelect.semester?.forEach((fac) => {
      temp = {
        value: fac.fac_name,
        placeholder: fac.fac_name
      };

      facOp.push(temp);
    });

    setRaspSelect(prevState => {
      return {
        ...prevState,
        fac: {
          options: facOp
        }
      }
    });

  }, [raspSelect.semester])

  useEffect(() => {
    console.log('active fac >>> ', raspSelect.fac?.options);
  }, [raspSelect.fac])

  return (
    <header className={styles.header}>
      <div className={styles.header__form}>
        <CustomSelect
          width={selectWidth}
          stateFunc={handleYearSelect}
          selectItems={raspSelect.yearOptions}
          label={'Учебный год'}
          id={selectsIDs.year}
        />
        <CustomSelect
          width={selectWidth}
          selectItems={raspSelect.fac?.options}
          stateFunc={handleFac}
          label={'Факультет'}
          id={selectsIDs.fac}
        />
        <CustomRadio {...radio} handler={handleRadio}/>
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
