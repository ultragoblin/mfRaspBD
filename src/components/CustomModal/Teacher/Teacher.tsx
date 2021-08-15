import React, { useEffect, useState } from "react";
import { EModalMode } from "../../../pages/Database/Database";
import { TTeacherModal } from "../CustomModal";
import errorLog from "../../../utils/Logs/Error";
import Title from "../Items/Title";
import CustomInput from "../Items/CustomInput";

interface TeacherProps {
  state: TTeacherModal,
  setState: React.Dispatch<React.SetStateAction<TTeacherModal>>,
  mode: EModalMode | null
}

const Teacher = ({ mode, setState, state }: TeacherProps) => {
  const [title, setTitle] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;

    switch (target.id) {
      case 'teacherInput':
        setState({ sname: target.value });
        break;
      case 'teacherNameInput':
        setState({ fname: target.value });
        break;
      case 'teacherLastnameInput':
        setState({ lname: target.value });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    switch (mode) {
      case EModalMode.ADD:
        setTitle('Добавить преподавателя');
        break;
      case EModalMode.CHANGE:
        setTitle('Редактировать преподавателя');
        break;
      default:
        errorLog('Ошибка в модалке преподавателей');
        break;
    }
  }, [])

  return (
    <>
      <Title text={title}/>
      <CustomInput id='teacherInput' label='Фамилия' stateFun={handleChange}/>
      <CustomInput id='teacherNameInput' label='Имя' stateFun={handleChange}/>
      <CustomInput id='teacherLastnameInput' label='Отчество' stateFun={handleChange}/>
    </>
  )
};

export default Teacher;
