import { useEffect, useState } from "react";
import Single from "./Single";
import Double from "./Double";
import "./Row.scss";
import { pairListT, pairT } from "../../../../Redux/reducers/raspData";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

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

export type OptionsTypes = TeacherOptions | SubGroupOptions | SubjectOptions | AudOptions;

export type IEveryOptions = {
  subject: SubjectOptions[],
  teacher: TeacherOptions[],
  aud: AudOptions[],
  subGroup: SubGroupOptions[]
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

// ! Сюда подгрузим список предметов
const subjOptions: SubjectOptions[] = [
  {
    subject: 'kek',
    subjectid: 1
  },
  {
    subject: 'eltex',
    subjectid: 2
  },
  {
    subject: 'matan',
    subjectid: 3
  }
];

const teacherOptions: TeacherOptions[] = [
  {
    teacher: "1/2ektov",
    teacherid: 1
  },
  {
    teacher: "afanas",
    teacherid: 2
  }
]

const audOptions: AudOptions[] = [
  {
    aud: "394",
    audid: 34
  },
  {
    aud: "232",
    audid: 22
  }
]

const subGroupOptions: SubGroupOptions[] = [
  {
    subgroup: "—",
    subgroupid: 1
  },
  {
    subgroup: "|",
    subgroupid: 2
  },
  {
    subgroup: "||",
    subgroupid: 3
  }
]

const everyOptions: IEveryOptions = {
  subject: subjOptions,
  teacher: teacherOptions,
  aud: audOptions,
  subGroup: subGroupOptions
}

const Row = ({ number, timer, stateFunc }: RowParentProps) => {

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

  const rowStateHandler = (payload: pairT | {}) => {
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
