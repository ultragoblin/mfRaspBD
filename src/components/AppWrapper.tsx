import { useActions } from "../hooks/useActions";
import { ReactChildren, useEffect, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import Rasp from "../pages/Rasp/Rasp";
import Database from "../pages/Database/Database";

export interface AppWrapperProps {
  children?: JSX.Element
}

export enum AppPages {
  RASP = 'RASP',
  DATABASE = 'DATABASE'
};

const AppWrapper = ({ children }: AppWrapperProps) => {
  const [page, setPage] = useState<AppPages>(AppPages.RASP);
  const { getFullList, getAdmLists, getTiming } = useActions();
  const fl = useTypedSelector((store) => store.raspData.day)
  const admLists = useTypedSelector((store) => store.data.admLists.data)

  useEffect(() => {
    getFullList();
    getAdmLists();
    getTiming();
  }, [])

  const handleSetPageRasp = (): void => {
    setPage(AppPages.RASP);
  };

  const handleSetPageDatabase = (): void => {
    setPage(AppPages.DATABASE);
  }

  return <>
    {
      (fl && admLists) && <div className='KekApp'>
        {page === AppPages.RASP ? <Rasp setPage={handleSetPageDatabase}/> : <Database setPage={handleSetPageRasp}/>}
      </div>
    }
  </>
};

export default AppWrapper;
