import { useEffect, useState } from "react";
import Single from "./Single";
import Double from "./Double";
import "./Row.scss";
import { pairListT, pairT } from "../../../../Redux/reducers/raspData";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { IEveryOptions } from "../../../../Redux/reducers/data";

type TNamings = {
  _subject: string,
  _aud: {
    first: string,
    second: string
  },
  _teacher: string,
  _subgroup: string,
}

export const autocompleteNamings: TNamings = {
  _subject: "subject",
  _aud: {
    first: "aud-1",
    second: "aud-2"
  },
  _teacher: "teacher",
  _subgroup: "subgroup"
}

export enum RowWidth {
  NUMBER = 42,
  TIMER = 121,
  CHECKBOX = 42,
  SUBJECT = 442,
  TEACHER = 392,
  AUD = 213,
  SUBGROUP = 124
}

export interface RowProps {
  number: number;
  timer: string;
}

export interface RowParentProps extends RowProps {
  stateFunc: (payload: pairListT) => void
}

export interface RowChildProps extends RowProps {
  state: boolean;
  handler: () => void;
  stateFunc: (payload: pairT | {}) => void
  options: IEveryOptions;
}

const Row = ({ number, timer, stateFunc }: RowParentProps) => {
  const data = useTypedSelector((store) => store.data.admLists.data)
  const [everyOptions, setEveryOptions] = useState<IEveryOptions>({
    aud: [],
    teacher: [],
    subGroup: [],
    subject: []
  });
  const [rowState, setRowState] = useState<pairListT>({
    pair: [],
    id: number - 1
  });
  const [double, setDouble] = useState<boolean>(false);
  const isCollecting = useTypedSelector((state) => state.collectData.collecting)

  const doubleHandler = (): void => {
    setDouble(!double);
  };

  useEffect(() => {
    if (isCollecting) {
      stateFunc(rowState);
    }

  }, [isCollecting])

  useEffect(() => {
    setEveryOptions({
      subject: data.subject.options,
      teacher: data.teacher.options,
      aud: data.aud.options,
      subGroup: data.subgroup.options
    });
  }, [data])

  const rowStateHandler = (payload: pairT | {}) => {
    const newPairs: (pairT | {})[] = [];
    if (Object.keys(payload).length > 0) {
      newPairs.push(payload)
    }
    console.log('row handler', payload, 'arr >>> ', newPairs)

    setRowState({ ...rowState, pair: newPairs  });
  }

  return !double ? (
    <Single
      stateFunc={rowStateHandler}
      handler={doubleHandler}
      number={number}
      timer={timer}
      state={double}
      options={everyOptions}
    />
  ) : (
    <Double
      stateFunc={rowStateHandler}
      handler={doubleHandler}
      number={number}
      timer={timer}
      state={double}
      options={everyOptions}
    />
  );
};

export default Row;
