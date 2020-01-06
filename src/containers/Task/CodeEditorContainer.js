import React from "react";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import { Button } from "@material-ui/core";

export default function CodeEditorContainer() {
  const [code, changeCode] = React.useState(`def a():
  return 0`);
  return (
    <div>
      <AceEditor
        placeholder="Placeholder Text"
        mode="python"
        theme="monokai"
        name="blah2"
        // onLoad={this.onLoad}
        onChange={changeCode}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={code}
        width="100%"
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2
        }}
      />
      <Button title={"aa"} />
    </div>
  );
}
