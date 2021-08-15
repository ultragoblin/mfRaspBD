import React from 'react';
import {Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styles from './CustomTabs.module.scss';
import routing from "../../utils/path/routing";

export interface CustomTabsProps {
    tabValue: number,
    tabFunc: React.Dispatch<React.SetStateAction<number>>,
    setPage: () => void
}

const CustomTabs = ({tabValue, tabFunc, setPage}: CustomTabsProps) => {
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        tabFunc(newValue);
    };

    return (
        <header>
            <Paper className={styles.paper}>
                <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="full width tabs example"
                    className={styles.tabs}
                >
                    <p onClick={setPage} className={styles.arrow}><img src="/arrow-back.svg" alt=""/></p>
                    {/*<Tab label="Расписание"/>*/}
                    <Tab label="Группы"/>
                    <Tab label="Предметы"/>
                    <Tab label="Преподаватели"/>
                    <Tab label="Аудитории"/>
                </Tabs>
            </Paper>
        </header>
    );
}

export default CustomTabs;
