import { BaseEditor, BaseElement, BaseText } from 'slate';
import { ReactEditor } from 'slate-react';

interface CodeElement extends BaseElement {
  type: 'code' | null;
}

interface ParagraphElement extends BaseElement {
  type: 'paragraph';
}

interface TestKeyElement extends BaseElement {
  testKey: 'This is the Value.' | null;
}

interface SoCoolElement extends BaseElement {
  soCool: string;
}

interface BoldText extends BaseText {
  bold: boolean | null;
}

type CustomEditor = BaseEditor & ReactEditor;

type CustomElement =
  | BaseElement
  | CodeElement
  | ParagraphElement
  | TestKeyElement
  | SoCoolElement;

type CustomText = BaseText | BoldText;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
