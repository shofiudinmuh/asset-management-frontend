import { useState } from 'react';
import ComponentCard from '../../common/ComponentCard';
import Radio from '../input/Radio';

export default function RadioButton() {
    const [selectedValue, setSelectedValues] = useState('option');

    const handleRadioChange = (value) => {
        setSelectedValues(value);
    };

    return (
        <ComponentCard title='Radio Buttons'>
            <div className='felx flex-wrap items-center gap-8'>
                <Radio
                    id='radio1'
                    name='gorup1'
                    value='option1'
                    checked={selectedValue === 'option1'}
                    onChange={handleRadioChange}
                    label='Default'
                />
            </div>
        </ComponentCard>
    );
}
