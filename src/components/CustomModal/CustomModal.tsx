import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Modal} from "@material-ui/core";
import Groups from "./Groups/Groups";
import {TModal} from "../../pages/Database/Database";

export interface CustomModalProps {
    modal: TModal,
    api?: string,
    title: string,
    closeFunc: () => void
}

export interface InputsProps {
    id: string,
    label: string,
    stateFun: (e: any, options: string[], id: string, fieldValue: any) => void,
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
    caf: string,
    year: string,
    grade: string,
    groupNumber: string,
    res: string
};

export type TSubjectModal = {
    subject: string
};

export type TTeacherModal = {
    lastName: string,
    firstName: string,
    patronymic: string
}

export type TModalData = TGroupModal | TSubjectModal | TTeacherModal;

const CustomModal = ({api, title, closeFunc, modal}: CustomModalProps) => {
    const classes = useStyles();
    const [modalState, setModalState] = React.useState();

    return (
        <div>
            <Modal
                open={modal.isOpen}
                onClose={closeFunc}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className={classes.paper}>
                    <Groups mode={modal.mode}/>
                </div>
            </Modal>
        </div>
    );
}

export default CustomModal;

