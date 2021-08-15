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
import React, { useEffect, useState } from "react";
import { TDataFac, TDataGroup, TDataSemesters } from "../../Redux/reducers/data";
import {TGetGroupRasp} from "../../utils/api/api";
import {useActions} from "../../hooks/useActions";
import { AppPages } from "../AppWrapper";

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
  },
  caf?: {
    options?: TOptions[],
    val?: TDataFac
  },
  group?: {
    options?: TOptions[],
    val?: TDataGroup
  }
}

export type HeaderProps = {
  setGroupName: React.Dispatch<React.SetStateAction<string>>,
  setPage: () => void
};

const Header = ({setGroupName ,setPage}: HeaderProps) => {
  const {setData} = useActions();
  const fullList = useTypedSelector((store) => store.data.fullList);

  const [raspSelect, setRaspSelect] = useState<TRaspValue>({
    yearOptions: [],
    activeSemester: 1,
  });

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

  const handleFac = (e: any): void => {
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
      }
    })
  }

  const handleRadio = (e: any): void => {
    setRaspSelect(prevState => {
      return {
        ...prevState,
        activeSemester: Number(e.target.value)
      }
    });
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

  const handleCaf = (e: any): void => {
    raspSelect.fac?.val?.cafs.forEach((caf) => {
      if (Number(e.target.value) === caf.caf_name) {
        setRaspSelect(prevState => {
          return {
            ...prevState,
            caf: {
              options: prevState.caf?.options,
              val: caf
            }
          }
        })
      } else {
        return;
      }
    })
  }

  useEffect(() => {
    let cafOp: TOptions[] = [];
    let temp: TOptions;
    raspSelect.fac?.val?.cafs.forEach((caf) => {
      temp = {
        value: String(caf.caf_name),
        placeholder: String(caf.caf_name)
      };

      cafOp.push(temp);
    })

    setRaspSelect(prevState => {
      return {
        ...prevState,
        caf: {
          options: cafOp
        }
      }
    })

  }, [raspSelect.fac])

  const handleGroup = (e: any): void => {
    raspSelect.caf?.val?.groups.forEach((group) => {
      if (group.grp_name === e.target.value) {
        setRaspSelect(prevState => {
          return {
            ...prevState,
            group: {
              options: prevState.group?.options,
              val: group
            }
          }
        })
      } else {
        return;
      }
    })
  };

  useEffect(() => {
    let groupOp: TOptions[] = [];
    let temp: TOptions;
    raspSelect.caf?.val?.groups.forEach((group) => {
      temp = {
        value: group.grp_name,
        placeholder: group.grp_name
      };

      groupOp.push(temp);
    });

    setRaspSelect(prevState => {
      return {
        ...prevState,
        group: {
          options: groupOp
        }
      }
    })

  }, [raspSelect.caf])

  useEffect(() => {
    const {group, caf, fac, year_id, activeSemester} = raspSelect;

    if (group?.val && year_id && activeSemester) {
      const query: TGetGroupRasp = {
        groupID: group.val.grp_id,
        yearID: year_id,
        semester: activeSemester
      }
      setData(query);

      if (fac?.val && caf?.val && group?.val) {
        setGroupName(`${fac.val.fac_name}${caf.val.caf_name}-${group.val.grp_name}`);
      }
    }

  }, [raspSelect.group?.val])

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
        <CustomSelect
          width={selectWidth}
          selectItems={raspSelect.caf?.options}
          stateFunc={handleCaf}
          label={'Кафедра'}
          id={selectsIDs.caf}
        />
        <CustomSelect
          width={selectWidth}
          selectItems={raspSelect.group?.options}
          stateFunc={handleGroup}
          label={'Группа'}
          id={selectsIDs.group}
          />
        <CustomRadio {...radio} handler={handleRadio}/>
      </div>
      <div className={styles.header__buttons}>
        <Button onClick={setPage} startIcon={<StorageIcon/>} variant="contained">База данных</Button>
        {/*<Link to={routing.database}><Button startIcon={<StorageIcon/>} variant="contained">База данных</Button></Link>*/}
        <Button startIcon={<PrintIcon/>} variant="contained" disabled>Печать</Button>
        <Button startIcon={<DirectionsRunIcon/>} variant="contained" color="primary" disabled>
          Выход
        </Button>
      </div>
    </header>
  );
};

export default Header;
