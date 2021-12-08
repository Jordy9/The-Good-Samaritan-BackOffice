import React, { useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';


export const EditorComponent = () => {

    const [state, setstate] = useState('')

    return (
        <div>
            <Editor
                onEditorChange = {(cont) => setstate(cont)}
                value = {state}
                content="<p>This is the initial content of the editor</p>"
                init={{
                plugins: 'autolink link image lists print preview',
                toolbar: 'undo redo | formatselect | fontselect | fontsizeselect ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                // onChange={this.handleEditorChange}
            />
        </div>
    )
}
