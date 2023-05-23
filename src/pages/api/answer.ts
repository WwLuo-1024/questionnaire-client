import { NextApiRequest, NextApiResponse } from "next";
import { postAnswer } from "@/services/answer";

function genAnswerInfo(reqBody: any) {
  const answerList: any = [];
  Object.keys(reqBody).forEach((key) => {
    if (key === "questionId") return;
    answerList.push({
      componentId: key,
      value: reqBody[key],
    });
  });

  return {
    questionId: reqBody.questionId || "",
    answerList,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    //If not post return error
    res.status(200).json({ errno: -1, msg: "Method Error" });
  }

  //Obtain and format form data
  const answerInfo = genAnswerInfo(req.body);
  // console.log("answerInfo...", answerInfo);

  try {
    //Submit data to server (Mock)
    const resData = await postAnswer(answerInfo);
    // console.log("resData...", resData);
    if (resData.errno === 0) {
      //If success
      res.redirect("/success");
    } else {
      //If Fail
      res.redirect("/fail");
    }
  } catch (err) {
    //If Fail
    res.redirect("/fail");
  }
}
