import React, { useEffect, useState } from "react";
import { getComparator, Order, stableSort } from "../../../utils/sort";
import { useTableBodyStyles, useTableHeaderStyles } from "../tableStyles";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import nullClearer from "../../../utils/nullClearer";
import Paper from "@material-ui/core/Paper";
import TableToolbar from "../TableToolbar";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { handleChangePage, handleChangeRowsPerPage, handleSelectClick, isSelected } from "../tableFuncs";
import { TablePagination } from "@material-ui/core";

enum EScheduleData {
  ACTIVE = 'Активно',
  HIDDEN = 'Скрыто'
};

type ScheduleData = {
  id: number,
  year: string,
  semestr: number,
  status: EScheduleData,
};

function createScheduleData(
  id: number,
  semestr: number,
  status: EScheduleData,
  year: string
): ScheduleData {
  return { id, semestr, status, year }
};

interface HeadCell {
  id: keyof ScheduleData;
  label: string;
}

const headCells: HeadCell[] = [
  { id: "year", label: 'Год обучения' },
  { id: "semestr", label: 'Семестр' },
  { id: "status",  label: 'Статус' },
];

const rows = [
  createScheduleData(1, 2, EScheduleData.HIDDEN, '2000-2002'),
  createScheduleData(2, 1, EScheduleData.HIDDEN, '2000-2006'),
  createScheduleData(3, 2, EScheduleData.ACTIVE, '2000-2009'),
  createScheduleData(4, 1, EScheduleData.HIDDEN, '2000-2011'),
  createScheduleData(5, 1, EScheduleData.HIDDEN, '2000-2011'),
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ScheduleData) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
};

function EnhancedTableHead(props: EnhancedTableProps) {
  const classes = useTableHeaderStyles();
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof ScheduleData) => (event: React.MouseEvent<unknown>) => {
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

const Schedule = () => {
  const classes = useTableBodyStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof ScheduleData>('year');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searcher, setSearcher] = useState<string>('');
  const [dataRows, setDataRows] = useState<ScheduleData[]>([]);

    useEffect(() => {
      setDataRows(rows);
    }, [])

  useEffect(() => {
    if (searcher.length > 0) {
      let tempArr = rows.map((item) => {
        if (item?.year.toLowerCase().includes(searcher)) {
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

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => String(n.id));
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof ScheduleData) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeBtn = (event: any, data: ScheduleData) => {
    // console.log(event.target)
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolbar
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
                  const isItemSelected = isSelected(row.id, selected);
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
                          onClick={(event) => handleSelectClick(event, row.id, selected, setSelected)}
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell
                        onClick={(event) => handleSelectClick(event, row.id, selected, setSelected)}
                        style={{ width: '20%' }}
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none">
                        {row.year}
                      </TableCell>
                      <TableCell
                        onClick={(event) => handleSelectClick(event, row.id, selected, setSelected)}
                        style={{ width: '20%' }}
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none">
                        {row.semestr}
                      </TableCell>
                      <TableCell
                        onClick={(event) => handleSelectClick(event, row.id, selected, setSelected)}
                        style={{ width: '20%' }}
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none">
                        {row.status}
                      </TableCell>
                      <TableCell
                        style={{ width: '50%' }}
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
          onChangePage={(e) => handleChangePage(e, page, setPage)}
          onChangeRowsPerPage={(e) => handleChangeRowsPerPage(e, setRowsPerPage, setPage)}
        />
      </Paper>
    </div>
  );
}

export default Schedule;
