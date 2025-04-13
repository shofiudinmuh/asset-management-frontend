import ComponentCard from '../../common/ComponentCard';
import FileInput from '../input/FileInput';
import Label from '../Label';

export default function FileInputExample() {
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log('selected file: ', file.name);
        }
    };

    return (
        <ComponentCard title='File input'>
            <div>
                <Label>Upload file</Label>
                <FileInput onChange={handleFileChange} className='custom-class' />
            </div>
        </ComponentCard>
    );
}
