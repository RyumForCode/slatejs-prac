import { BaseEditor, BaseElement, BaseText } from 'slate';
import { ReactEditor } from 'slate-react';

interface CodeElement extends BaseElement {
  type: 'code' | null;
}

interface ParagraphElement extends BaseElement {
  type: 'paragraph';
}

interface BoldText extends BaseText {
  bold: boolean | null;
}

type CustomEditor = BaseEditor & ReactEditor;

type CustomElement = BaseElement | CodeElement | ParagraphElement;

type CustomText = BaseText | BoldText;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
