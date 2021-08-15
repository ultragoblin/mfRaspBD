import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { EModalMode, ETabsNaming, TModal } from "../../../pages/Database/Database";
import { useActions } from "../../../hooks/useActions";
import { TAudModal, TGroupModal, TSubjectModal, TTeacherModal } from "../CustomModal";
import { putGroupAdm } from "../../../Redux/actions/data";
import { TAdmGroupList } from "../../../Redux/reducers/data";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    }
  })
);

export type CustomModalButtonsProps = {
  tabNumber: ETabsNaming,
  modal: TModal,
  audModalData: TAudModal,
  groupModalData: TGroupModal,
  subjectModalData: TSubjectModal,
  teacherModalData: TTeacherModal
};

const Buttons = ({ tabNumber, modal, audModalData, groupModalData, subjectModalData, teacherModalData }: CustomModalButtonsProps) => {
  const classes = useStyles();
  const { putSubjectAdm, patchSubjectAdm, putGroupAdm, putTeacherAdm, putAudAdm, patchGroupAdm } = useActions();
  const admLists = useTypedSelector((store) => store.data.admLists);

  const handleClickSave = () => {
    const {mode, id} = modal;
    switch (tabNumber) {
      case ETabsNaming.GROUPS:
        let caf: number = -1;
        let stage: number = -1;

        admLists.data.caf.forEach((cafItem) => {
          if (cafItem.nameshort === groupModalData.caf) {
            caf = cafItem.id;
          }
        })

        admLists.data.stage.forEach((stageItem) => {
          if (stageItem.suffix === groupModalData.grade) {
            stage = stageItem.id;
          }
        })

        let data: TAdmGroupList = {
          startyear: Number(groupModalData.year),
          cafid: caf,
          stageid: stage,
          number: Number(groupModalData.groupNumber)
        }

        console.log(JSON.stringify(data));

        if (mode === EModalMode.ADD) {
          putGroupAdm(data);
        } else {
          if (id) {
            patchGroupAdm(data, id)
          }
        }

        // return mode === EModalMode.ADD ? putGroupAdm(data) : patchGroupAdm(data, id);
        break;
      case ETabsNaming.SUBJECTS:
        return mode === EModalMode.ADD ? putSubjectAdm(subjectModalData) : patchSubjectAdm(subjectModalData)
      default:
        break;
    }
  }

  return (
    <div className={classes.wrapper}>
      <Button color="primary">Отменить</Button>
      <Button onClick={handleClickSave} color="primary">Сохранить</Button>
    </div>
  )
};

export default Buttons;
