import { useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import {
  deserialize,
  serialize,
} from '../editorModules/SerializeAndDeserialize';

const SavingDatabaseComp = () => {
  const [editor] = useState(() => withReact(createEditor()));

  const initialValue: any = useMemo(
    () => deserialize(String(localStorage.getItem('content'))) || '',
    // () =>
    //   JSON.parse(String(localStorage.getItem('content'))) || [
    //     {
    //       type: 'paragraph',
    //       children: [
    //         { text: 'A line of text in a paragraph for the saving database.' },
    //       ],
    //     },
    //   ],
    [],
  );

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={(value: any) => {
        const isAstChange = editor.operations.some(
          (op) => 'set_selection' !== op.type,
        );
        if (isAstChange) {
          localStorage.setItem('content', serialize(value));
        }
      }}
    >
      <Editable />
    </Slate>
  );
};

export default SavingDatabaseComp;
