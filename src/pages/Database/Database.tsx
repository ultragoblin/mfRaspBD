import React from "react";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// import IconButton from "@material-ui/core/IconButton";
// import AddCircleIcon from '@material-ui/icons/AddCircle';
import "./Database.scss";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import Groups from "../../components/Tables/Groups/Groups";
import CustomModal from "../../components/CustomModal/CustomModal";
import Subjects from "../../components/Tables/Subjects/Subjects";
import Schedule from "../../components/Tables/Schedule/Schedule";
import Teachers from "../../components/Tables/Teachers/Teachers";
import Auds from "../../components/Tables/Auds/Auds";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
};

export enum ETabsNaming {
  GROUPS = 1,
  SUBJECTS,
  TEACHERS,
  AUDS
};

export enum EModalMode {
  ADD,
  CHANGE
};

export type TModal = {
  isOpen: boolean,
  mode: EModalMode | null
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>{children}</>
      )}
    </div>
  );
}

const Database = () => {
  const { ADD, CHANGE } = EModalMode;
  const [modal, setModal] = React.useState<TModal>({
    isOpen: false,
    mode: null
  });
  const [value, setValue] = React.useState<ETabsNaming>(ETabsNaming.GROUPS);

  const handleModalAdd = (): void => {
    setModal({
      isOpen: true,
      mode: ADD
    });
  }

  const handleModalChange = (): void => {
    setModal({
      isOpen: true,
      mode: CHANGE
    });
  }

  const handleModalClose = (): void => {
    setModal({
      isOpen: false,
      mode: null
    });
  }

  return (
    <>
      <CustomTabs tabValue={value} tabFunc={setValue}/>

      <div className="wrapper">
        {/*<TabPanel index={ETabsNaming.SCHEDULE} value={value}>*/}
        {/*  <Schedule/>*/}
        {/*</TabPanel>*/}
        <TabPanel index={ETabsNaming.GROUPS} value={value}>
          <Groups/>
        </TabPanel>
        <TabPanel index={ETabsNaming.SUBJECTS} value={value}>
          <Subjects/>
        </TabPanel>
        <TabPanel index={ETabsNaming.TEACHERS} value={value}>
          <Teachers/>
        </TabPanel>
        <TabPanel index={ETabsNaming.AUDS} value={value}>
          <Auds/>
        </TabPanel>
      </div>
      
      {/* <IconButton disabled={modal.isOpen} onClick={handleModalAdd} style={{ padding: 0 }}>
        <AddCircleIcon style={{ color: '#2196F3', width: 56, height: 56 }}/>
      </IconButton> */}

      <Fab color="primary" aria-label="add" disabled={modal.isOpen} onClick={handleModalAdd} style={{ position: "fixed", bottom: "50px", right: "50px" }}>
        <AddIcon />
      </Fab>

      <CustomModal tabNumber={value} modal={modal} closeFunc={handleModalClose}/>
    </>
  )
}

export default Database;
