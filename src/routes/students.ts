import { getRepository } from "typeorm";
import { Students } from "../entity/student";
import { router } from "../connections/connect";
import {
  makeConnectionError,
  makeUndefinedError,
  makeBadInputError,
} from "../utils/error";
import * as t from "io-ts";
import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";
import { sequenceT } from "fp-ts/lib/Apply";

const studentId = t.type({
  id: t.number,
});

type studentId = t.TypeOf<typeof studentId>;

const seqteither = sequenceT(E.either);

const validateId = (id: string) => {
  const regex = /[0-9]+$/;
  return regex.test(id) ? true : false;
};

const ValidateIdEither = (id) =>
  pipe(
    seqteither(id),
    E.map(([x]: any) => ({ id: x.id })),
    E.mapLeft((_) => makeUndefinedError("Could not read request params"))
  );

export const student = router();

student.get("/", async (req, res, err) => {
  if (err) {
    return res.json({
      ...makeConnectionError("Failed to fetch student list."),
    });
  }
  const students = await getRepository(Students).find();
  return res.json({ students: students });
});

student.get("/id/:id", async (req, res, err) => {
  const reqId = req.params.id;
  if (!validateId(reqId)) {
    return res.json({ ...makeBadInputError("Invalid id provided.") });
  }
  return E.fold(
    (err: any) => res.json({ ...err }),
    (response: any) =>
      res.json({
        id: response.id,
      })
  )(ValidateIdEither(studentId.decode({ id: parseInt(reqId) })));
});
