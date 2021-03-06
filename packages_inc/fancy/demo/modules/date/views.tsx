import * as M from "mobx"
import React from "react"

import * as R from "../../../src"
import { useInterval } from "../../hooks/useInterval"

import { DateOps, updateDate } from "./def"
import { DateStateEnv, dateStateURI } from "./state"

import * as T from "@matechs/core/Effect"

// alpha
/* istanbul ignore file */

export const UpdateDate = R.UI.withRun<DateOps>()((run) =>
  T.pure(() => (
    <button
      onClick={() => {
        run(updateDate)
      }}
    >
      Update Date!
    </button>
  ))
)

const ShowDateComponent: React.FC<{ current: Date; foo: string }> = React.memo(
  ({ current, foo }) => {
    const [s, setS] = React.useState(0)
    useInterval(() => {
      setS(s + 1)
    }, 500)
    return <div>{`${current.toISOString()} - ${s} - ${foo}`}</div>
  }
)

export const ShowDate = R.UI.withState<DateStateEnv>()<{ foo: string }>(
  ({ foo, [dateStateURI]: date }) => <ShowDateComponent {...date} foo={foo} />
)

export const LogDate = R.UI.withState<DateStateEnv>()(({ [dateStateURI]: date }) => {
  React.useEffect(
    () =>
      M.autorun(() => {
        console.log(date.current)
      }),
    []
  )
  return <></>
})
