import React from 'react';
import { useDropzone } from 'react-dropzone';

const DropzoneComponent = () => {
    const onDrop = (acceptedFiles) => {
        console.log('File dropped: ', acceptedFiles);
        //Handle upload files
    };
};

export default DropzoneComponent;
