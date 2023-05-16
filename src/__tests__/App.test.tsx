import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../components/App";
import "../setupTests";
import { HtmlAttribute, ElementName, ElementIdValue } from "../types";

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

  test("When I enter text into the #editor element, the #preview element is updated as I type to display the content of the textarea", () => {
    render(<App />);
    const editorElement = screen.getByTestId(ElementIdValue.input);
    const previewElement = screen.getByTestId(ElementIdValue.output);

    fireEvent.change(editorElement, { target: { value: "test content" } });

    expect(previewElement).toHaveTextContent("test content");
  });

  test("When I enter GitHub flavored markdown into the #editor element, the text is rendered as HTML in the #preview element as I type (Hint: You don't need to parse Markdown yourself - you can import the Marked library for this: https://cdnjs.com/libraries/marked)", () => {
    render(<App />);
    const editorElement = screen.getByTestId(ElementIdValue.input);
    const previewElement = screen.getByTestId(ElementIdValue.output);

    fireEvent.change(editorElement, { target: { value: "# An h1 test" } });
    const h1Output = screen.getByRole("heading", { level: 1 });

    expect(previewElement).toHaveTextContent("An h1 test");
    expect(h1Output).toBeInTheDocument();
  });

  test("When my markdown previewer first loads, the default text in the #editor field should contain valid markdown that represents at least one of each of the following elements: a header (H1 size), a sub header (H2 size), a link, inline code, a code block, a list item, a blockquote, an image, and bolded text", () => {
    render(<App />);
    const editorElement = screen.getByTestId(ElementIdValue.output);
    const h1 = screen.getByRole("heading", { level: 1 });
    const h2 = screen.getByRole("heading", { level: 2 });
    const link = screen.getByRole("link");
    const inlineCode = screen.getByText("This is a Inline Code");
    const img = screen.getByRole("img");
    const bq = screen.getByText("This is a block quote");
    const bold = screen.getByText("This is a bolded text");
    const list = screen.getByText("This is a List Item");

    expect(editorElement).toBeInTheDocument();
    expect(h1).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(inlineCode.tagName).toBe(ElementName.code);
    expect(img).toBeInTheDocument();
    expect(bq).toBeInTheDocument();
    expect(bold.tagName).toBe(ElementName.strong);
    expect(list.tagName).toBe(ElementName.list);
  });

  test("When my markdown previewer first loads, the default markdown in the #editor field should be rendered as HTML in the #preview element", () => {
    render(<App />);
    const editorElement = screen.getByTestId(ElementIdValue.output);
    const h1 = screen.getByRole("heading", { level: 1 });
    const h2 = screen.getByRole("heading", { level: 2 });

    expect(editorElement).toBeInTheDocument();
    expect(h1).toBeInstanceOf(HTMLElement);
    expect(h2).toBeInstanceOf(HTMLElement);
  });
});
