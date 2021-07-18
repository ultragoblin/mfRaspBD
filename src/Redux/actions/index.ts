import * as timingActions from "./timing";
import * as raspDataActions from "./raspData"
import * as collectDataActions from "./collectData";

export default {
  ...timingActions,
  ...raspDataActions,
  ...collectDataActions
}