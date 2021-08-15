import React, { useEffect, useState } from "react";
import { EModalMode } from "../../../pages/Database/Database";
import { TAudModal } from "../CustomModal";
import errorLog from "../../../utils/Logs/Error";
import Title from "../Items/Title";
import CustomInput from "../Items/CustomInput";

interface AudProps {
  state: TAudModal,
  setState: React.Dispatch<React.SetStateAction<TAudModal>>,
  mode: EModalMode | null
}

const Auds = ({ state, setState, mode }: AudProps) => {
  const [title, setTitle] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({name: e.target.value});
  };

  useEffect(() => {
    switch (mode) {
      case EModalMode.ADD:
        setTitle('Добавить аудиторию');
        break;
      case EModalMode.CHANGE:
        setTitle('Редактировать аудиторию');
        break;
      default:
        errorLog('Ошибка в модалке аудиторий');
        break;
    }
  }, [])

  return (
    <>
      <Title text={title}/>
      <CustomInput id='audInput' label='Номер аудитории' stateFun={handleChange}/>
    </>
  )
};

export default Auds;
