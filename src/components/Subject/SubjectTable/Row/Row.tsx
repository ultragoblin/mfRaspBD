import { useState, useEffect } from "react";
import Single from "./Single";
import Double from "./Double";
import "./Row.scss";
import { pairListT, pairT } from "../../../../Redux/reducers/raspData";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

export enum RowWidth {
  NUMBER = 42,
  TIMER = 121,
  CHECKBOX = 42,
  SUBJECT = 442,
  TEACHER = 392,
  AUD = 213,
  SUBGROUP = 124
}

export type IOptions = {
  name: string;
};

export type IEveryOptions = {
  subject: IOptions[],
  teacher: IOptions[],
  aud: IOptions[],
  subGroup: IOptions[]
}

export interface RowProps {
  number: number;
  timer: string;
  stateFunc: (payload: pairListT) => void
}

export interface RowChildProps extends RowProps {
  state: boolean;
  handler: () => void;
  options: IEveryOptions;
}

// ! Сюда подгрузим список предметов
const subjOptions: IOptions[] = [
  {
    name: "keker",
  },
  {
    name: 'matan'
  }
];

const teacherOptions: IOptions[] = [
  {
    name: "1/2ektov"
  },
  {
    name: "afanas"
  }
]

const audOptions: IOptions[] = [
  {
    name: "495"
  },
  {
    name: "195"
  }
]

const subGroupOtions: IOptions[] = [
  {
    name: "1"
  },
  {
    name: '2'
  }
]

const everyOptions: IEveryOptions = {
  subject: subjOptions,
  teacher: teacherOptions,
  aud: audOptions,
  subGroup: subGroupOtions
}

const Row = ({ number, timer, stateFunc }: RowProps) => {
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

  const rowStateHandler = (payload: pairT[] | {}) => {
    setRowState({ ...rowState, pair: payload });
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
