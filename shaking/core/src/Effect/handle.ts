import { Cause, raise, withRemaining } from "../Exit"
import { NonEmptyArray } from "../NonEmptyArray"
import { Option } from "../Option"
import { Effect } from "../Support/Common/effect"

import { chainError_ } from "./chainError"
import { completed } from "./completed"

export const handle = <
  E,
  K extends string & keyof E,
  KK extends string & E[K],
  S2,
  R2,
  E2,
  A2
>(
  k: K,
  kk: KK,
  f: (
    _: Extract<
      E,
      {
        [k in K]: KK
      }
    >,
    remaining: Option<NonEmptyArray<Cause<any>>>
  ) => Effect<S2, R2, E2, A2>
) => <S, R, A>(
  _: Effect<S, R, E, A>
): Effect<
  S | S2,
  R & R2,
  | Exclude<
      E,
      {
        [k in K]: KK
      }
    >
  | E2,
  A | A2
> =>
  chainError_(_, (e, remaining) => {
    if (k in e) {
      if (e[k] === kk) {
        return f(e as any, remaining) as any
      }
    }
    return completed(
      withRemaining(raise(e), ...(remaining._tag === "Some" ? remaining.value : []))
    )
  })

export const makeHandle = <K extends string>(k: K) => <
  E extends { [k in K]: any },
  KK extends string & E[K],
  S2,
  R2,
  E2,
  A2
>(
  kk: KK,
  f: (
    _: Extract<
      E,
      {
        [k in K]: KK
      }
    >,
    remaining: Option<NonEmptyArray<Cause<any>>>
  ) => Effect<S2, R2, E2, A2>
) => handle<E, K, KK, S2, R2, E2, A2>(k, kk, f)