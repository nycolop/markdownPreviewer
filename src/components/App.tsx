import { useState } from "react";
import { ElementIdValue } from "../types";

export default function App() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<any>): void => {
    setInput(e.target.value);

    setOutput(e.target.value);
  };

  return (
    <>
      <textarea
        data-testid={ElementIdValue.input}
        placeholder="Put your markdown here"
        id={ElementIdValue.input}
        onChange={handleInputChange}
        value={input}
      >
        {input}
      </textarea>

      <textarea
        data-testid={ElementIdValue.output}
        placeholder="Output"
        id={ElementIdValue.output}
        value={output}
        readOnly
      >
        {output}
      </textarea>
    </>
  );
}
