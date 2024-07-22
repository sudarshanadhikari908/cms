import React, { useState } from 'react';
import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function TextEditor({ template, setConvertedContent }: any) {
  const blocksFromHTML = convertFromHTML(template);
  const state = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);

  const handleEditorChange = (state: any) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const [editorState, setEditorState] = useState(() => EditorState.createWithContent(state));

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };

  return (
    <div className="App">
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbar={{
          image: {
            alt: {
              present: false,
            },
          },
        }}
      />
    </div>
  );
}

export default TextEditor;
