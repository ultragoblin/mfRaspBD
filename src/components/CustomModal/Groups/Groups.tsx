import React, {useEffect, useState} from "react";
import Title from "../Items/Title";
import {EModalMode} from "../../../pages/Database/Database";
import errorLog from "../../../utils/Logs/Error";
import CustomAutocomplete from "../Items/CustomAutocomplete";
import {TGroupModal} from "../CustomModal";
import CustomInput from "../Items/CustomInput";
import Result from "../Items/Result";
import Buttons from "../Items/Buttons";
import {calculateRes} from "../../../utils/calculateRes";

export interface GroupsProps {
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

const Groups = ({mode}: GroupsProps) => {
    const [title, setTitle] = useState<string>('');
    const [data, setData] = useState<TGroupModal>({
        caf: '',
        groupNumber: '',
        res: '',
        year: '',
        grade: ''
    });

    const handleSetData = (e: any, options: string[], id: string, fieldValue: any): void => {
        let temp = data;

        if (e.target.value === undefined) {
            temp = {...data, [id]: ''};
            const res: string = calculateRes(temp);
            return setData({...temp, res});
        }

        const value: string = fieldValue;
        const name: string = id;
        temp = {...temp, [name]: value}
        const res: string = calculateRes(temp);
        return setData({...data, [name]: value, res})
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

    useEffect(() => {
        console.table(data);
    }, [data])

    return (
        <>
            <Title text={title}/>
            <CustomAutocomplete id='caf' label='Кафедра' options={cafOptions} stateFun={handleSetData}/>
            <CustomAutocomplete id='year' label='Год поступления' options={yearOptions} stateFun={handleSetData}/>
            <CustomAutocomplete id='grade' label='Уровень обучения' options={gradeOptions} stateFun={handleSetData}/>
            <CustomInput id='groupNumber' label='Номер группы' stateFun={handleSetData}/>
            <Result text={data.res}/>
            <Buttons/>
        </>
    )
};

export default Groups;
