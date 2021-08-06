enum EScheduleData {
    ACTIVE = 'Активно',
    HIDDEN = 'Скрыто'
};

type ScheduleData = {
    id: number,
    year: string,
    semestr: number,
    status: EScheduleData,
};

function createScheduleData(
  id: number,
  semestr: number,
  status: EScheduleData,
  year: string
): ScheduleData {
    return { id, semestr, status, year }
};

const Schedule = () => {
    return (
        <div>schedule</div>
    )
};

export default Schedule;
