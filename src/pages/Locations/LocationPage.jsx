import { useEffect, useState } from 'react';
import { useModal } from '../../hooks/useModal';
import PageMeta from '../../components/common/PageMeta';
import PageBreadCrumb from '../../components/common/PageBreadCrumb';
import ComponentCard from '../../components/common/ComponentCard';
import LocationTable from '../../components/tables/LocationTable';
import Modal from '../../components/ui/Modal';
import Label from '../../components/form/Label';
import InputField from '../../components/form/input/InputField';
import {
    createLocation,
    deleteLocation,
    getLocations,
    updateLocation,
} from '../../api/locationApi';
// import { createAsset } from '../../api/assetApi';

export default function LocationPage() {
    const [locations, setLocations] = useState([]);
    const [locationName, setLocationName] = useState('');
    const [locationAddress, setLocationAddress] = useState('');
    const [selectedLocation, setSelectedLocation] = useState(null);
    const { isOpen, openModal, closeModal } = useModal();

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const loc = await getLocations();
            setLocations(loc.data.data.data);
        } catch (error) {
            console.log('Failed to fetch locations', error);
        }
    };
    const resetForm = () => {
        setLocationName('');
        setLocationAddress('');
        setSelectedLocation('');
    };

    const handleAddOrUpdateLocation = async () => {
        const locationData = {
            name: locationName,
            address: locationAddress,
        };

        try {
            if (selectedLocation) {
                await updateLocation(selectedLocation.id, locationData);
            } else {
                await createLocation(locationData);
            }

            await fetchLocations();
            closeModal();
            resetForm();
        } catch (error) {
            console.log('Failed to create location', error);
        }
    };

    const handleEditLocation = (location) => {
        setSelectedLocation(location);
        setLocationName(location.name);
        setLocationAddress(location.address);
        openModal();
    };

    const handleDeleteLocation = async (id) => {
        if (confirm('Are you sure want to delete this asset? ')) {
            try {
                await deleteLocation(id);
                await fetchLocations();
            } catch (error) {
                console.error('Failed to delete location', error);
            }
        }
    };

    return (
        <>
            <PageMeta
                title='Locations | Asset & Resource Management System'
                description='Daftar Lokasi'
            />

            <PageBreadCrumb pageTitle='Locations' />

            <div className='space-y-2 px-2 mx-2 dark:bg-gray-800'>
                <ComponentCard>
                    <button
                        className='px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-blue-700 transition-colors
                    '
                        onClick={() => {
                            resetForm();
                            openModal();
                        }}>
                        Add New Location
                    </button>
                    <LocationTable
                        data={locations}
                        onDeleteLocation={handleDeleteLocation}
                        onEditLocation={handleEditLocation}
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
                        {selectedLocation ? 'Edit Location' : 'Add New Location'}
                    </h3>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAddOrUpdateLocation();
                    }}>
                    <div>
                        <Label>
                            Name <span className='text-error-500'>*</span>
                        </Label>
                        <InputField
                            type='text'
                            id='name'
                            name='name'
                            value={locationName}
                            placeholder='Enter location name'
                            onChange={(e) => setLocationName(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>
                            Address <span className='text-error-500'>*</span>
                        </Label>
                        <InputField
                            type='text'
                            id='address'
                            name='address'
                            value={locationAddress}
                            placeholder='Enter location address'
                            onChange={(e) => setLocationAddress(e.target.value)}
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
                            {selectedLocation ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
