import React, { useEffect } from "react";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// import IconButton from "@material-ui/core/IconButton";
// import AddCircleIcon from '@material-ui/icons/AddCircle';
import "./Database.scss";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import Groups, { GroupsData } from "../../components/Tables/Groups/Groups";
import CustomModal, { TAudModal, TGroupModal, TSubjectModal, TTeacherModal } from "../../components/CustomModal/CustomModal";
import Subjects, { SubjectsData } from "../../components/Tables/Subjects/Subjects";
import Schedule from "../../components/Tables/Schedule/Schedule";
import Teachers, { TeachersData } from "../../components/Tables/Teachers/Teachers";
import Auds, { AudData } from "../../components/Tables/Auds/Auds";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { TAdmGroupList, TDataSemesters } from "../../Redux/reducers/data";
import { useActions } from "../../hooks/useActions";

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
  mode: EModalMode | null,
  id?: number
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

export type DatabaseProps = {
  setPage: () => void
};

const Database = ({ setPage }: DatabaseProps) => {
  const admLists = useTypedSelector((store) => store.data.admLists);
  const { getAdmLists } = useActions();
  const [groupsDataRows, setGroupsDataRows] = React.useState<GroupsData[]>([]);
  const [subjectsDataRows, setSubjectsDataRows] = React.useState<SubjectsData[]>([]);
  const [teachersDataRows, setTeachersDataRows] = React.useState<TeachersData[]>([]);

  const [audDataRows, setAudDataRows] = React.useState<AudData[]>([]);
  const [groupModalData, setGroupModalData] = React.useState<TGroupModal>({
    caf: '',
    groupNumber: '',
    res: '',
    year: '',
    grade: ''
  });
  const [subjectModalData, setSubjectModalData] = React.useState<TSubjectModal>({
    subject: '',
  });
  const [teacherModalData, setTeacherModalData] = React.useState<TTeacherModal>({
    patronymic: '',
    firstName: '',
    lastName: ''
  });


  const [audModalData, setAudModalData] = React.useState<TAudModal>({
    aud: 0
  });
  const { ADD, CHANGE } = EModalMode;
  const [modal, setModal] = React.useState<TModal>({
    isOpen: false,
    mode: null,
  });
  const [value, setValue] = React.useState<ETabsNaming>(ETabsNaming.GROUPS);

  useEffect(() => {
    getAdmLists();
    console.log('fetching')
  }, [])

  useEffect(() => {
    admLists.data.group.forEach((groupItem) => {
      setGroupsDataRows(prevState => {
        if (groupItem.id && groupItem.name) {
          let cafName = groupItem.name.split('-')[0];
          let group: GroupsData;
          group = {
            id: groupItem.id,
            group: groupItem.name,
            caf: cafName,
            year: groupItem.startyear,
          };

          return [...prevState, group];
        }

        return [...prevState]
      })
    })

    admLists.data.subject.val.forEach((subjectItem) => {
      setSubjectsDataRows(prevState => {
        let subject: SubjectsData = {
          subject: subjectItem.name,
          id: subjectItem.id
        };

        return [...prevState, subject];
      })
    })

    admLists.data.teacher.val.forEach((teacherItem) => {
      setTeachersDataRows(prevState => {
        let teacher: TeachersData = {
          teacher: teacherItem.name,
          id: teacherItem.id
        };

        return [...prevState, teacher];
      })
    })

    admLists.data.aud.val.forEach((audItem) => {

      setAudDataRows(prevState => {
        let aud: AudData = {
          aud: audItem.name,
          id: audItem.id
        };
        return [...prevState, aud];
      })
    })
  }, [admLists.data])

  const handleModalAdd = (): void => {
    setModal({
      isOpen: true,
      mode: ADD
    });
  }

  const handleModalChange = (id: number): void => {
    setModal({
      isOpen: true,
      mode: CHANGE,
      id: id
    });
  }

  const handleModalClose = (): void => {
    setModal({
      isOpen: false,
      mode: null
    });
  }

  return (
    admLists.data ? <>
      <CustomTabs setPage={setPage} tabValue={value} tabFunc={setValue}/>

      <div className="wrapper">
        {/*<TabPanel index={ETabsNaming.SCHEDULE} value={value}>*/}
        {/*  <Schedule/>*/}
        {/*</TabPanel>*/}
        <TabPanel index={ETabsNaming.GROUPS} value={value}>
          {groupsDataRows.length > 0 && <Groups
              openModalChange={handleModalChange}
              groupsDataRows={groupsDataRows}
              setGroupsDataRows={setGroupsDataRows}
          />}
        </TabPanel>
        <TabPanel index={ETabsNaming.SUBJECTS} value={value}>
          {teachersDataRows.length > 0 && <Subjects
              subjectsDataRows={subjectsDataRows}
              setSubjectDataRows={setSubjectsDataRows}
          />}
        </TabPanel>
        <TabPanel index={ETabsNaming.TEACHERS} value={value}>
          {teachersDataRows.length > 0 && <Teachers
              teachersDataRows={teachersDataRows}
              setTeachersDataRows={setTeachersDataRows}
          />}
        </TabPanel>
        <TabPanel index={ETabsNaming.AUDS} value={value}>
          {audDataRows.length > 0 && <Auds
              audDataRows={audDataRows}
              setAudDataRows={setAudDataRows}
          />}
        </TabPanel>
      </div>

      {/* <IconButton disabled={modal.isOpen} onClick={handleModalAdd} style={{ padding: 0 }}>
        <AddCircleIcon style={{ color: '#2196F3', width: 56, height: 56 }}/>
      </IconButton> */}

      <Fab color="primary" aria-label="add" disabled={modal.isOpen} onClick={handleModalAdd}
           style={{ position: "fixed", bottom: "50px", right: "50px" }}>
        <AddIcon/>
      </Fab>

      <CustomModal
        tabNumber={value}
        modal={modal}
        closeFunc={handleModalClose}
        groupModalData={groupModalData}
        setGroupModalData={setGroupModalData}
        subjectModalData={subjectModalData}
        setSubjectModalData={setSubjectModalData}
        teacherModalData={teacherModalData}
        setTeacherModalData={setTeacherModalData}
        audModalData={audModalData}
        setAudModalData={setAudModalData}
      />
    </> : <div className="Spinner">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Database;
