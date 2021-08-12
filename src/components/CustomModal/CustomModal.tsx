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

export interface CustomModalProps {
  tabNumber: ETabsNaming,
  modal: TModal,
  api?: string,
  closeFunc: () => void
}

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
  res?: string
};

export type TSubjectModal = {
  subject?: string
};

export type TTeacherModal = {
  lastName?: string,
  firstName?: string,
  patronymic?: string
};

export type TAudModal = {
  aud?: number
};

const CustomModal = ({ tabNumber, api, closeFunc, modal }: CustomModalProps) => {
  const classes = useStyles();
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

  const switchModals = (): JSX.Element => {
    switch (tabNumber) {
      case ETabsNaming.SCHEDULE:
        return <Schedule/>;
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
            <Buttons/>
          </div>
        </>
      </Modal>
    </div>
  );
}

export default CustomModal;

