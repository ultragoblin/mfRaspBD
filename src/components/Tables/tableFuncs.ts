import React from "react";

const handleSelectClick = (
  event: React.MouseEvent<unknown>,
  name: number,
  selected: string[],
  setSelected: React.Dispatch<React.SetStateAction<string[]>>
) => {
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

  setSelected([newSelected[newSelected.length - 1]]);
};

const handleChangePage = (
  event: unknown,
  newPage: number,
  setPage: React.Dispatch<React.SetStateAction<number>>
) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>,
  setPage: React.Dispatch<React.SetStateAction<number>>
) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

const isSelected = (name: number, selected: string[]) => selected.indexOf(String(name)) !== -1;

export {
  handleSelectClick,
  handleChangePage,
  handleChangeRowsPerPage,
  isSelected
};


