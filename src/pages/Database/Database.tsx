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
import { TDataSemesters } from "../../Redux/reducers/data";

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


  const admLists = useTypedSelector((store) => store.data.admLists);
  const { ADD, CHANGE } = EModalMode;
  const [modal, setModal] = React.useState<TModal>({
    isOpen: false,
    mode: null
  });
  const [value, setValue] = React.useState<ETabsNaming>(ETabsNaming.GROUPS);

  useEffect(() => {
    console.log(admLists.data.aud)
    // fullList.data.forEach((item) => {
    //   for (let key in item.semesters) {
    //     // @ts-ignore
    //     item.semesters[key].forEach((semesterItem: TDataSemesters) => {
    //       semesterItem.cafs.forEach((cafItem) => {
    //         cafItem.groups.forEach((groupsItem) => {
    //           let group: GroupsData;
    //           group = {
    //             caf: semesterItem.fac_name + cafItem.caf_name,
    //             group: semesterItem.fac_name + cafItem.caf_name + '-' + groupsItem.grp_name,
    //             id: groupsItem.grp_id,
    //             year: item.year
    //           }
    //           setGroupsDataRows(prevState => {
    //             return [...prevState, group]
    //           })
    //         })
    //       })
    //     })
    //   }
    // })

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
    admLists.data ? <>
      <CustomTabs tabValue={value} tabFunc={setValue}/>

      <div className="wrapper">
        {/*<TabPanel index={ETabsNaming.SCHEDULE} value={value}>*/}
        {/*  <Schedule/>*/}
        {/*</TabPanel>*/}
        <TabPanel index={ETabsNaming.GROUPS} value={value}>
          <Groups groupsDataRows={groupsDataRows} setGroupsDataRows={setGroupsDataRows}/>
        </TabPanel>
        <TabPanel index={ETabsNaming.SUBJECTS} value={value}>
          <Subjects subjectsDataRows={subjectsDataRows} setSubjectDataRows={setSubjectsDataRows}/>
        </TabPanel>
        <TabPanel index={ETabsNaming.TEACHERS} value={value}>
          <Teachers teachersDataRows={teachersDataRows} setTeachersDataRows={setTeachersDataRows}/>
        </TabPanel>
        <TabPanel index={ETabsNaming.AUDS} value={value}>
          <Auds audDataRows={audDataRows} setAudDataRows={setAudDataRows}/>
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
