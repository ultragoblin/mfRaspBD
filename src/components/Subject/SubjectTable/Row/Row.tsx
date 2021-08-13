import {useEffect, useState} from "react";
import Single from "./Single";
import Double from "./Double";
import "./Row.scss";
import {pairListT, pairT} from "../../../../Redux/reducers/raspData";
import {useTypedSelector} from "../../../../hooks/useTypedSelector";
import {IEveryOptions, TEveryDefaultOptionDouble, TEveryDefaultOptionsSingle} from "../../../../Redux/reducers/data";

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
    stateFunc: (payload: pairListT) => void,
    pair: ({} | pairT)[]
}

export interface RowChildProps extends RowProps {
    state: boolean;
    handler: () => void;
    options: IEveryOptions;
}

export interface SingleRowProps extends RowChildProps {
    stateFunc: (payload: pairT | {}) => void,
    pair: pairT | {}
    defaultOptions: TEveryDefaultOptionsSingle
}

export interface DoubleRowProps extends RowChildProps {
    stateFuncFirstRow: (payload: pairT | {}) => void,
    stateFuncSecondRow: (payload: pairT | {}) => void,
    defaultOptions: TEveryDefaultOptionDouble
}

const Row = ({number, timer, stateFunc, pair}: RowParentProps) => {
    const raspData = useTypedSelector((store) => store.raspData);
    const data = useTypedSelector((store) => store.data.admLists.data)
    const [everyOptions, setEveryOptions] = useState<IEveryOptions>({
        aud: data.aud.options,
        teacher: data.teacher.options,
        subgroup: data.subgroup.options,
        subject: data.subject.options
    });
    const [rowState, setRowState] = useState<pairListT>({
        pair: pair,
        id: number - 1,
        pairtime: timer
    });
    const [double, setDouble] = useState<boolean>(false);
    const isCollecting = useTypedSelector((state) => state.collectData.collecting)
    const [defaultValuesSingle, setDefaultValuesSingle] = useState<TEveryDefaultOptionsSingle>({
        // @ts-ignore
        subject: everyOptions.subject.findIndex((el) => el.subjectid === pair[0]?.subject),
        // @ts-ignore
        aud: [everyOptions.aud.findIndex((el) => el.audid === pair[0]?.aud[0]), everyOptions.aud.findIndex((el) => el.audid === pair[0]?.aud[1])],
        // @ts-ignore
        subgroup: everyOptions.subgroup.findIndex((el) => el.subgroupid === pair[0]?.subgroup),
        // @ts-ignore
        teacher: everyOptions.teacher.findIndex((el) => el.teacherid === pair[0]?.teacher)
    });
    const [defaultValuesDouble, setDefaultValuesDouble] = useState<TEveryDefaultOptionDouble>({
        first: {
            // @ts-ignore
            subject: everyOptions.subject.findIndex((el) => el.subjectid === pair[0]?.subject),
            // @ts-ignore
            aud: [everyOptions.aud.findIndex((el) => el.audid === pair[0]?.aud[0]), everyOptions.aud.findIndex((el) => el.audid === pair[0]?.aud[1])],
            // @ts-ignore
            subgroup: everyOptions.subgroup.findIndex((el) => el.subgroupid === pair[0]?.subgroup),
            // @ts-ignore
            teacher: everyOptions.teacher.findIndex((el) => el.teacherid === pair[0]?.teacher)
        },
        second: {
            // @ts-ignore
            subject: everyOptions.subject.findIndex((el) => el.subjectid === pair[1]?.subject),
            // @ts-ignore
            aud: [everyOptions.aud.findIndex((el) => el.audid === pair[1]?.aud[0]), everyOptions.aud.findIndex((el) => el.audid === pair[1]?.aud[1])],
            // @ts-ignore
            subgroup: everyOptions.subgroup.findIndex((el) => el.subgroupid === pair[1]?.subgroup),
            // @ts-ignore
            teacher: everyOptions.teacher.findIndex((el) => el.teacherid === pair[1]?.teacher)
        }
    });

    useEffect(() => {
        setEveryOptions({
            subject: data.subject.options,
            teacher: data.teacher.options,
            aud: data.aud.options,
            subgroup: data.subgroup.options
        });

        setDouble(pair.length === 2);
        console.log(defaultValuesSingle)
    }, [])

    const doubleHandler = (): void => {
        setDouble(!double);
    };

    useEffect(() => {
        if (isCollecting) {
            stateFunc(rowState);
        }

    }, [isCollecting])

    const rowStateHandlerSingle = (payload: pairT | {}): void => {
        const newPairs: (pairT | {})[] = [];
        if (Object.keys(payload).length > 0) {
            newPairs.push(payload)
        }

        setRowState({...rowState, pair: newPairs});
    }

    const rowStateHandlerSecond = (payload: pairT | {}): void => {
        const newPairs: (pairT | {})[] = rowState.pair;
        newPairs[1] = payload;

        setRowState({...rowState, pair: newPairs})
    }

    const rowStateHandlerFirst = (payload: pairT | {}): void => {
        const newPairs: (pairT | {})[] = rowState.pair;
        newPairs[0] = payload;

        setRowState({...rowState, pair: newPairs})
    }

    return !double ? (
        <Single
            pair={pair}
            defaultOptions={defaultValuesSingle}
            stateFunc={rowStateHandlerSingle}
            handler={doubleHandler}
            number={number}
            timer={timer}
            state={double}
            options={everyOptions}
        />
    ) : (
        <Double
            defaultOptions={defaultValuesDouble}
            stateFuncFirstRow={rowStateHandlerFirst}
            stateFuncSecondRow={rowStateHandlerSecond}
            handler={doubleHandler}
            number={number}
            timer={timer}
            state={double}
            options={everyOptions}
        />
    );
};

export default Row;
