import type { questions } from "@prisma/client";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";

type LoaderData = { questions: Array<questions> };

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  let id = Number(form.get("delete") ?? -1);
  if (id === -1) {
    const id = Number(form.get("vote"));

    const q = await db.questions.findUnique({ where: { id } });
    if (q !== undefined && q !== null) {
      const fields = { votes: q.votes + 1 };
      await db.questions.update({ where: { id }, data: fields });
    }
  } else {
    await db.questions.delete({ where: { id } });
  }
  return redirect(`/`);
};

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    questions: await db.questions.findMany({
      orderBy: { votes: "desc" },
      where: { allowed: true },
    }),
  };
  return json(data);
};
export default function _index() {
  const data = useLoaderData<LoaderData>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Cadec 2024 Questions!</h1>
      <a href="/new">Add a new question</a>
      <p> Questions: </p>
      <Form method="post">
        <ul>
          {data.questions.map(({ id, question, talkId, votes }) => (
            <li key={id}>
              <span>{votes}</span>
              <button
                type="submit"
                name={"vote"}
                className="button"
                value={id}
                style={{ margin: 4 }}
              >
                Vote
              </button>
              <button
                type="submit"
                name={"delete"}
                className="button"
                value={id}
                style={{ margin: 4 }}
              >
                Delete
              </button>
              <Link to={`/question/${id}`}>{question}</Link>
            </li>
          ))}
        </ul>
      </Form>
    </div>
  );
}
