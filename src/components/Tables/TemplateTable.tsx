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
import Searcher from "../Searcher/Searcher";
import nullClearer from "../../utils/nullClearer";
import { ETabsNaming } from "../../pages/Database/Database";

enum EScheduleData {
  ACTIVE = 'Активно',
  HIDDEN = 'Скрыто'
};

interface TableData {
  id: number
};

// interface ScheduleData extends TableData {
//   year: string,
//   semestr: number,
//   status: EScheduleData,
// };
//
// interface GroupsData extends TableData {
//   group: string,
//   caf: string,
//   year: number
// };
//
// interface SubjectsData extends TableData {
//   subject: string
// };
//
// interface TeachersData extends TableData {
//   teacher: string
// };
//
// interface AudData extends TableData {
//   aud: string
// };

type ScheduleData = {
  id: number,
  year: string,
  semestr: number,
  status: EScheduleData,
};

type GroupsData = {
  id: number,
  group: string,
  caf: string,
  year: number
};

type SubjectsData = {
  id: number,
  subject: string
};

type TeachersData = {
  id: number,
  teacher: string
};

type AudData = {
  id: number,
  aud: string
};

type TData = ScheduleData | SubjectsData | GroupsData | TeachersData | AudData;

type TDataKeys = keyof ScheduleData | keyof SubjectsData | keyof GroupsData | keyof TeachersData | keyof AudData;

function createGroupData(
  id: number,
  group: string,
  caf: string,
  year: number
): GroupsData {
  return { id, group, caf, year };
};

function createScheduleData(
  id: number,
  semestr: number,
  status: EScheduleData,
  year: string
): ScheduleData {
  return { id, semestr, status, year }
};

function createSubjectData(
  id: number,
  subject: string
): SubjectsData {
  return { id, subject }
};

function createTeacherData(
  id: number,
  teacher: string
): TeachersData {
  return { id, teacher }
};

function createAudData(
  id: number,
  aud: string
): AudData {
  return { id, aud }
};

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

function descendingComparator<TData>(a: TData, b: TData, orderBy: keyof TData) {
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

function stableSort<TData>(array: TData[], comparator: (a: TData, b: TData) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [TData, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  id: keyof TDataKeys;
  label: string;
  numeric: boolean;
} // ПЕРЕДАТЬ

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: TDataKeys) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const classes = useTableHeaderStyles();
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: TDataKeys) => (event: React.MouseEvent<unknown>) => {
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
  searcherState: string,
  searcherSet: React.Dispatch<React.SetStateAction<string>>
}

const EnhancedTableToolbar = ({ searcherSet, searcherState }: EnhancedTableToolbarProps) => {

  const handleSearcherChange = (e: any): void => {
    searcherSet(e.target.value);
  }

  return (
    <>
      <Searcher state={searcherState} setState={handleSearcherChange}/>
    </>
  );
}


export interface TemplateTableProps {
  dataType: ETabsNaming,
  // rows: TData[]
  // rows: GroupsData[] | ScheduleData[] | SubjectsData[] | TeachersData[] | AudData[],
  rows: any[]
};

const TemplateTable = ({ rows }: TemplateTableProps) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<TDataKeys>('group');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searcher, setSearcher] = useState<string>('');

  useEffect(() => {

    setDataRows(rows);
  }, [rows])

  useEffect(() => {
    if (searcher.length > 0) {
      let tempArr = rows.map((item) => {
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

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: TDataKeys) => {
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

  const handleClick = (event: React.MouseEvent<unknown>, name: number | string) => {
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

  const handleChangeBtn = (event: any, data: any) => {
    console.log(event.target)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: number | string) => selected.indexOf(String(name)) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          searcherSet={setSearcher}
          searcherState={searcher}
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
              {stableSort(rows, getComparator(order, orderBy))
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
                        KEK
                        {/*{row.group}*/}
                      </TableCell>
                      <TableCell
                        onClick={(event) => handleClick(event, row.id)}
                        style={{ width: '12%' }}
                        align="left"
                        padding="none">
                        KEK
                        {/*{row.caf}*/}
                      </TableCell>
                      <TableCell
                        onClick={(event) => handleClick(event, row.id)}
                        style={{ width: '20%' }}
                        align="left"
                        padding="none">
                        RTR
                        {/*{row.year}*/}
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
};

export default TemplateTable;
