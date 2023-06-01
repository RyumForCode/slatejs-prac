import { useCallback, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { CodeElement, DefaultElement } from '../editorModules/ParaElements';
import { BoldLeaf } from '../editorModules/LaefComp';
import CustomEditor from '../editorModules/CustomEditor';
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
    e.preventDefault();
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
              CustomEditor.toggleCodeBlock(editor);
              break;
            }

            case 'b': {
              event.preventDefault();
              CustomEditor.toggleBoldMark(editor);
              break;
            }
          }
        }}
      />
    </Slate>
  );
};

export default SlateComp;
