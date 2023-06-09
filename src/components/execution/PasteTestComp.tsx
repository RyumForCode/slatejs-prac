import CryptoJS from 'crypto-js';
import { ClipboardEventHandler, useState } from 'react';
import { Element, Transforms, createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';

const PasteTestComp = () => {
  const [editor] = useState(() => withReact(withHistory(createEditor())));

  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'Paste test component.' }],
    },
  ];

  const paste: ClipboardEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const { clipboardData } = e;
    const cData = clipboardData;
    const data = new DataTransfer();
    // const fragment = JSON.parse(cData.getData('application/x-slate-fragment'));
    // fragment.isLengthOverflow = false;
    // const serializedFragment = JSON.stringify(fragment);
    // console.log(serializedFragment);
    Transforms.setNodes(
      editor,
      { soCool: 'ohyea' },
      { match: (n) => Element.isElement(n) },
    );
    console.log(
      JSON.parse(
        decodeURIComponent(
          CryptoJS.enc.Base64.parse(
            cData.getData('application/x-slate-fragment'),
          ).toString(CryptoJS.enc.Utf8),
        ),
      ),
    );
    return;

    const slateData = clipboardData.getData('application/x-slate-fragment'); // mime-type
    if (slateData) {
      const decodedData = decodeURIComponent(
        CryptoJS.enc.Base64.parse(slateData).toString(CryptoJS.enc.Utf8),
      );
      const parsedElements = JSON.parse(decodedData);
      console.log('parsed:', parsedElements);

      const newData = new DataTransfer();
      newData.setData('application/x-slate-fragment', slateData);
      editor.insertData(newData);
      return;
    }

    const textData = clipboardData.getData('text/plain');
    if (textData) {
      const newState: Element[] = [];
      console.log('mememe');
      // const newData = new DataTransfer();
      // newData.setData('application/x-slate-fragment', newState);
      // editor.insertData(newData);
      return;
    }

    // for (let i = 0; i < clipboardData.items.length; i++) {
    //   console.log(
    //     'List of the type : ',
    //     clipboardData.getData(clipboardData.items[i].type),
    //   );
    // }
  };

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable onPaste={(e) => paste(e)} />
    </Slate>
  );
};

export default PasteTestComp;
