import * as timingActions from "./timing";
import * as raspDataActions from "./raspData"
import * as collectDataActions from "./collectData";
import * as dataActions from "./data";

export default {
  ...dataActions,
  ...timingActions,
  ...raspDataActions,
  ...collectDataActions
};
