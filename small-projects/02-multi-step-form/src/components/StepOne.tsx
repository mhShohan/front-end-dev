type StepData = {
    firstName: string;
    lastName: string;
    email: string;
};

type StepOneProps = StepData & {
    updateFields: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const StepOne = ({
    firstName,
    lastName,
    email,
    updateFields,
}: StepOneProps) => {
    return (
        <div>
            <input
                type='text'
                placeholder='First Name'
                name='firstName'
                value={firstName}
                onChange={updateFields}
            />
            <input
                type='text'
                placeholder='Last Name'
                name='lastName'
                value={lastName}
                onChange={updateFields}
            />
            <input
                type='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={updateFields}
            />
        </div>
    );
};

export default StepOne;
