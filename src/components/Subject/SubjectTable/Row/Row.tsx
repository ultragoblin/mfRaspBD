import { useState } from "react";
import Single from "./Single";
import Double from "./Double";
import "./Row.scss";

export enum RowWidth {
  NUMBER = 42,
  TIMER = 121,
  CHECKBOX = 42,
  SUBJECT = 442,
  TEACHER = 392,
  AUD = 213,
  SUBGROUP = 124
}

export type ISubj = {
  name: string;
};

export interface RowProps {
  number: number;
  timer: string;
}

export interface RowChildProps extends RowProps {
  state: boolean;
  handler: () => void;
  options: ISubj[];
}

// ! Сюда подгрузим список предметов
const options: ISubj[] = [
  {
    name: "keker",
  },
];

const Row = ({ number, timer }: RowProps) => {
  const [double, setDouble] = useState<boolean>(false);

  const doubleHandler = (): void => {
    setDouble(!double);
  };

  return !double ? (
    <Single
      handler={doubleHandler}
      number={number}
      timer={timer}
      state={double}
      options={options}
    />
  ) : (
    <Double
      handler={doubleHandler}
      number={number}
      timer={timer}
      state={double}
      options={options}
    />
  );
};

export default Row;
