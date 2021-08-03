import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import Groups from "../../components/Tables/Groups/Groups";
import CustomModal from "../../components/CustomModal/CustomModal";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
};

export enum ETabsNaming {
  SCHEDULE,
  GROUPS,
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
      <TabPanel index={1} value={value}>
        <Groups/>
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
      <IconButton disabled={modal.isOpen} onClick={handleModalAdd} style={{ padding: 0 }}>
        <AddCircleIcon style={{ color: '#2196F3', width: 56, height: 56 }}/>
      </IconButton>
      <CustomModal tabNumber={value} modal={modal} closeFunc={handleModalClose}/>
    </>
  )
}

export default Database;
