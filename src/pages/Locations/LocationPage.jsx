import { useState } from 'react';
import { useModal } from '../../hooks/useModal';
import PageMeta from '../../components/common/PageMeta';
import PageBreadCrumb from '../../components/common/PageBreadCrumb';
import ComponentCard from '../../components/common/ComponentCard';
import LocationTable from '../../components/tables/LocationTable';
import Modal from '../../components/ui/Modal';
import Label from '../../components/form/Label';
import InputField from '../../components/form/input/InputField';

export default function LocationPage() {
    const [locations, setLocations] = useState([]);
    const [locationName, setLocationName] = useState('');
    const [locationAddress, setLocationAddress] = useState('');
    const [selectedLocation, setSelectedLocation] = useState(null);
    const { isOpen, openModal, closeModal } = useModal();

    const resetForm = () => {
        setLocationName('');
        setLocationAddress('');
        setSelectedLocation('');
    };

    const handleAddOrUpdateLocation = () => {
        if (selectedLocation) {
            // edit location
            setLocations((prevLocations) => {
                prevLocations.map((location) =>
                    location.id === selectedLocation.id
                        ? { ...location, name: locationName, address: locationAddress }
                        : location
                );
            });
        } else {
            // add new location
            const newLocation = {
                name: locationName,
                address: locationAddress,
            };

            setLocations([...locations, { ...newLocation }]);
        }
        closeModal();
        resetForm();
    };

    const handleEditLocation = (location) => {
        setSelectedLocation(location);
        setLocationName(location.name);
        setLocationAddress(location.address);
        openModal();
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
                    <LocationTable onEditLocation={handleEditLocation} />
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
                    <button className='px-4 py-2 bg-brand-500 text-white rounded hover:bg-brand-600'>
                        {selectedLocation ? 'Update' : 'Add'}
                    </button>
                </div>
            </Modal>
        </>
    );
}
