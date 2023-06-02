import { Editor, Element, Path, Text, Transforms } from 'slate';
import { CustomEditor } from '../../types-slate';

const EditorController = {
  isBoldMarkActive(editor: CustomEditor) {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.bold === true,
      universal: true,
    });

    return !!match;
  },

  isCodeBlockActive(editor: CustomEditor) {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.type === 'code',
    });

    return !!match;
  },

  toggleBoldMark(editor: CustomEditor) {
    const isActive = EditorController.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true },
    );
  },

  toggleCodeBlock(editor: CustomEditor) {
    const isActive = EditorController.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      {
        match: (n: any) => {
          return Element.isElement(n);
          // return Editor.isBlock(editor, n); - this codeline was in the official documents, but doesn't work well.
        },
      },
    );
  },

  moveBlock(editor: CustomEditor) {
    Transforms.moveNodes(editor, { at: [0], to: [5] });
  },

  insertWord(editor: CustomEditor) {
    Transforms.insertText(editor, 'testWord', {
      at: {
        anchor: { path: [0, 0], offset: 0 },
        focus: { path: [0, 0], offset: 5 },
      },
    });
  },

  testForMatchTest(editor: CustomEditor) {
    Transforms.setNodes(
      editor,
      { soCool: 'Yes it is' },
      {
        match: (n: any, path) => {
          return Path.equals(path, [3]);
        },
      },
    );
  },
};

export default EditorController;
