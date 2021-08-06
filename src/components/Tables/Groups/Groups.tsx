import React, { useEffect, useState } from "react";
import { createStyles, lighten, makeStyles, Theme, } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { TablePagination } from "@material-ui/core";
import Searcher from "../../Searcher/Searcher";
import nullClearer from "../../../utils/nullClearer";

interface GroupsData {
  id: number,
  group: string,
  caf: string,
  year: number
}

function createGroupData(
  id: number,
  group: string,
  caf: string,
  year: number
): GroupsData {
  return { id, group, caf, year };
}

const useStyles = makeStyles((theme: Theme) =>
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

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
    title: {},
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

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  id: keyof GroupsData;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: "group", numeric: false, label: 'Группа' },
  { id: 'caf', numeric: false, label: 'Кафедра' },
  { id: 'year', numeric: false, label: 'Год поступления' },
];

const rows = [
  createGroupData(1, 'К1-73Б', 'К3', 2010),
  createGroupData(2, 'К1-73Б', 'К1', 2010),
  createGroupData(3, 'К333-23Б', 'К2', 2010),
  createGroupData(4, 'К122-73Б', 'К3', 20101),
  createGroupData(5, 'К6-73Б', 'К3', 2010),
  createGroupData(6, 'К7-26Б', 'К1', 2010),
  createGroupData(7, 'К39-23Б', 'К2', 2010),
  createGroupData(8, 'К32-73Б', 'К3', 20101),
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof GroupsData) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const classes = useTableHeaderStyles();
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof GroupsData) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={classes.header}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell, index) => {

          return <TableCell
            style={{ padding: '23px 0 17px 0' }}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        })}
        <TableCell className={classes.deleteCell}>
          <IconButton className={classes.deleteBtn}>
            <DeleteOutlinedIcon/>
          </IconButton>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  searcherState: string,
  searcherSet: React.Dispatch<React.SetStateAction<string>>
}

const EnhancedTableToolbar = ({ searcherSet, searcherState, numSelected }: EnhancedTableToolbarProps) => {
  // const classes = useToolbarStyles();

  const handleSearcherChange = (e: any): void => {
    searcherSet(e.target.value);
  }

  return (
    <>
      <Searcher state={searcherState} setState={handleSearcherChange}/>
      {/*<Toolbar*/}
      {/*    className={clsx(classes.root, {*/}
      {/*        [classes.highlight]: numSelected > 0,*/}
      {/*    })}*/}
      {/*>*/}
      {/*    {numSelected > 0 ? (*/}
      {/*        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">*/}
      {/*            {numSelected} Выбрано*/}
      {/*        </Typography>*/}
      {/*    ) : null}*/}
      {/*    {numSelected > 0 ? (*/}
      {/*        <Tooltip title="Delete">*/}
      {/*            <IconButton aria-label="delete">*/}
      {/*                <DeleteIcon/>*/}
      {/*            </IconButton>*/}
      {/*        </Tooltip>*/}
      {/*    ) : null}*/}
      {/*</Toolbar>*/}
    </>
  );
}

const Groups = () => {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof GroupsData>('group');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searcher, setSearcher] = useState<string>('');
  const [dataRows, setDataRows] = useState<GroupsData[]>([]);

  useEffect(() => {
    setDataRows(rows);
  }, [])

  useEffect(() => {
    if (searcher.length > 0) {
      let tempArr = dataRows.map((item) => {
        if (item?.group.includes(searcher)) {
          return item;
        } else {
          return null;
        }
      });

      // @ts-ignore
      nullClearer(tempArr)
      // @ts-ignore
      setDataRows(tempArr);
    } else {
      setDataRows(rows);
    }
  }, [searcher])

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof GroupsData) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => String(n.id));
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangeBtn = (event: any, data: GroupsData) => {
    console.log(event.target)
  }

  const handleClick = (event: React.MouseEvent<unknown>, name: number) => {
    let temp = `${name}`
    const selectedIndex = selected.indexOf(temp);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, temp);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: number) => selected.indexOf(String(name)) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          searcherSet={setSearcher}
          searcherState={searcher}
          numSelected={selected.length}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='medium'
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(dataRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell
                        onClick={(event) => handleClick(event, row.id)}
                        style={{ width: '15%' }}
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none">
                        {row.group}
                      </TableCell>
                      <TableCell
                        onClick={(event) => handleClick(event, row.id)}
                        style={{ width: '12%' }}
                        align="left"
                        padding="none">
                        {row.caf}
                      </TableCell>
                      <TableCell
                        onClick={(event) => handleClick(event, row.id)}
                        style={{ width: '20%' }}
                        align="left"
                        padding="none">
                        {row.year}
                      </TableCell>
                      <TableCell
                        onClick={(event) => handleChangeBtn(event, row)}
                        className={classes.changeBtn}
                        align="left"
                        padding="none">
                        Изменить
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (53) * emptyRows }}>
                  <TableCell colSpan={6}/>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage={"Количество строк на странице"}
          rowsPerPageOptions={[10, 25, 50, 75, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default Groups;