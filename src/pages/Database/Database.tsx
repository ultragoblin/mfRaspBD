import React from "react";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import Faculty from "../../components/Tables/Faculty/Faculty";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const Database = () => {
    const [value, setValue] = React.useState<number>(1);

    return (
        <>
            <CustomTabs tabValue={value} tabFunc={setValue}/>
            <TabPanel index={1} value={value}>
                <Faculty />
            </TabPanel>
            <TabPanel index={2} value={value}>
                kek2
            </TabPanel>
            <TabPanel index={3} value={value}>
                kek3
            </TabPanel>
            <TabPanel index={4} value={value}>
                kek4
            </TabPanel>
            <TabPanel index={5} value={value}>
                kek5
            </TabPanel>
            <TabPanel index={6} value={value}>
                kek6
            </TabPanel>
        </>
    )
}

export default Database;
