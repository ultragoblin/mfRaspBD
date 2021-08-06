type AudData = {
    id: number,
    aud: string
};

function createAudData(
  id: number,
  aud: string
): AudData {
    return { id, aud }
};

const Auds = () => {
    return (
        <div>Auds</div>
    )
};

export default Auds;
