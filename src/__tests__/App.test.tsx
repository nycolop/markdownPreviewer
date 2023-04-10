import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../components/App";
import "../setupTests";
import { HtmlAttribute, ElementName, ElementIdValue } from "../types";
import userEvent from "@testing-library/user-event";

describe("general tests", () => {
  test('I can see a <textarea> element with corresponding id="editor"', () => {
    // Setup
    render(<App />);
    const textAreaElement: HTMLElement = screen.getByTestId(
      ElementIdValue.input
    );
    const attrToCheck: HtmlAttribute = HtmlAttribute.id;
    const expectedId: ElementIdValue = ElementIdValue.input;
    const expectedElementType: ElementName = ElementName.textarea;

    // Verify
    expect(textAreaElement).toBeVisible();
    expect(textAreaElement).toBeInTheDocument();
    expect(textAreaElement).toHaveAttribute(attrToCheck, expectedId);
    expect(textAreaElement.tagName).toBe(expectedElementType);
  });

  test('I can see an element with corresponding id="preview"', () => {
    // Setup
    render(<App />);
    const element: HTMLElement = screen.getByTestId(ElementIdValue.output);
    const attrToCheck: HtmlAttribute = HtmlAttribute.id;
    const expectedId: ElementIdValue = ElementIdValue.output;

    // Verify
    expect(element).toBeVisible();
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute(attrToCheck, expectedId);
  });

  test("When I enter text into the #editor element, the #preview element is updated as I type to display the content of the textarea", async () => {
    // Setup
    render(<App />);
    const editorTextarea: HTMLElement = screen.getByTestId(
      ElementIdValue.input
    );
    const probeValue: string = "Probe";
    const cleanValue: string = "";
    let updatedText: HTMLElement;

    // Do
    userEvent.type(editorTextarea, probeValue);
    updatedText = await screen.findByTestId(ElementIdValue.output);
    expect(updatedText).toHaveTextContent(probeValue);

    userEvent.type(editorTextarea, cleanValue);
    updatedText = await screen.findByTestId(ElementIdValue.output);
    expect(updatedText).toBeEmptyDOMElement();
  });
});
