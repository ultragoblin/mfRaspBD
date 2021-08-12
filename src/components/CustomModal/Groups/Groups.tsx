import React, {useEffect, useState} from "react";
import Title from "../Items/Title";
import {EModalMode} from "../../../pages/Database/Database";
import errorLog from "../../../utils/Logs/Error";
import CustomAutocomplete from "../Items/CustomAutocomplete";
import {TGroupModal} from "../CustomModal";
import CustomInput from "../Items/CustomInput";
import {calculateRes} from "../../../utils/calculateRes";
import Result from "../Items/Result";

interface GroupsProps {
    state: TGroupModal,
    setState: React.Dispatch<React.SetStateAction<TGroupModal>>,
    mode: EModalMode | null
}

const cafOptions: string[] = [
    'К3',
    'К2'
];

const yearOptions: string[] = [
    '2020',
    '2010',
    '2000'
];

export const gradeOptions: string[] = [
    'Бакалавриат',
    'Аспирантура',
    'Магистратура',
    'Специалитет'
];

const Groups = ({mode, state, setState}: GroupsProps) => {
    const [title, setTitle] = useState<string>('');

    const handleSetData = (e: any, id: string, fieldValue: any, options?: string[]): void => {
        let temp = state;

        if (e.target.value === undefined) {
            temp = {...state, [id]: ''};
            const res: string = calculateRes(temp);
            return setState({...temp, res});
        }

        const value: string = fieldValue ? fieldValue : e?.target?.value;
        const name: string = id;
        temp = {...temp, [name]: value}
        const res: string = calculateRes(temp);
        return setState({...state, [name]: value, res})
    };

    useEffect(() => {
        switch (mode) {
            case EModalMode.ADD:
                setTitle('Добавить группу');
                break;
            case EModalMode.CHANGE:
                setTitle('Редактировать группу');
                break;
            default:
                errorLog('Ошибка в модалке групп');
                break;
        }
    }, [])

    return (
        <>
            <Title text={title}/>
            <CustomAutocomplete id='caf' label='Кафедра' options={cafOptions} stateFun={handleSetData}/>
            <CustomAutocomplete id='year' label='Год поступления' options={yearOptions} stateFun={handleSetData}/>
            <CustomAutocomplete id='grade' label='Уровень обучения' options={gradeOptions} stateFun={handleSetData}/>
            <CustomInput id='groupNumber' label='Номер группы' stateFun={handleSetData}/>
            <Result text={state.res}/>
        </>
    )
};

export default Groups;
