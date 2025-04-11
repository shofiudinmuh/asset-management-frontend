import { useState } from 'react';
import ComponentCard from '../../common/ComponentCard';

export default function CheckboxComponents() {
    const [isChecked, setIsChecked] = useState(false);
    const [isCheckedTwo, setIsCheckedTwo] = useState(false);
    const [isCheckedDisabled, setIsCheckedDisabled] = useState(false);

    return <ComponentCard></ComponentCard>;
}
