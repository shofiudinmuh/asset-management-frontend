import { GrTransaction } from 'react-icons/gr';
import Badge from '../ui/Badge';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import { TbBuildingWarehouse } from 'react-icons/tb';

export default function AssetManagementMetrics() {
    return (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6'>
            {/* metric item start */}
            <div className='rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] mg:p-6'>
                <div className='flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800'>
                    <GrTransaction className='text-gray-800 size-6 dark:text-white/90' />
                </div>

                <div className='flex items-end justify-between mt-5'>
                    <div>
                        <span className='text-sm text-gray-500 dark:text-gray-400'>
                            Transactions
                        </span>
                        <h4 className='mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90'>
                            3,847
                        </h4>
                    </div>
                    <Badge color='success'>
                        <FiArrowUp />
                        5,1%
                    </Badge>
                </div>
            </div>
            {/* metric item end */}

            {/* metric item start */}
            <div className='rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] mg:p-6'>
                <div className='flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800'>
                    <TbBuildingWarehouse className='text-gray-800 size-6 dark:text-white/90' />
                </div>

                <div className='flex items-end justify-between mt-5'>
                    <div>
                        <span className='text-sm text-gray-500 dark:text-gray-400'>Orders</span>
                        <h4 className='mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90'>
                            1,342
                        </h4>
                    </div>
                    <Badge color='error'>
                        <FiArrowDown />
                        5,1%
                    </Badge>
                </div>
            </div>
            {/* metric item end */}
        </div>
    );
}
