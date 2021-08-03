export interface ResultProps {
    text: string | undefined
};

const Result = ({text}: ResultProps) => {
    return (
        <p>
            Результат: {text}
        </p>
    )
};

export default Result;
