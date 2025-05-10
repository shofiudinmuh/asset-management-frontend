import { useEffect, useState } from 'react';
import { useModal } from '../../hooks/useModal';
import AssetTable from '../../components/tables/AssetTable';
import PageMeta from '../../components/common/PageMeta';
import PageBreadCrumb from '../../components/common/PageBreadCrumb';
import ComponentCard from '../../components/common/ComponentCard';
import Modal from '../../components/ui/Modal';
import Label from '../../components/form/Label';
import InputField from '../../components/form/input/InputField';
import { getAssets, createAsset, updateAsset, deleteAsset } from '../../api/assetApi';
import Select from '../../components/form/Select';
import { getLocations } from '../../api/locationApi';

export default function AssetPage() {
    const [assets, setAssets] = useState([]);
    const [assetName, setAssetName] = useState('');
    const [assetCategory, setAssetCategory] = useState('');
    const [assetSerialNumber, setAssetSerialNumber] = useState('');
    const [assetPurchaseDate, setAssetPurchaseDate] = useState('');
    const [assetExpiry, setAssetExpiry] = useState('');
    const [location, setLocation] = useState([]);
    const [assetLocation, setAssetLocation] = useState('');
    const [assetStatus, setAssetStatus] = useState('');
    const [selectedAsset, setSelectedAsset] = useState(null);
    const { isOpen, openModal, closeModal } = useModal();

    useEffect(() => {
        fetchAssets();
        fetchLocation();
    }, []);

    const fetchAssets = async () => {
        try {
            const res = await getAssets();
            setAssets(res.data.data.data);
        } catch (error) {
            console.log('Failed to fetch assets ', error);
        }
    };

    const fetchLocation = async () => {
        try {
            const loc = await getLocations();
            const formattedLocation = loc.data.data.data.map((locations) => ({
                value: locations.id,
                label: locations.name,
            }));
            setLocation(formattedLocation);
        } catch (error) {
            console.log('Failed to fetch location', error);
        }
    };

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

    const handleAddOrUpdateAsset = async () => {
        const assetData = {
            name: assetName,
            category: assetCategory,
            serial_number: assetSerialNumber,
            purchase_date: assetPurchaseDate,
            warranty_expiry: assetExpiry,
            location_id: assetLocation?.value ?? assetLocation,
            status: assetStatus,
        };

        try {
            if (selectedAsset) {
                await updateAsset(selectedAsset.id, assetData);
            } else {
                await createAsset(assetData);
            }

            await fetchAssets();
            closeModal();
            resetForm();
        } catch (error) {
            console.log('Failed to create asset', error);
        }
    };
    const handleEditAsset = (asset) => {
        setSelectedAsset(asset);
        setAssetName(asset.name);
        setAssetCategory(asset.category);
        setAssetSerialNumber(asset.serial_number);
        setAssetPurchaseDate(asset.purchase_date);
        setAssetExpiry(asset.warranty_expiry);
        setAssetLocation({ value: asset.location.id });
        setAssetStatus(asset.status);
        openModal();
    };

    const handleDeleteAsset = async (id) => {
        if (confirm('Are you sure want to delete this asset?')) {
            try {
                await deleteAsset(id);
                await fetchAssets();
            } catch (error) {
                console.error('Failed to delete asset', error);
            }
        }
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

                    <AssetTable
                        data={assets}
                        onDeleteAsset={handleDeleteAsset}
                        onEditAsset={handleEditAsset}
                    />
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
                        {selectedAsset ? 'Edit Asset' : 'Add New Asset'}
                    </h3>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault(); // Hindari reload halaman
                        handleAddOrUpdateAsset();
                    }}>
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
                            onChange={(e) => setAssetName(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>
                            Category <span className='text-error-500'>*</span>
                        </Label>
                        <Select
                            options={[
                                { value: 'Mesin', label: 'Mesin' },
                                { value: 'Peralatan', label: 'Peralatan' },
                                { value: 'Kendaraan', label: 'Kendaraan' },
                                { value: 'Bahan Baku', label: 'Bahan Baku' },
                            ]}
                            placeholder='Select category'
                            defaultValue={assetCategory}
                            onChange={(value) => setAssetCategory(value)}
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
                            onChange={(e) => setAssetSerialNumber(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>
                            Location <span className='text-error-500'>*</span>
                        </Label>
                        <Select
                            key={location.id}
                            options={location}
                            defaultValue={assetLocation}
                            onChange={(value) => setAssetLocation(value)}
                            placeholder='Select location'
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
                            onChange={(e) => setAssetPurchaseDate(e.target.value)}
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
                            onChange={(e) => setAssetExpiry(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>
                            Status <span className='text-error-500'>*</span>
                        </Label>
                        <Select
                            options={[
                                { value: 'Tersedia', label: 'Tersedia' },
                                { value: 'Dipinjam', label: 'Dipinjam' },
                                { value: 'Dalam Perbaikan', label: 'Dalam Perbaikan' },
                                { value: 'Rusak', label: 'Rusak' },
                            ]}
                            placeholder='Select status'
                            defaultValue={assetStatus}
                            onChange={(value) => setAssetStatus(value)}
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
                        <button
                            type='submit'
                            className='px-4 py-2 bg-brand-500 text-white rounded hover:bg-brand-600'>
                            {selectedAsset ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
