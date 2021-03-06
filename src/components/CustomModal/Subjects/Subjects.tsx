import React, { useEffect, useState } from "react";
import { TSubjectModal } from "../CustomModal";
import { EModalMode } from "../../../pages/Database/Database";
import errorLog from "../../../utils/Logs/Error";
import Title from "../Items/Title";
import CustomInput from "../Items/CustomInput";
import { useActions } from "../../../hooks/useActions";

interface SubjectsProps {
  state: TSubjectModal,
  setState: React.Dispatch<React.SetStateAction<TSubjectModal>>,
  mode: EModalMode | null,
}

const Subjects = ({ mode, setState, state }: SubjectsProps) => {
  const [title, setTitle] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(event.target.id);
    switch (event.target.id) {
      case 'subjectInput': {
        setState({ name: event.target.value });
        break;
      }
      case 'subjectShortInput': {
        setState({ nameshort: event.target.value });
        break;
      }
      default:
        break;
    }
    // setState({subject: event?.target.value})
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
      <CustomInput id='subjectShortInput' label='Сокращённое название' stateFun={handleChange}/>
    </>
  )
};

export default Subjects;
