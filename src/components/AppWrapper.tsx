import { useActions } from "../hooks/useActions";
import { ReactChildren, useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";

export interface AppWrapperProps {
  children: JSX.Element
}

const AppWrapper = ({ children }: AppWrapperProps) => {
  const { getFullList, getAdmLists, getTiming } = useActions();
  const fl = useTypedSelector((store) => store.raspData.day)
  const admLists = useTypedSelector((store) => store.data.admLists.data)
  useEffect(() => {
    getFullList();
    getAdmLists();
    getTiming();
  }, [])

  return <>
    {
      (fl && admLists) && children
    }
  </>
};

export default AppWrapper;
