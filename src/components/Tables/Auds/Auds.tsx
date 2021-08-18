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
import { GroupsData } from "../Groups/Groups";

export type AudData = {
  id: number,
  aud: string
};

interface HeadCell {
  id: keyof AudData;
  label: string;
}

const headCells: HeadCell[] = [
  { id: "aud", label: 'Аудитория' },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof AudData) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
};

function EnhancedTableHead(props: EnhancedTableProps) {
  const classes = useTableHeaderStyles();
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof AudData) => (event: React.MouseEvent<unknown>) => {
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

export type AudsTableProps = {
  audDataRows: AudData[],
  setAudDataRows: React.Dispatch<React.SetStateAction<AudData[]>>
}

const Auds = ({audDataRows, setAudDataRows}: AudsTableProps) => {
  const classes = useTableBodyStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof AudData>('aud');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searcher, setSearcher] = useState<string>('');
  const [savedRows, setSavedRows] = React.useState<AudData[]>([]);

  useEffect(() => {
    setSavedRows(audDataRows);
  }, [audDataRows])

  useEffect(() => {
    if (savedRows.length > 0) {
      let tempArr: AudData[] = [];
      audDataRows.forEach((item) => {
        if (item?.aud.toLowerCase().includes((searcher.toLowerCase()))) {
          tempArr.push(item);
        }
      });

      setSavedRows(tempArr);
    } else { // Восстанавливаем стейт
      console.log('restore?')
      setSavedRows(audDataRows);
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

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof AudData) => {
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

  const handleChangeBtn = (event: any, data: AudData) => {
    console.log(event.target)
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, audDataRows.length - page * rowsPerPage);

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
                        onClick={(event) => handleSelectClick(event, row.id, selected, setSelected)}
                        style={{ width: '20%' }}
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none">
                        {row.aud}
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
        {/*<TablePagination*/}
        {/*  labelRowsPerPage={"Количество строк на странице"}*/}
        {/*  rowsPerPageOptions={[10, 25, 50, 75, 100]}*/}
        {/*  component="div"*/}
        {/*  count={savedRows.length}*/}
        {/*  rowsPerPage={rowsPerPage}*/}
        {/*  page={page}*/}
        {/*  onChangePage={handleChangePage}*/}
        {/*  onChangeRowsPerPage={handleChangeRowsPerPage}*/}
        {/*/>*/}
      </Paper>
    </div>
  );
};

export default Auds;
