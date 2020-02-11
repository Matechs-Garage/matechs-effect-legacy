import { effect as T } from "@matechs/effect";
import { sequenceS } from "fp-ts/lib/Apply";
import { pipe } from "fp-ts/lib/pipeable";
import Link from "next/link";
import { App } from "../src/app";
import { DT } from "../modules/date";

// alpha
/* istanbul ignore file */

export const Foo = App.ui.of(
  pipe(
    sequenceS(T.effect)({
      UpdateDate: DT.UpdateDate,
      ShowDate: DT.ShowDate
    }),
    T.map(v => () => (
      <>
        <v.ShowDate foo={"foo"} />
        <v.UpdateDate />
        <Link href={"/"}>
          <a>home</a>
        </Link>
      </>
    ))
  )
);
