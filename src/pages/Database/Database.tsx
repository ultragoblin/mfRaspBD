import React, { useEffect } from "react";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// import IconButton from "@material-ui/core/IconButton";
// import AddCircleIcon from '@material-ui/icons/AddCircle';
import "./Database.scss";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import Groups, { GroupsData } from "../../components/Tables/Groups/Groups";
import CustomModal from "../../components/CustomModal/CustomModal";
import Subjects from "../../components/Tables/Subjects/Subjects";
import Schedule from "../../components/Tables/Schedule/Schedule";
import Teachers from "../../components/Tables/Teachers/Teachers";
import Auds from "../../components/Tables/Auds/Auds";
import { useTypedSelector } from "../../hooks/useTypedSelector";

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
  const [groupsDataRows, setGroupsDataRows] = React.useState<GroupsData[]>([]);
  const fullList = useTypedSelector((store) => store.data.fullList);
  const { ADD, CHANGE } = EModalMode;
  const [modal, setModal] = React.useState<TModal>({
    isOpen: false,
    mode: null
  });
  const [value, setValue] = React.useState<ETabsNaming>(ETabsNaming.GROUPS);

  useEffect(() => {
    fullList.data.forEach((item) => {
      let group: GroupsData;
      item.semesters["1"].forEach((semesterItem) => {
        semesterItem.cafs.forEach((cafItem) => {
          cafItem.groups.forEach((groupsItem) => {
            group = {
              caf: semesterItem.fac_name + cafItem.caf_name,
              group: semesterItem.fac_name + cafItem.caf_name + '-' + groupsItem.grp_name,
              id: groupsItem.grp_id,
              year: item.year
            }
            setGroupsDataRows(prevState => {
              return [...prevState, group]
            })
          })
        })
      })
    })
  }, [fullList.data])

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
    fullList.data.length > 0 ? <>
      <CustomTabs tabValue={value} tabFunc={setValue}/>

      <div className="wrapper">
        {/*<TabPanel index={ETabsNaming.SCHEDULE} value={value}>*/}
        {/*  <Schedule/>*/}
        {/*</TabPanel>*/}
        <TabPanel index={ETabsNaming.GROUPS} value={value}>
          <Groups groupsDataRows={groupsDataRows} setGroupsDataRows={setGroupsDataRows}/>
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
    </> : <div className="Spinner">
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default Database;
