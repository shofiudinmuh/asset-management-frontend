import { useState } from 'react';
import { useModal } from '../../hooks/useModal';
import PageMeta from '../../components/common/PageMeta';
import PageBreadCrumb from '../../components/common/PageBreadCrumb';
import ComponentCard from '../../components/common/ComponentCard';
import DocumentTable from '../../components/tables/DocumentTable';
import Modal from '../../components/ui/Modal';
import Label from '../../components/form/Label';
import InputField from '../../components/form/input/InputField';
import FileInput from '../../components/form/input/FileInput';

export default function DocumentPage() {
    const [documents, setDocuments] = useState([]);
    const [documentAsset, setDocumentAsset] = useState('');
    const [documentName, setDocumentName] = useState('');
    const [documentDate, setDocumentDate] = useState('');
    const [documentFile, setDocumentFile] = useState(null);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const { isOpen, openModal, closeModal } = useModal();

    const resetForm = () => {
        setDocumentAsset('');
        setDocumentName('');
        setDocumentDate('');
        setDocumentFile(null);
        setSelectedDocument('');
    };

    const handleAddOrUpdateDocument = () => {
        if (selectedDocument) {
            // update document
            setDocuments((prevDocument) => {
                prevDocument.map((documents) =>
                    documents.id === selectedDocument.id
                        ? {
                              ...documents,
                              asset_id: documentAsset,
                              document_name: documentName,
                              file_path: documentFile,
                              updated_at: documentDate,
                          }
                        : documents
                );
            });
        } else {
            // create new document
            const newDocument = {
                asset_id: documentAsset,
                document_name: documentName,
                file_path: documentFile,
                updated_at: documentDate,
            };

            setDocuments([...documents, { ...newDocument }]);
        }

        closeModal();
        resetForm();
    };

    const handleEditDocument = (documents) => {
        setSelectedDocument(selectedDocument);
        setDocumentAsset(documents.asset_id);
        setDocumentName(documents.document_name);
        setDocumentFile(documents.file_path);
        setDocumentDate(documents.updated_at);
        openModal();
    };

    return (
        <>
            <PageMeta title='Documents Management | Asset & Resource Mangement System' />

            <PageBreadCrumb pageTitle='Documents Management' />

            <div className='space-y-2 px-2 mx-2 dark:bg-gray-800'>
                <ComponentCard>
                    <button
                        onClick={() => {
                            resetForm();
                            openModal();
                        }}
                        className='px-4 py-2 bg-brand-500 text-white'>
                        Add New Document
                    </button>

                    <DocumentTable onEditDocument={handleEditDocument} />
                </ComponentCard>
            </div>

            {/* modal */}

            <Modal
                isOpen={isOpen}
                onClose={() => {
                    resetForm();
                    closeModal();
                }}
                className='max-w-xl p-6'>
                <div className='flex flex-col gap-4'>
                    <h3 className='text-lg font-semibold text-gray-800 dark:text-white/90'>
                        {selectedDocument ? 'Edit Document' : 'Add New Document'}
                    </h3>
                </div>

                <form action=''>
                    <div>
                        <Label>
                            Asset<span className='text-error-500'>*</span>
                        </Label>
                        <InputField
                            type='text'
                            id='asset_id'
                            name='asset_id'
                            value={documentAsset}
                            placeholder='Choose asset'
                            onChange={(e) => documentAsset(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>
                            Document Name<span className='text-error-500'>*</span>
                        </Label>
                        <InputField
                            type='text'
                            id='document_name'
                            name='document_name'
                            value={documentName}
                            placeholder='Enter document name'
                            onChange={(e) => documentName(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>
                            File<span className='text-error-500'>*</span>
                        </Label>
                        <FileInput
                            type='file'
                            id='file'
                            name='file'
                            value={documentFile}
                            onChange={(e) => documentFile(e.target.value)}
                        />
                    </div>

                    <div className='flex justify-end gap-2 mt-4'>
                        <button
                            onClick={() => {
                                closeModal();
                                resetForm();
                            }}
                            className='px-4 py-2 border rounded text-gray-700'>
                            Cancel
                        </button>
                        <button className='px-4 py-2 bg-brand-500 text-white rounded hover:bg-brand-700'>
                            {selectedDocument ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
