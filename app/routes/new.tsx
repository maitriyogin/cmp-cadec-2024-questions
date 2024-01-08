import type { Questions } from "@prisma/client";
import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { db } from "~/utils/db.server";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const question = form.get("question");
  const talkId = Number(form.get("talkId"));
  const user = 1;
  // we do this type check to be extra sure and to make TypeScript happy
  if (typeof question !== "string") {
    throw new Error(`Form not submitted correctly.`);
  }

  const fields = { question, talkId, user, votes: 1, ok: true };

  await db.questions.create({ data: fields });
  return redirect(`/`);
};

export default function NewNote() {
  return (
    <div>
      <p>Ask </p>
      <form method="post">
        <div>
          <label>
            Speaker(s):{" "}
            <select name="talkId" id="speakers">
              <option value="1">Magnus</option>
              <option value="2">Björn - David</option>
              <option value="3">Stephen</option>
              <option value="4">Johan</option>
              <option value="5">Björn Beskow</option>
              <option value="6">Niklas</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Question: <textarea name="question" />
          </label>
        </div>
        <div>
          <button type="submit" className="button">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
