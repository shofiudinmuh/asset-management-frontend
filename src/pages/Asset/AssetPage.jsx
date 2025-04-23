import { useState } from 'react';
import { useModal } from '../../hooks/useModal';
import AssetTable from '../../components/tables/AssetTable';
import PageMeta from '../../components/common/PageMeta';
import PageBreadCrumb from '../../components/common/PageBreadCrumb';
import ComponentCard from '../../components/common/ComponentCard';
import Modal from '../../components/ui/Modal';
import Label from '../../components/form/Label';
import InputField from '../../components/form/input/InputField';

export default function AssetPage() {
    const [assets, setAssets] = useState([]);
    const [assetName, setAssetName] = useState('');
    const [assetCategory, setAssetCategory] = useState('');
    const [assetSerialNumber, setAssetSerialNumber] = useState('');
    const [assetPurchaseDate, setAssetPurchaseDate] = useState('');
    const [assetExpiry, setAssetExpiry] = useState('');
    const [assetLocation, setAssetLocation] = useState('');
    const [assetStatus, setAssetStatus] = useState('');
    const [selectedAsset, setSelectedAsset] = useState(null);
    const { isOpen, openModal, closeModal } = useModal();

    const resetForm = () => {
        setAssetName('');
        setAssetCategory('');
        setAssetSerialNumber('');
        setAssetPurchaseDate('');
        setAssetExpiry('');
        setAssetLocation('');
        setAssetStatus('');
        setSelectedAsset('');
    };

    const handleAddOrUpdateAsset = () => {
        if (selectedAsset) {
            // edit
            setAssets((prevAssets) => {
                prevAssets.map((asset) =>
                    asset.id === selectedAsset.id
                        ? {
                              ...asset,
                              name: assetName,
                              category: assetCategory,
                              serial_number: assetSerialNumber,
                              purchase_date: assetPurchaseDate,
                              warranty_expiry: assetExpiry,
                              location: assetLocation,
                              status: assetStatus,
                          }
                        : asset
                );
            });
        } else {
            // add new asset
            const newAsset = {
                name: assetName,
                category: assetCategory,
                serial_number: assetSerialNumber,
                purchase_date: assetPurchaseDate,
                warranty_expiry: assetExpiry,
                location: assetLocation,
                status: assetStatus,
            };

            setAssets([...assets, { ...newAsset }]);
        }

        closeModal();
        resetForm();
    };

    const handleEditAsset = (asset) => {
        setSelectedAsset(asset);
        setAssetName(asset.name);
        setAssetCategory(asset.category);
        setAssetSerialNumber(asset.serial_number);
        setAssetPurchaseDate(asset.purchase_date);
        setAssetExpiry(asset.warranty_expiry);
        setAssetLocation(asset.location);
        setAssetStatus(asset.status);
        openModal();
    };

    return (
        <>
            <PageMeta title='Assets | Asset & Resource Management System' description='Assets' />

            <PageBreadCrumb pageTitle='Assets' />

            <div className='space-y-2 px-2 mx-2 dark:bg-gray-800'>
                <ComponentCard>
                    <button
                        className='px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-blue-700 transition-colors'
                        onClick={() => {
                            resetForm();
                            openModal();
                        }}>
                        Add New Asset
                    </button>

                    <AssetTable onEditAsset={handleEditAsset} />
                </ComponentCard>
            </div>

            {/* modal */}
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    closeModal();
                    resetForm();
                }}
                className='max-w-xl p-6'>
                <div className='flex flex-col gap-4'>
                    <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>
                        {selectedAsset ? 'Edit Asset' : 'Add New Asser'}
                    </h3>
                </div>
                <form action=''>
                    <div>
                        <Label>
                            Name <span className='text-error-500'>*</span>
                        </Label>
                        <InputField
                            type='text'
                            id='name'
                            name='name'
                            value={assetName}
                            placeholder='Enter asset name'
                            onChange={(e) => assetName(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>
                            Category <span className='text-error-500'>*</span>
                        </Label>
                        <InputField
                            type='text'
                            id='category'
                            name='category'
                            value={assetCategory}
                            placeholder='Enter category name'
                            onChange={(e) => assetCategory(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>
                            Serial Number <span className='text-error-500'>*</span>
                        </Label>
                        <InputField
                            type='text'
                            id='serial_number'
                            name='serial_number'
                            value={assetSerialNumber}
                            placeholder='Enter serial number'
                            onChange={(e) => assetSerialNumber(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>
                            Purchase Date <span className='text-error-500'>*</span>
                        </Label>
                        <InputField
                            type='date'
                            id='purchase_date'
                            name='purchase_date'
                            value={assetPurchaseDate}
                            placeholder='Enter purchase date'
                            onChange={(e) => assetPurchaseDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>
                            Warranty Expiry <span className='text-error-500'>*</span>
                        </Label>
                        <InputField
                            type='date'
                            id='warranty_expiry'
                            name='warranty_expiry'
                            value={assetExpiry}
                            placeholder='Enter expiry date'
                            onChange={(e) => assetExpiry(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>
                            Status <span className='text-error-500'>*</span>
                        </Label>
                        <InputField
                            type='text'
                            id='status'
                            name='status'
                            value={assetStatus}
                            placeholder='Enter asset status'
                            onChange={(e) => assetStatus(e.target.value)}
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
                        <button className='px-4 py-2 bg-brand-500 text-white rounded hover:bg-brand-600'>
                            {selectedAsset ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
