import { useState } from 'react';
import { useModal } from '../../hooks/useModal';
import PageMeta from '../../components/common/PageMeta';
import PageBreadCrumb from '../../components/common/PageBreadCrumb';
import ComponentCard from '../../components/common/ComponentCard';
import MaintenanceTable from '../../components/tables/MaintenanceTable';
import Modal from '../../components/ui/Modal';
import Label from '../../components/form/Label';
import InputField from '../../components/form/input/InputField';

export default function MaintenancePage() {
    const [maintenances, setMaintenances] = useState([]);
    const [maintenanceName, setMaintenanceName] = useState('');
    const [maintenanceCategory, setMaintenanceCategory] = useState('');
    const [maintenanceDate, setMaintenanceDate] = useState('');
    const [maintenanceDesc, setMaintenanceDesc] = useState('');
    const [maintenanceCost, setMaintenanceCost] = useState('');
    const [maintenancePerson, setMaintenancePerson] = useState('');
    const [selectedMaintenance, setSelectedMaintenance] = useState(null);
    const { isOpen, openModal, closeModal } = useModal();

    const resetForm = () => {
        setMaintenanceName('');
        setMaintenanceCategory('');
        setMaintenanceDate('');
        setMaintenanceDesc('');
        setMaintenanceCost('');
        setMaintenancePerson('');
        setSelectedMaintenance('');
    };

    const handleAddOrUpdateMaintenance = () => {
        if (selectedMaintenance) {
            // edit
            setMaintenances((prevMaintenances) => {
                prevMaintenances.map((maintenance) =>
                    maintenance.id === selectedMaintenance.id
                        ? {
                              ...maintenance,
                              name: maintenanceName,
                              maintenance_date: maintenanceDate,
                              description: maintenanceDesc,
                              cost: maintenanceCost,
                              technician: maintenancePerson,
                          }
                        : maintenance
                );
            });
        } else {
            // create new maintenance
            const newMaintenance = {
                name: maintenanceName,
                maintenance_date: maintenanceDate,
                description: maintenanceDesc,
                cost: maintenanceCost,
                technician: maintenancePerson,
            };

            setMaintenances([...maintenances, { ...newMaintenance }]);
        }

        closeModal();
        resetForm();
    };

    const handleEditMaintenance = (maintenance) => {
        setSelectedMaintenance(maintenance);
        setMaintenanceName(maintenance.asset.name);
        setMaintenanceDate(maintenance.maintenance_date);
        setMaintenanceDesc(maintenance.description);
        setMaintenanceCost(maintenance.cost);
        setMaintenancePerson(maintenance.technician.name);
        openModal();
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

                    <MaintenanceTable onEditMaintenance={handleEditMaintenance} />
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

                <form action=''>
                    <div>
                        <Label>
                            Name <span className='text-error-500'>*</span>
                        </Label>
                        <InputField
                            type='text'
                            id='name'
                            value={maintenanceName}
                            placeholder='Enter maintenance name'
                            onChange={(e) => maintenanceName(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>
                            Maintenance Date <span className='text-error-500'>*</span>
                        </Label>
                        <InputField
                            type='date'
                            id='maintenance_date'
                            value={maintenanceDate}
                            placeholder='Enter maintenance date'
                            onChange={(e) => maintenanceDate(e.target.value)}
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
                            onChange={(e) => maintenanceDesc(e.target.value)}
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
                            onChange={(e) => maintenanceCost(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>
                            PIC <span className='text-error-500'>*</span>
                        </Label>
                        <InputField
                            type='text'
                            id='technician'
                            value={maintenancePerson}
                            placeholder='Enter person in charge'
                            onChange={(e) => maintenancePerson(e.target.value)}
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
                            {selectedMaintenance ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
