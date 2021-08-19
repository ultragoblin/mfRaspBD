import CustomSelect, {CustomSelectInterface} from "../CustomSelect/CustomSelect";
import {Link} from "react-router-dom";
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import PrintIcon from '@material-ui/icons/Print';
import StorageIcon from '@material-ui/icons/Storage';
import Button from "@material-ui/core/Button";
import styles from "./Header.module.css";
import CustomRadio, {radioType} from "../CustomRadio/CustomRadio";
import routing from "../../utils/path/routing";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import React, {useEffect, useState} from "react";
import {TAdmCafList, TAdmGroupList, TDataCaf, TDataGroup, TDataSemesters, TFacList} from "../../Redux/reducers/data";
import {useActions} from "../../hooks/useActions";
import {AppPages} from "../AppWrapper";
import {TGroupInfo} from "../../Redux/reducers/raspData";

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
    year: number,
    year_id?: number,
    fac?: {
        options?: TOptions[],
        val?: TFacList
    },
    caf?: {
        options?: TOptions[],
        val?: TAdmCafList
    },
    group?: {
        options?: TOptions[],
        val?: TAdmGroupList
    }
}

export type HeaderProps = {
    setGroupName: React.Dispatch<React.SetStateAction<string>>,
    setPage: () => void
};

const Header = ({setGroupName, setPage}: HeaderProps) => {
    const {setGroupInfo} = useActions();
    const admList = useTypedSelector((store) => store.data.admLists.data);
    const fullList = useTypedSelector((store) => store.data.fullList);

    const [raspSelect, setRaspSelect] = useState<TRaspValue>({
        yearOptions: [],
        activeSemester: 1,
        year: 0
    });

    const handleYearSelect = (e: any): void => {

        admList.year.forEach((year) => {
            if (Number(e.target.value) === year.id) {
                setRaspSelect(prevState => {
                    return {
                        ...prevState,
                        year: year.year,
                        year_id: year.id
                    }
                })
            }
        })
    }

    useEffect(() => {
        let yearOp: TOptions[] = [];
        let facOp: TOptions[] = [];
        let temp: TOptions;
        let tempFacOption: TOptions;

        admList.year.forEach((year) => {
            temp = {
                value: String(year.id),
                placeholder: String(year.year)
            }

            yearOp.push(temp);
        })

        admList.fac.forEach((fac) => {
            tempFacOption = {
                value: String(fac.id),
                placeholder: fac.name
            }

            facOp.push(tempFacOption);
        })

        setRaspSelect(prevState => {
            return {
                ...prevState,
                yearOptions: yearOp,
                fac: {
                    options: facOp
                }
            }
        })
    }, [admList.year])

    const handleFac = (e: any): void => {
        admList.fac.forEach((fac) => {
            if (fac.id === Number(e.target.value)) {
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

    // useEffect(() => {
    //   fullList.data.forEach((year) => {
    //     if (raspSelect.year === year.year) {
    //       switch (raspSelect.activeSemester) {
    //         case 1:
    //           setRaspSelect(prevState => {
    //             return {
    //               ...prevState,
    //               semester: year.semesters["1"]
    //             }
    //           })
    //           break;
    //         case 2:
    //           setRaspSelect(prevState => {
    //             return {
    //               ...prevState,
    //               semester: year.semesters["2"]
    //             }
    //           })
    //           break;
    //         default:
    //           break;
    //       }
    //     }
    //   })
    //
    // }, [raspSelect.activeSemester, raspSelect.year])

    useEffect(() => {
        // Занулить все и чекнуть старт года обучения ???
    }, [raspSelect.activeSemester])

    useEffect(() => {
        let cafOp: TOptions[] = [];
        let temp: TOptions;

        if (raspSelect.fac?.val) {
            admList.caf.forEach((caf) => {
                if (caf.facultyid === raspSelect.fac?.val?.id) {
                    temp = {
                        value: String(caf.id),
                        placeholder: String(caf.number)
                    };

                    cafOp.push(temp);
                }
            })

            setRaspSelect(prevState => {
                return {
                    ...prevState,
                    caf: {
                        options: cafOp
                    }
                }
            })
        }

    }, [raspSelect.fac])

    const handleCaf = (e: any): void => {
        admList.caf.forEach((caf) => {
            if (Number(e.target.value) === caf.id) {
                setRaspSelect(prevState => {
                    return {
                        ...prevState,
                        caf: {
                            options: prevState.caf?.options,
                            val: caf
                        }
                    }
                })
            }
        })
    }

    useEffect(() => {
        let groupOp: TOptions[] = [];
        let temp: TOptions;

        admList.group.forEach((group) => {
            if (group.cafid === raspSelect.caf?.val?.id && group.startyear === raspSelect.year && group.name) {
                temp = {
                    value: String(group.id),
                    placeholder: group.name.split('-')[1]
                };

                groupOp.push(temp);
            }
        })

        setRaspSelect(prevState => {
            return {
                ...prevState,
                group: {
                    options: groupOp
                }
            }
        })

    }, [raspSelect.caf])

    const handleGroup = (e: any): void => {

        admList.group.forEach((group) => {
            if (group.id === Number(e.target.value)) {
                setRaspSelect(prevState => {
                    return {
                        ...prevState,
                        group: {
                            options: prevState.group?.options,
                            val: group
                        }
                    }
                })
            }
        })
    };

    useEffect(() => {
        const {group, year_id, activeSemester} = raspSelect;

        if (group?.val?.id && year_id && activeSemester) {

            const query: TGroupInfo = {
                group: group.val.id,
                year: year_id,
                semester: activeSemester
            }
            setGroupInfo(query);

            if (group?.val.name) {
                setGroupName(group.val.name);
            }
        }

    }, [raspSelect.group?.val, raspSelect.activeSemester])

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
