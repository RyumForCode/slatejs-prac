import { useCallback, useState } from 'react';
import { createEditor, Descendant, Element, Transforms } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { CodeElement, DefaultElement } from '../editorModules/ParaElements';
import { BoldLeaf } from '../editorModules/LaefComp';
import EditorController from '../editorModules/EditorController';
import EditorControlComp from '../visualControlComponents/EditorControlComp';
import { withHistory } from 'slate-history';

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
];

const SlateComp = () => {
  const [editor] = useState(() => withReact(withHistory(createEditor())));

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

  const pasteEventHandler = (e: any) => {
    const { insertData } = editor;
    const clipboardData = e.clipboardData;

    const newData = new DataTransfer();
    e.preventDefault();

    newData.setData(
      'text/plain',
      clipboardData.getData('application/x-slate-fragment'),
    );
    editor.insertData(newData);
  };

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <EditorControlComp editor={editor} />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderBoldLeaf}
        onPaste={(e) => pasteEventHandler(e)}
        onKeyDown={(event) => {
          if (!event.ctrlKey) return;
          switch (event.key) {
            case '`': {
              event.preventDefault();
              EditorController.toggleCodeBlock(editor);
              break;
            }

            case 'b': {
              event.preventDefault();
              EditorController.toggleBoldMark(editor);
              break;
            }

            case 'p': {
              event.preventDefault();
              Transforms.setNodes(
                editor,
                { testKey: 'This is the Value.' },
                { match: (n) => Element.isElement(n) },
              );
              break;
            }

            case 'l': {
              event.preventDefault();
              EditorController.moveBlock(editor);
              break;
            }

            case `m`: {
              event.preventDefault();
              EditorController.insertWord(editor);
              break;
            }

            case 'd': {
              event.preventDefault();
              EditorController.testForMatchTest(editor);
              break;
            }
          }
        }}
      />
    </Slate>
  );
};

export default SlateComp;
