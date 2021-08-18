import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Modal } from "@material-ui/core";
import Groups from "./Groups/Groups";
import { ETabsNaming, TModal } from "../../pages/Database/Database";
import Schedule from "./Schedule/Schedule";
import Subjects from "./Subjects/Subjects";
import Buttons from "./Items/Buttons";
import Teacher from "./Teacher/Teacher";
import Auds from "./Auds/Auds";

export interface InputsProps {
  id: string,
  label: string,
  stateFun: (e: any, id: string, fieldValue: any) => void,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      position: 'absolute',
      width: 600,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[4],
      padding: theme.spacing(3, 4),
    },
  }),
);

export type TGroupModal = {
  caf?: string,
  year?: string,
  grade?: string,
  groupNumber?: string,
  res: string
};

export type TSubjectModal = {
  name?: string,
  nameshort?: string
};

export type TTeacherModal = {
  fname?: string,
  lname?: string
  sname?: string,
};

export type TAudModal = {
  name?: string
};

export interface CustomModalProps {
  tabNumber: ETabsNaming,
  modal: TModal,
  closeFunc: () => void,

  groupModalData: TGroupModal,
  setGroupModalData: React.Dispatch<React.SetStateAction<TGroupModal>>,

  subjectModalData: TSubjectModal,
  setSubjectModalData: React.Dispatch<React.SetStateAction<TSubjectModal>>,

  teacherModalData: TTeacherModal,
  setTeacherModalData: React.Dispatch<React.SetStateAction<TTeacherModal>>,

  audModalData: TAudModal,
  setAudModalData: React.Dispatch<React.SetStateAction<TAudModal>>,
}

const CustomModal = ({
                       tabNumber,
                       closeFunc,
                       modal,
                       audModalData,
                       groupModalData,
                       setAudModalData,
                       setGroupModalData,
                       setSubjectModalData,
                       setTeacherModalData,
                       subjectModalData,
                       teacherModalData
                     }: CustomModalProps) => {
  const classes = useStyles();

  const switchModals = (): JSX.Element => {
    switch (tabNumber) {
      // case ETabsNaming.SCHEDULE:
      //   return <Schedule/>;
      case ETabsNaming.GROUPS:
        return <Groups state={groupModalData} setState={setGroupModalData} mode={modal.mode}/>;
      case ETabsNaming.SUBJECTS:
        return <Subjects state={subjectModalData} setState={setSubjectModalData} mode={modal.mode}/>;
      case ETabsNaming.TEACHERS:
        return <Teacher state={teacherModalData} setState={setTeacherModalData} mode={modal.mode}/>;
      case ETabsNaming.AUDS:
        return <Auds state={audModalData} setState={setAudModalData} mode={modal.mode}/>;
      default:
        break;
    }

    return <div>empty</div>
  }

  return (
    <div>
      <Modal
        open={modal.isOpen}
        onClose={closeFunc}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <>
          <div className={classes.paper}>
            {switchModals()}
            <Buttons
              audModalData={audModalData}
              teacherModalData={teacherModalData}
              subjectModalData={subjectModalData}
              groupModalData={groupModalData}
              modal={modal}
              tabNumber={tabNumber}
            />
          </div>
        </>
      </Modal>
    </div>
  );
}

export default CustomModal;

