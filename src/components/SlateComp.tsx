import { useState } from "react";
import { createEditor, BaseEditor, Descendant } from "slate";
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const initialValue : Descendant[] = [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
]

const SlateComp = () => {

    const [editor] = useState(() => withReact(createEditor()));

    return (
        <Slate editor = {editor} initialValue = {initialValue}>
          <Editable />
        </Slate>
    )
}

export default SlateComp;