import { useCallback, useState } from 'react';
import {
  createEditor,
  BaseEditor,
  Descendant,
  Transforms,
  Element,
  Editor,
} from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { CodeElement, DefaultElement } from './ParaElements';

type CustomElement = { type: string; children: CustomText[] };
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

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable
        renderElement={renderElement}
        onKeyDown={(event) => {
          if (event.key === '`' && event.ctrlKey) {
            event.preventDefault();

            const [match] = Editor.nodes(editor, {
              match: (n: any) => n.type === 'code',
            });

            Transforms.setNodes(
              editor,
              { type: match ? 'paragraph' : 'code' },
              {
                match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
              },
            );
          }
        }}
      />
    </Slate>
  );
};

export default SlateComp;
