import type { questions } from "@prisma/client";
import { ActionFunction, json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { speakers } from "~/data/Speakers";

import { db } from "~/utils/db.server";

type LoaderData = { question: questions | null };
export const loader: LoaderFunction = async ({ request, params }) => {
  const id = Number(params?.id ?? 1);
  await db.questions.findUnique({ where: { id } });
  const data: LoaderData = {
    question: await db.questions.findUnique({ where: { id } }),
  };
  return json(data);
};

export default function Question() {
  const data = useLoaderData<LoaderData>();
  const speaker = data?.question?.talkId ?? 1 - 1 ?? 0;
  return (
    <div>
      <p>Question</p>
      <div>
        <label>Speaker: {speakers[speaker] ?? "-"}</label>{" "}
      </div>
      <div>
        <label>Question: {data.question?.question}</label>
      </div>
      <div>
        <label>Votes: {data.question?.votes}</label>
      </div>
    </div>
  );
}
