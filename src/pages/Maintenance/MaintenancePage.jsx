import { useEffect, useState } from 'react';
import { useModal } from '../../hooks/useModal';
import PageMeta from '../../components/common/PageMeta';
import PageBreadCrumb from '../../components/common/PageBreadCrumb';
import ComponentCard from '../../components/common/ComponentCard';
import MaintenanceTable from '../../components/tables/MaintenanceTable';
import Modal from '../../components/ui/Modal';
import Label from '../../components/form/Label';
import InputField from '../../components/form/input/InputField';
import {
    createMaintenance,
    deleteMaintenance,
    getMaintenances,
    updateMaintenance,
} from '../../api/maintenanceApi';
import { getUsers, getUserSearch } from '../../api/usersApi';
import { getAssets } from '../../api/assetApi';
import Select from '../../components/form/Select';
import AsyncSelect from 'react-select/async';

export default function MaintenancePage() {
    const [maintenances, setMaintenances] = useState([]);
    const [assets, setAssets] = useState([]);
    const [maintenanceAsset, setMaintenanceAsset] = useState('');
    const [maintenanceDate, setMaintenanceDate] = useState('');
    const [maintenanceDesc, setMaintenanceDesc] = useState('');
    const [maintenanceCost, setMaintenanceCost] = useState('');
    const [persons, setPersons] = useState([]);
    const [maintenancePerson, setMaintenancePerson] = useState('');
    const [selectedMaintenance, setSelectedMaintenance] = useState(null);
    const { isOpen, openModal, closeModal } = useModal();

    useEffect(() => {
        fetchMaintenances();
        fetchAssets();
        fetchPerson();
        loadPersons();
    }, []);

    const fetchMaintenances = async () => {
        try {
            const maintenance = await getMaintenances();
            setMaintenances(maintenance.data.data.data);
        } catch (error) {
            console.log('Error fetching maintenances:', error);
        }
    };

    const fetchAssets = async () => {
        try {
            const asset = await getAssets();
            const formattedAssets = asset.data.data.data.map((asset) => ({
                value: asset.id,
                label: asset.name,
            }));
            setAssets(formattedAssets);
        } catch (error) {
            console.log('Error fetching assets:', error);
        }
    };

    const fetchPerson = async () => {
        try {
            const person = await getUsers();
            const formattedPersons = person.data.data.data.map((person) => ({
                value: person.id,
                label: person.name,
            }));
            setPersons(formattedPersons);
        } catch (error) {
            console.log('Error fetching persons:', error);
        }
    };

    const loadPersons = async (inputValue) => {
        try {
            const response = await getUserSearch(inputValue);
            return response.data.data.map((user) => ({
                value: user.id,
                label: user.name,
            }));
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    };

    const resetForm = () => {
        setMaintenanceAsset('');
        setMaintenanceDate('');
        setMaintenanceDesc('');
        setMaintenanceCost('');
        setMaintenancePerson('');
        setSelectedMaintenance('');
    };

    const handleAddOrUpdateMaintenance = async () => {
        const maintenanceData = {
            asset_id: maintenanceAsset?.value ?? maintenanceAsset,
            maintenance_date: maintenanceDate,
            description: maintenanceDesc,
            cost: maintenanceCost,
            technician_id: maintenancePerson?.value ?? maintenancePerson,
        };

        try {
            if (selectedMaintenance) {
                await updateMaintenance(selectedMaintenance.id, maintenanceData);
            } else {
                await createMaintenance(maintenanceData);
            }

            await fetchMaintenances();
            closeModal();
            resetForm();
        } catch (error) {
            console.log('Error adding/updating maintenance:', error);
        }
    };

    const handleEditMaintenance = (maintenance) => {
        setSelectedMaintenance(maintenance);
        setMaintenanceAsset({ value: maintenance.asset.id });
        setMaintenanceDate(maintenance.maintenance_date);
        setMaintenanceDesc(maintenance.description);
        setMaintenanceCost(maintenance.cost);
        setMaintenancePerson({ value: maintenance.technician.id });
        openModal();
    };

    const handleDeleteMaintenance = async (id) => {
        if (confirm('Are you sure you want to delete this maintenance?')) {
            try {
                await deleteMaintenance(id);
                await fetchMaintenances();
            } catch (error) {
                console.error('Error deleting maintenance:', error);
            }
        }
    };

    return (
        <>
            <PageMeta title='Maintenances | Asset & Resource Management System' />

            <PageBreadCrumb pageTitle='Maintenances' />

            <div className='space-y-2 px-2 dark:bg-gray-800'>
                <ComponentCard>
                    <button
                        className='px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-blue-700 transition-colors'
                        onClick={() => {
                            resetForm();
                            openModal();
                        }}>
                        Add New Maintenance
                    </button>

                    <MaintenanceTable
                        data={maintenances}
                        onEditMaintenance={handleEditMaintenance}
                        onDeleteMaintenance={handleDeleteMaintenance}
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
                    <h3 className='text-xl font-semibold text-gray-800 dark:text-white'>
                        {selectedMaintenance ? 'Edit Maintenance' : 'Add New Maintenance'}
                    </h3>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAddOrUpdateMaintenance();
                    }}>
                    <div>
                        <Label>
                            Asset <span className='text-error-500'>*</span>
                        </Label>
                        <Select
                            placeholder='Select asset'
                            // key={assets.id}
                            options={assets}
                            defaultValue={maintenanceAsset}
                            onChange={(value) => setMaintenanceAsset(value)}
                        />
                    </div>
                    <div>
                        <Label>
                            Maintenance Date <span className='text-error-500'>*</span>
                        </Label>
                        <InputField
                            type='date'
                            id='maintenance_date'
                            name='maintenance_date'
                            value={maintenanceDate}
                            placeholder='Enter maintenance date'
                            onChange={(e) => setMaintenanceDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>
                            Description <span className='text-error-500'>*</span>
                        </Label>
                        <InputField
                            type='text'
                            id='description'
                            value={maintenanceDesc}
                            placeholder='Enter description'
                            onChange={(e) => setMaintenanceDesc(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>
                            Cost <span className='text-error-500'>*</span>
                        </Label>
                        <InputField
                            type='number'
                            id='cost'
                            value={maintenanceCost}
                            placeholder='Enter maintenance cost'
                            onChange={(e) => setMaintenanceCost(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>
                            PIC <span className='text-error-500'>*</span>
                        </Label>
                        {/* <Select
                            placeholder='Select person in charge'
                            // key={persons.id}
                            options={persons}
                            defaultValue={maintenancePerson}
                            onChange={(value) => setMaintenancePerson(value)}
                        /> */}

                        <AsyncSelect
                            cacheOptions
                            loadOptions={loadPersons}
                            defaultOptions
                            value={maintenancePerson}
                            onChange={(value) => setMaintenancePerson(value)}
                            placeholder='Select person'
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
                            className='px-4 py-2 bg-brand-500 text-white rounded hover:bg-brand-700'>
                            {selectedMaintenance ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
