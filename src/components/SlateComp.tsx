import { useCallback, useState } from 'react';
import {
  createEditor,
  BaseEditor,
  Descendant,
  Transforms,
  Editor,
  Text,
} from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { CodeElement, DefaultElement } from './ParaElements';
import { BoldLeaf } from './LaefComp';

type CustomElement = {
  type: string | null;
  bold?: boolean;
  children: CustomText[];
};
type CustomText = { text: string };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
];

const SlateComp = () => {
  const [editor] = useState(() => withReact(createEditor()));

  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderBoldLeaf = useCallback((props: any) => {
    return <BoldLeaf {...props} />;
  }, []);

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderBoldLeaf}
        onKeyDown={(event) => {
          if (!event.ctrlKey) return;

          switch (event.key) {
            case '`': {
              event.preventDefault();
              const [match] = Editor.nodes(editor, {
                match: (n: any) => n.type === 'code',
              });
              Transforms.setNodes(
                editor,
                { type: match ? null : 'code' },
                { match: (n: any) => Editor.isBlock(editor, n) },
              );
              console.log(match);
              break;
            }

            case 'b': {
              event.preventDefault();
              Transforms.setNodes(
                editor,
                { bold: true },
                { match: (n: any) => Text.isText(n), split: true },
              );
              break;
            }
          }
        }}
      />
    </Slate>
  );
};

export default SlateComp;
