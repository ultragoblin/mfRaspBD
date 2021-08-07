import {useActions} from "../hooks/useActions";
import {ReactChildren, useEffect} from "react";

export interface AppWrapperProps {
    children: JSX.Element
}

const AppWrapper = ({children}: AppWrapperProps) => {
    const { getFullList } = useActions();

    useEffect(() => {
        getFullList();
    }, [])

    return <>
        {children}
    </>
};

export default AppWrapper;
