import React, {FC, CSSProperties} from "react";

type PropsType = {
    text: string
    isCenter?: boolean
}

const Paragraph: FC<PropsType> = ({ text, isCenter }) => {
    const style: CSSProperties = {}
    if (isCenter) style.textAlign = "center"

    //Wrap
    const textList = text.split('\n')
    return <p>
        {textList.map((t, index) => (
        <span key={index}>
            {index > 0 && <br />}
            {t}
        </span>
    ))}</p>
}

export default Paragraph