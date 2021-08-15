import React, { useEffect, useState } from "react";
import Title from "../Items/Title";
import { EModalMode } from "../../../pages/Database/Database";
import errorLog from "../../../utils/Logs/Error";
import CustomAutocomplete from "../Items/CustomAutocomplete";
import { TGroupModal } from "../CustomModal";
import CustomInput from "../Items/CustomInput";
import { calculateRes } from "../../../utils/calculateRes";
import Result from "../Items/Result";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

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
  '2021',
  '2020',
];

export const gradeOptions: string[] = [
  'Бакалавриат',
  'Аспирантура',
  'Магистратура',
  'Специалитет'
];

export type TGroupsModalOptions = {
  caf: string[],
  year: string[],
  grade: string[]
};

const Groups = ({ mode, state, setState }: GroupsProps) => {
  const admLists = useTypedSelector((store) => store.data.admLists.data);
  const [title, setTitle] = useState<string>('');
  const [options, setOptions] = useState<TGroupsModalOptions>({
    caf: [],
    grade: [],
    year: yearOptions
  });

  const handleSetData = (e: any, id: string, fieldValue: any, options?: string[]): void => {
    let temp = state;

    if (e.target.value === undefined) {
      temp = { ...state, [id]: '' };
      const res: string = calculateRes(temp);
      return setState({ ...temp, res });
    }

    const value: string = fieldValue ? fieldValue : e?.target?.value;
    const name: string = id;
    temp = { ...temp, [name]: value }
    const res: string = calculateRes(temp);
    return setState({ ...state, [name]: value, res })
  };

  useEffect(() => {
    admLists.caf.forEach((cafItem) => {
      setOptions(prevState => {
        return {
          ...prevState,
          caf: [...prevState.caf, cafItem?.nameshort]
        }
      })
    })

    admLists.stage.forEach((stageItem) => {
      setOptions(prevState => {
        return {
          ...prevState,
          grade: [...prevState.grade, stageItem.suffix]
        }
      })
    })


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
      <CustomAutocomplete id='caf' label='Кафедра' options={options.caf} stateFun={handleSetData}/>
      <CustomAutocomplete id='year' label='Год поступления' options={options.year} stateFun={handleSetData}/>
      <CustomAutocomplete id='grade' label='Уровень обучения' options={options.grade} stateFun={handleSetData}/>
      <CustomInput id='groupNumber' label='Номер группы' stateFun={handleSetData}/>
      <Result text={state.res}/>
    </>
  )
};

export default Groups;
