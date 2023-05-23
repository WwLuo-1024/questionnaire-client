import PageWrapper from "@/components/PageWrapper";
// import QuestonInput from "@/components/QuestionComponents/QuestionInput";
// import QuestionRadio from "@/components/QuestionComponents/QuestionRadio";
import styles from '@/styles/Question.module.scss'
import { getQuestionById } from "@/services/question";
import { getComponent } from "@/components/QuestionComponents";

type PropsType = {
    errno: number
    data?: {
        id: string
        title: string
        desc?: string
        js?: string
        css?: string
        isPublished: boolean
        isDeleted: boolean
        componentList: Array<any>
    }
    msg?: string

}

export default function Question(props: PropsType) {
    const {errno, data, msg=''} = props

    if (errno !== 0) {
        return <PageWrapper title="error">
            <h1>Error</h1>
            <p>{msg}</p>
        </PageWrapper>
    }

    const { id, title='', desc='', isPublished, isDeleted, componentList } = data || {}
    console.log(isPublished)
    //Already Deleted
    if(isDeleted) {
        return <PageWrapper title={title} desc={desc}>
            <h1>{title}</h1>
            <p>This questionnaire was already deleted</p>
        </PageWrapper>
    }

    //Not publish yet
    if(!isPublished) {
        return <PageWrapper title={title} desc={desc}>
            <h1>{title}</h1>
            <p>This questionnaire is not published yet</p>
        </PageWrapper>
    }

    //iterate components
    const ComponentListElem = <>
        {componentList?.map(c => {
            const ComponentElem = getComponent(c)
            return <div key={c.fe_id}  className={styles.componentWrapper}>
                {ComponentElem}
                </div>
        })}
    </>
    return <PageWrapper title={title}>
            <form method="POST" action="/api/answer">
                <input type="hidden" name="questionId" value={id}/>
                {ComponentListElem}
                <div className={styles.submitBtnContainer}>
                    {/* <input type="submit" value="submit"/> */}
                    <button type="submit">Submit</button>
                </div>
            </form>
    </PageWrapper>
}

export async function getServerSideProps(context: any) {
    const { id = '' } = context.params

    //Based on id and await obtain questionnaire data
    const data = await getQuestionById(id)

    return {
        props: data
    }
}