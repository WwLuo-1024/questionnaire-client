import Head from "next/head";
import QuestonInput from "@/components/QuestionComponents/QuestionInput";

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
            <h1>Question page</h1>
            <p>{props.id}</p>

            <form>
                <QuestonInput fe_id="c1" props={{title: 'Your Name', placeholder: 'Please enter'}}/>
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