import React, { useEffect, useState } from "react";
import { TSubjectModal } from "../CustomModal";
import { EModalMode } from "../../../pages/Database/Database";
import errorLog from "../../../utils/Logs/Error";
import Title from "../Items/Title";
import CustomInput from "../Items/CustomInput";

interface SubjectsProps {
  state: TSubjectModal,
  setState: React.Dispatch<React.SetStateAction<TSubjectModal>>,
  mode: EModalMode | null
}

const Subjects = ({ mode, setState, state }: SubjectsProps) => {
  const [title, setTitle] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState({subject: event?.target.value})
  };

  useEffect(() => {
    switch (mode) {
      case EModalMode.ADD:
        setTitle('Добавить предмет');
        break;
      case EModalMode.CHANGE:
        setTitle('Редактировать предмет');
        break;
      default:
        errorLog('Ошибка в модалке предметов');
        break;
    }
  }, [])

  return (
    <>
      <Title text={title}/>
      <CustomInput id='subjectInput' label='Название предмета' stateFun={handleChange}/>
    </>
  )
};

export default Subjects;
