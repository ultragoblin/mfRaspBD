import styles from './Items.module.scss';

export interface ResultProps {
    text: string | undefined
};

const Result = ({text}: ResultProps) => {
    return (
        <p className={styles.result}>
            Результат: {text}
        </p>
    )
};

export default Result;
