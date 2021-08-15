import React, { useEffect, useState } from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { TablePagination } from "@material-ui/core";
import TableToolbar from "../TableToolbar";
import { handleChangePage, handleChangeRowsPerPage, handleSelectClick, isSelected } from "../tableFuncs";
import { getComparator, Order, stableSort } from "../../../utils/sort";
import { useTableBodyStyles, useTableHeaderStyles } from "../tableStyles";

export type SubjectsData = {
  id: number,
  subject: string
};

interface HeadCell {
  id: keyof SubjectsData;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: "subject", numeric: false, label: 'Предмет' },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof SubjectsData) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const classes = useTableHeaderStyles();
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof SubjectsData) => (event: React.MouseEvent<unknown>) => {
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

export type SubjectsTableProps = {
  subjectsDataRows: SubjectsData[],
  setSubjectDataRows: React.Dispatch<React.SetStateAction<SubjectsData[]>>
}

const Subjects = ({ subjectsDataRows, setSubjectDataRows }: SubjectsTableProps) => {
  const classes = useTableBodyStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof SubjectsData>('subject');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searcher, setSearcher] = useState<string>('');
  const [savedRows, setSavedRows] = React.useState<SubjectsData[]>([]);

  useEffect(() => {
    setSavedRows(subjectsDataRows);
  }, [subjectsDataRows])

  useEffect(() => {
    if (savedRows.length > 0) {
      let tempArr: SubjectsData[] = [];
      subjectsDataRows.forEach((item) => {
        if (item?.subject.toLowerCase().includes((searcher.toLowerCase()))) {
          tempArr.push(item);
        }
      });

      setSavedRows(tempArr);
    } else { // Восстанавливаем стейт
      console.log('restore?')
      setSavedRows(subjectsDataRows);
    }
  }, [searcher])

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = savedRows.map((n) => String(n.id));
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof SubjectsData) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeBtn = (event: any, data: SubjectsData) => {
    console.log(event.target)
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, subjectsDataRows.length - page * rowsPerPage);

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
              rowCount={savedRows.length}
            />
            <TableBody>
              {stableSort(savedRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id, selected);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
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
                        style={{ width: '50%' }}
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none">
                        {row.subject}
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
          count={savedRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default Subjects;
