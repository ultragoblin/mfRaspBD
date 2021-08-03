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

enum EScheduleData {
  ACTIVE = 'Активно',
  HIDDEN = 'Скрыто'
};

interface TableData {
  id: number
};

interface ScheduleData extends TableData {
  year: string,
  semestr: number,
  status: EScheduleData,
};

interface GroupsData extends TableData {
  group: string,
  caf: string,
  year: number
};

interface SubjectsData extends TableData {
  subject: string
};

interface TeachersData extends TableData {
  teacher: string
};

interface AudData extends TableData {
  aud: string
};

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

const TemplateTable = () => {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof GroupsData>('group');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searcher, setSearcher] = useState<string>('');
  const [dataRows, setDataRows] = useState<GroupsData[]>([]);

  return (
    <div>kek</div>
  )
};

export default TemplateTable;
