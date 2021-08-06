import React from "react";
import Searcher from "../Searcher/Searcher";

interface EnhancedTableToolbarProps {
  numSelected: number;
  searcherState: string,
  searcherSet: React.Dispatch<React.SetStateAction<string>>
}

const EnhancedTableToolbar = ({searcherSet, searcherState, numSelected}: EnhancedTableToolbarProps) => {
  const handleSearcherChange = (e: any): void => {
    searcherSet(e.target.value);
  }

  return (
    <>
      <Searcher state={searcherState} setState={handleSearcherChange}/>
  </>
);
}

export default EnhancedTableToolbar;
