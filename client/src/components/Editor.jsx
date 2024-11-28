import React, {useEffect, useMemo, useRef, useState} from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactQuill, { Quill,editor } from 'react-quill';
// import ImageResize  from 'quill-image-resize-module';
import 'react-quill/dist/quill.snow.css';
import katex from "katex";
import "katex/dist/katex.min.css";
import CustomToolbar from './CustomToolbar'
import JoditEditor from 'jodit-react';
window.katex = katex;
 
// Quill.register('modules/ImageResize',ImageResize);
const Editor=({content, setContent})=> {
    
    //const [text,setText] = useState('');
    const editorRef = useRef()
    
    const handleChange= (html)=> {
        setContent(html);
    }

    const options = [
      "bold",
      "italic",
      "|",
      "ul",
      "ol",
      "|",
      "font",
      "fontsize",
      "|",
      "outdent",
      "indent",
      "align",
      "|",
      "hr",
      "|",
      "fullsize",
      "brush",
      "|",
      "table",
      "link",
      "|",
      "undo",
      "redo",
    ];

    const config = useMemo(
      () => ({
        readonly: false,
        placeholder: "",
        defaultActionOnPaste: "insert_as_html",
        defaultLineHeight: 1.5,
        enter: "div",
        // options that we defined in above step.
        buttons: options,
        buttonsMD: options,
        buttonsSM: options,
        buttonsXS: options,
        statusbar: false,
        sizeLG: 900,
        sizeMD: 700,
        sizeSM: 400,
        toolbarAdaptive: false,
      }),
      []
    );

    const initialHtmlString = ""
    
    return (
      <>
        {/* <CustomToolbar /> */}
        
          <JoditEditor
            ref={editorRef}
            value={initialHtmlString || content}
            config={config}
            onChange={handleChange}
          />
        
      </>
    );
}
 


export default Editor;