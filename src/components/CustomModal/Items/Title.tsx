export interface TitleProps {
    text: string
}

const Title = ({text}: TitleProps) => {
    return <h3>
        {text}
    </h3>
}

export default Title;
