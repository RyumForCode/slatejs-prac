import { useState } from 'react';
import { Descendant, createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';

const PasteTestComp = () => {
  const [editor] = useState(() => withReact(withHistory(createEditor())));

  const initialValue: Descendant[] = [
    {
      type: 'paragraph',
      children: [{ text: 'Paste test component.' }],
    },
  ];

  const pasteInEditalbeComp = (e: any) => {
    e.preventDefault();
    const clipData = e.clipboardData;

    for (const i in clipData.items) {
      console.log('List of the type : ', clipData.items[i].type);
    }
  };

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable onPaste={(e) => pasteInEditalbeComp(e)} />
    </Slate>
  );
};

export default PasteTestComp;
