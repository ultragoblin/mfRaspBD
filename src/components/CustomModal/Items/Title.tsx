import styles from './Items.module.css';

export interface TitleProps {
    text: string
}

const Title = ({text}: TitleProps) => {
    return <h3 className={styles.h3}>
        {text}
    </h3>
}

export default Title;
