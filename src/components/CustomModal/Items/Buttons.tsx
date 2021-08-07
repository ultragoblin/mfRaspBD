import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    }
  })
);

const Buttons = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Button color="primary">Отменить</Button>
      <Button color="primary">Сохранить</Button>
    </div>
  )
};

export default Buttons;
