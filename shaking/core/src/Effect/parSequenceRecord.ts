import { sequence } from "../Record"

import { parEffect } from "./parEffect"

export const parSequenceRecord =
  /*#__PURE__*/
  (() => sequence(parEffect))()