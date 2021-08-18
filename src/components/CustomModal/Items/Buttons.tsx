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
  const { putSubjectAdm, patchSubjectAdm, putGroupAdm, putTeacherAdm, putAudAdm, patchGroupAdm, patchTeacherAdm, patchAudAdm } = useActions();
  const admLists = useTypedSelector((store) => store.data.admLists);

  const handleClickSave = () => {
    const { mode, id } = modal;
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
          cafid: caf,
          // name: groupModalData.res,
          number: Number(groupModalData.groupNumber),
          stageid: stage,
          startyear: Number(groupModalData.year)
        }

        if (mode === EModalMode.ADD) {
          console.log(data);
          if (data.number && data.stageid && data.cafid && data.startyear) {
            putGroupAdm(data);
          } else {
            alert('Заполните все данные!')
          }
        } else {
          if (id) {
            patchGroupAdm(data, id)
          }
        }

        // return mode === EModalMode.ADD ? putGroupAdm(data) : patchGroupAdm(data, id);
        break;
      case ETabsNaming.SUBJECTS:
        return mode === EModalMode.ADD ? putSubjectAdm(subjectModalData) : patchSubjectAdm(subjectModalData);
      case ETabsNaming.TEACHERS:
        return mode === EModalMode.ADD ? putTeacherAdm(teacherModalData) : patchTeacherAdm(teacherModalData);
      case ETabsNaming.AUDS:
        return mode === EModalMode.ADD ? putAudAdm(audModalData) : patchAudAdm(audModalData);
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
