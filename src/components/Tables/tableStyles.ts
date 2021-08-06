import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useTableBodyStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 1400,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    changeBtn: {
      color: '#2196F3',
      cursor: 'pointer'
    }
  }),
);

const useTableHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      backgroundColor: '#F0F0F0'
    },
    deleteCell: {
      position: 'relative',
      zIndex: 2
    },
    deleteBtn: {
      position: 'absolute',
      top: 5,
      right: 15
    }
  })
);

export {
  useTableBodyStyles,
  useTableHeaderStyles
};
