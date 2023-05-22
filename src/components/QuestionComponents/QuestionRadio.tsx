import React, {FC} from "react";
import styles from './QuestionRadio.module.scss'

type PropsType = {
    fe_id: string,
    props: {
        title: string
        options: Array<{
            value: string
            text: string
        }>
        value: string
        isVertical: boolean
    }
}

const QuestionRadio: FC<PropsType> = ({ fe_id, props }) => {
    const { title, options=[], value, isVertical } = props
    return <>
    <p>{title}</p>
    <ul className={styles.list}>
        {options.map(opt => {
            const { value: val, text } = opt

            //Determine whether it is vertical or horizontal
            let className = ''
            if (isVertical)

            return <li key={val}>
                <label>
                    <input type="radio" name={fe_id} value={val} defaultChecked={val === value}>
                        {text}
                    </input>
                </label>
            </li>
        })}
    </ul>
    </>
}

export default QuestionRadio
