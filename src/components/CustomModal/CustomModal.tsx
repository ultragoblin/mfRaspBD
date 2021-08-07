import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Modal } from "@material-ui/core";
import Groups from "./Groups/Groups";
import { ETabsNaming, TModal } from "../../pages/Database/Database";
import Auds from "../Tables/Auds/Auds";
import Schedule from "./Schedule/Schedule";
import Subjects from "./Subjects/Subjects";
import Buttons from "./Items/Buttons";

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
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
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
}

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

  const switchModals = (): JSX.Element => {
    switch (tabNumber) {
      case ETabsNaming.SCHEDULE:
        return <Schedule/>;
      case ETabsNaming.GROUPS:
        return <Groups state={groupModalData} setState={setGroupModalData} mode={modal.mode}/>;
      case ETabsNaming.SUBJECTS:
        return <Subjects state={subjectModalData} setState={setSubjectModalData} mode={modal.mode}/>;
      case ETabsNaming.TEACHERS:
        // return <Teachers/>;
      case ETabsNaming.AUDS:
        return <Auds/>;
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
          </div>
          <Buttons/>
        </>
      </Modal>
    </div>
  );
}

export default CustomModal;

