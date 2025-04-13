import React from 'react';
import { useDropzone } from 'react-dropzone';
import ComponentCard from '../../common/ComponentCard';
import { FiUpload } from 'react-icons/fi';

const DropzoneComponent = () => {
    const onDrop = (acceptedFiles) => {
        console.log('File dropped: ', acceptedFiles);
        //Handle upload files
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/png': [],
            'image/jpg': [],
            'image/webp': [],
            'image/svg+xml': [],
        },
    });

    return (
        <ComponentCard title='Dropzone'>
            <div className='transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500'>
                <form
                    {...getRootProps()}
                    className={`dropzone rounded-xl border-gray-300 p-7 lg:p-10 ${
                        isDragActive
                            ? 'border-brand-500 bg-gray-100 dark:bg-gray-800'
                            : 'border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900'
                    }`}
                    id='demo-upload'>
                    {/* hidden input */}
                    <input {...getInputProps()} />

                    <div className='dz-message flex flex-col items-center m-0!'>
                        {/* icon container */}
                        <div className='mb-[22px] flex justify-center'>
                            <div className='flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400'>
                                <FiUpload size={28} />
                            </div>
                            {/* text container */}
                            <h4 className='mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90'>
                                {isDragActive ? 'Drop file here' : 'Drag & Drop files here'}
                            </h4>

                            <span className='text-center mb-5 block w-full max-w-[290px] text-xm text-gray-700 dark:text-gray-400'>
                                Drag and drop your PNG, JPG, Webp, SVG images here or browse
                            </span>

                            <span className='font-medium underline text-theme-sm text-brand-500'>
                                Browese File
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </ComponentCard>
    );
};

export default DropzoneComponent;
