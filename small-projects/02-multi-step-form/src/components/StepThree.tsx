type StepData = {
    hometown: string;
    states: string;
    country: string;
};

type StepThreeProps = StepData & {
    updateFields: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const StepThree = ({
    hometown,
    states,
    country,
    updateFields,
}: StepThreeProps) => {
    return (
        <div>
            <input
                type='text'
                placeholder='Hometown'
                name='hometown'
                value={hometown}
                onChange={updateFields}
            />
            <input
                type='text'
                placeholder='States'
                name='states'
                value={states}
                onChange={updateFields}
            />
            <input
                type='text'
                placeholder='Country'
                name='country'
                value={country}
                onChange={updateFields}
            />
        </div>
    );
};

export default StepThree;
