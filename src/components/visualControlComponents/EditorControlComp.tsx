import CustomEditor from '../editorModules/EditorController';

const EditorControlComp = ({ editor }: any) => {
  return (
    <div>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          CustomEditor.toggleBoldMark(editor);
        }}
      >
        Bold
      </button>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          CustomEditor.toggleCodeBlock(editor);
        }}
      >
        Code Block
      </button>
    </div>
  );
};

export default EditorControlComp;
