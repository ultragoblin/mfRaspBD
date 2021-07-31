import { pairT } from "../Redux/reducers/raspData";
import React from "react";
import { autocompleteNamings } from "../components/Subject/SubjectTable/Row/Row";
import errorLog from "./Logs/Error";

const editAud = (
  value: any,
  subID: string,
  row: pairT | {},
  stateFunc: React.Dispatch<React.SetStateAction<{} | pairT>>
) => {
  let id: number | null = null;

  //                        ADD                        //

  // empty CASE                                       //
  // aud*N, where N - is number of select
  // check audID if (audID === aud-2 <- from selectID) then
  //    aud field = [null, audID <- from selectValue]
  // else
  //    aud field = [audID <- from selectValue]

  // NOT empty CASE                                   //
  // Switch (arr.length === 2) then
  //  Switch (selectID === aud-1) then arr[0] = selectValue
  //         (selectID === aud-2) then arr[1] = selectValue
  //        (arr.length === 1) then
  //  Switch (selectID === aud-1) then arr[0] = selectValue
  //         (selectID === aud-2) then arr.push(selectValue)

  //                        DEL                        //
  


  if (value) {
    id = value['audid'];
    // Добавление в селект
    if (Object.keys(row).includes('aud')) { // NOT empty CASE
      // @ts-ignore
      let prevAud = row?.aud;

      switch (prevAud.length) {
        case 1:
          switch (subID) {
            case autocompleteNamings._aud.first:
              prevAud[0] = id;
              break;
            case autocompleteNamings._aud.second:
              prevAud.push(id);
              break;
          }
          break;
        case 2:
          switch (subID) {
            case autocompleteNamings._aud.first:
              prevAud[0] = id;
              break;
            case autocompleteNamings._aud.second:
              prevAud[1] = id;
              break;
          }
          break;
        default:
          errorLog('aud add error');
          break;
      }
      stateFunc({ aud: prevAud });
    } else {  // empty CASE
      switch (subID) {
        case autocompleteNamings._aud.first:
          stateFunc({ aud: [id] });
          break;
        case autocompleteNamings._aud.second:
          stateFunc({ aud: [null, id] });
          break;
        default:
          errorLog('aud add error');
          break;
      }
    }
  } else {
    // удаление из селекта
    stateFunc({ ...row, [subID.split('-')[0]]: [] })
  }
}

const editOthersFields = (
  event: any,
  value: any,
  subID: string,
  row: pairT | {},
  stateFunc: React.Dispatch<React.SetStateAction<{} | pairT>>
) => {
  let name: string = '';
  let id: number | null = null;

  for (let key in value) {
    if (key.includes('id')) {
      id = value[key];
    } else {
      name = key;
    }
  }

  if (value) {
    // Добавление в селект
    stateFunc({ ...row, [name]: id });
  } else {
    // удаление из селекта
    stateFunc({ ...row, [subID.split('-')[0]]: null })
  }
}

export { editAud, editOthersFields };