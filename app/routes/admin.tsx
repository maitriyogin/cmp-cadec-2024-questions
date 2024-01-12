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
    const id = Number(form.get("enable"));

    const q = await db.questions.findUnique({ where: { id } });
    if (q !== undefined && q !== null) {
      const fields = { allowed: !q.allowed };
      await db.questions.update({ where: { id }, data: fields });
    }
  } else {
    await db.questions.delete({ where: { id } });
  }
  return redirect(`/admin`);
};

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    questions: await db.questions.findMany({ orderBy: { votes: "desc" } }),
  };
  return json(data);
};
export default function admin() {
  const data = useLoaderData<LoaderData>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Admin</h1>
      <p> Questions: </p>
      <a href="/">Back to questions</a>
      <Form method="post">
        <ul>
          {data.questions.map(({ id, question, talkId, votes, allowed }) => (
            <li key={id}>
              <span>{votes}</span>
              <button
                type="submit"
                name={"enable"}
                className="button"
                value={id}
                style={{ margin: 4 }}
              >
                {allowed ? "Approved" : "Pending"}
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
