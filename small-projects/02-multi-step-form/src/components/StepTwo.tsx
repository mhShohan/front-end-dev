type StepData = {
    university: string;
    department: string;
    age: string;
};

type StepTwoProps = StepData & {
    updateFields: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const StepTwo = ({
    university,
    department,
    age,
    updateFields,
}: StepTwoProps) => {
    return (
        <div>
            <input
                type='text'
                placeholder='University'
                name='university'
                value={university}
                onChange={updateFields}
            />
            <input
                type='text'
                placeholder='Department'
                name='department'
                value={department}
                onChange={updateFields}
            />
            <input
                type='text'
                placeholder='Age'
                name='age'
                value={age}
                onChange={updateFields}
            />
        </div>
    );
};

export default StepTwo;
