import { Editor } from '@tinymce/tinymce-react';

export const BundleEditor = () => {

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: '1.5em',
      width: '100%',
      height: '90%'}}>
      <Editor
        apiKey={`${process.env.TINY_MCE_API_KEY}`}
        initialValue="<p>This is the initial content of the editor.</p>"
        onEditorChange={(value) => console.log(value)}
        init={{
          width: '85%',
          height: '100%',
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
    </div>
  );
}