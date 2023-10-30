import React from "react";
import { Code } from "bright";

import theme from "./theme";
import styles from "./CodeSnippet.module.css";

function CodeSnippet(props) {
  // TODO: do a copy button with the code snippet
  return (
    <>
      <Code {...props} theme={theme} className={styles.wrapper} />
    </>
  );
}

export default CodeSnippet;
