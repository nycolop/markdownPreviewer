import { useEffect, useState } from "react";
import { ElementIdValue } from "../types";
import { marked } from "marked";
import { initialInput } from "../lib";
import DOMPurify from "dompurify";

export default function App() {
  const [input, setInput] = useState<string>(initialInput);
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    setOutput(DOMPurify.sanitize(marked.parse(input)));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<any>): void => {
    setInput(e.target.value);

    setOutput(
      DOMPurify.sanitize(marked.parse(e.target.value, { breaks: true }))
    );
  };

  return (
    <div className="container">
      <textarea
        data-testid={ElementIdValue.input}
        id={ElementIdValue.input}
        placeholder="Put your markdown here"
        value={input}
        onChange={handleInputChange}
      >
        {input}
      </textarea>

      <div
        dangerouslySetInnerHTML={{
          __html: output,
        }}
        data-testid={ElementIdValue.output}
        id={ElementIdValue.output}
      />
    </div>
  );
}
