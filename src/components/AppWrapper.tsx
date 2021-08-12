import {useActions} from "../hooks/useActions";
import {ReactChildren, useEffect} from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";

export interface AppWrapperProps {
    children: JSX.Element
}

const AppWrapper = ({children}: AppWrapperProps) => {
    const { getFullList, getAdmLists } = useActions();
    const fl = useTypedSelector((store) => store.raspData)
    useEffect(() => {
        getFullList();
        getAdmLists();
    }, [])

    return <>
        {children}
    </>
};

export default AppWrapper;
