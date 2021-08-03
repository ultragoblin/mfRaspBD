export interface ResultProps {
    text: string
};

const Result = ({text}: ResultProps) => {
    return (
        <p>
            {text}
        </p>
    )
};

export default Result;
