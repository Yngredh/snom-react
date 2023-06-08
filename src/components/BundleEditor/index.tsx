import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef, useState } from 'react';

export interface ITextEditorProps {
  initialValue : string,
  onChange: (value: string) => void
}

export const BundleEditor = (props: ITextEditorProps) => {
  const editorRef = useRef<Editor>(null);
  const [dirty, setDirty] = useState(false);

  useEffect(
    () => setDirty(false)
    , [props.initialValue]);
  
  const save = () => {
    if (editorRef.current) {
      const content = editorRef.current.editor?.getContent();
      setDirty(false);
      editorRef.current.editor?.setDirty(false);
      props.onChange(content!!);
      console.log(content);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: '1.5em',
      width: '100%',
      height: '90%'}}
      >
      <Editor
        apiKey={`${process.env.TINY_MCE_API_KEY}`}
        ref={editorRef}
        initialValue={props.initialValue}
        onDirty={() => setDirty(true)}
        init={{
          width: '85%',
          height: '100%',
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks |' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help | saveButton',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          setup: (editor) => {

            editor.ui.registry.addButton('saveButton', {
              icon: 'checkmark',
              tooltip: 'Save',
              enabled: true,
              onAction: (_) => save(),
            });
          }
        }}
      />
    </div>
  );
}