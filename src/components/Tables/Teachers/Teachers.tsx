type TeachersData = {
  id: number,
  teacher: string
};

function createTeacherData(
  id: number,
  teacher: string
): TeachersData {
  return { id, teacher }
};

const Teachers = () => {
    return (
        <div>
            Teachers
        </div>
    )
};

export default Teachers;
