import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef, useState } from 'react';
import { Button, EButton } from '../Button';

export interface ITextEditorProps {
  initialValue : string,
  onChange: (value: string) => void
}

export const BundleEditor = (props: ITextEditorProps) => {
  const [value, setValue] = useState(props.initialValue ?? '');

  useEffect(() => setValue(props.initialValue ?? ''), [props.initialValue]);

  useEffect(()=> {console.log(value)}, [value]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginTop: '1.5em',
      width: '90%',
      height: '90%',
      position: 'relative'}}
      >
      <Button style={{alignSelf: 'flex-end'}} type={EButton.SecondaryButton}
        onClick={() => props.onChange(value)}>Concluir Edição</Button>
      <Editor
        id='editor'
        apiKey={`${process.env.TINY_MCE_API_KEY}`}
        initialValue={props.initialValue}
        value={value}
        onEditorChange={(value) => setValue(value)}
        init={{
          width: '100%',
          height: '90%',
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
        }}
      />
    </div>
  );
}