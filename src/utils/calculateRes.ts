import {TGroupModal} from "../components/CustomModal/CustomModal";

const calculateRes = (data: TGroupModal): string => {
    let res: string = '';
    let caf: string = '';
    let semestr: string = '';
    let grade: string = '';

    if (data.caf) {
        caf = `${data.caf}-`;
    };

    if (data.grade) {
        grade = data.grade !== 'Специалитет' ? data.grade[0] : '';
    };

    if (data.year) {
        semestr = '1';
    }

    res = `${caf}${semestr}${data.groupNumber}${grade}`;
    return res;
};

export {calculateRes};
