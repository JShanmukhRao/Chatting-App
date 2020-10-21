import React from 'react'
import { Progress } from 'semantic-ui-react';

const ProgressBar=({uploadFile,percentUpload})=>{
return(
    uploadFile && 
<Progress
className="progress_bar"
percent={percentUpload}
progress
indicating
size="medium"
inverted
/>
);
}
export default ProgressBar;