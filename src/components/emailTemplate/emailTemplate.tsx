import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

function EmailTemplate({ setNewBody, template }: any) {
  const editorRef = useRef<any>();
  const handleEditorChange = () => {
    if (editorRef.current) {
      setNewBody(editorRef.current.getContent());
    }
  };

  return (
    <>
      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_KEY}
        onInit={(evt: any, editor: any) => (editorRef.current = editor)}
        initialValue={template}
        init={{
          height: 300,
          resize: false,
          menubar: false,
          branding: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'code',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
            'image',
            'textcolor',
            'preview',
          ],
          toolbar:
            'undo redo | formatselect | ' +
            'bold italic forecolor backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | image | code',
          file_picker_types: 'image',
          block_unsupported_drop: true,
          file_picker_callback: (callback: any, value: any, meta: any) => {
            // Provide file and text for the link dialog
            if (meta.filetype == 'file') {
              callback(value, { text: 'My text' });
            }

            // Provide image and alt text for the image dialog
            if (meta.filetype == 'image') {
              callback(value, { alt: 'My alt text' });
            }
          },

          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; margin-left:5px;}',
        }}
        onEditorChange={handleEditorChange}
      />
    </>
  );
}

export default EmailTemplate;
