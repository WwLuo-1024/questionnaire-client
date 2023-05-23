import Head from "next/head";
import QuestonInput from "@/components/QuestionComponents/QuestionInput";
import QuestionRadio from "@/components/QuestionComponents/QuestionRadio";
import styles from '@/styles/Question.module.scss'

type PropsType = {
    id: string
}

export default function Question(props: PropsType) {
    return <>
        <Head>
            <title>Next.js demo</title>
            <meta name="description" content="question"/>
            <meta name="viewport" content="width=deivce-width, initial-scale=1" />
            {/* <link rel="icon" ref="/favicon.ico" /> */}
        </Head>
        <main>
            
            <form method="POST" action="/api/answer">
                <input type="hidden" name="questionId" value={props.id}/>
                <div className={styles.componentWrapper}>
                    <QuestonInput fe_id="c1" props={{ title: 'Your Name', placeholder: 'Please enter'}}/>
                </div>
                <div className={styles.componentWrapper}>
                <QuestionRadio fe_id="c2" props={{ 
                        title: "Your Gender",
                        options: [
                        { value: 'male', text:'Male' },
                        { value: 'female', text: 'Female'},
                        ],
                        value: '',
                        isVertical: true 
                    }}/>
                </div>
                
                <div className={styles.submitBtnContainer}>
                    {/* <input type="submit" value="submit"/> */}
                    <button type="submit">Submit</button>
                </div>
            </form>
        </main>
    </>
}

export async function getServerSideProps(context: any) {
    const {id=''} = context.params

    //Based on id and await obtain questionnaire data
    return {
        props: {
            id,
        }
    }
}