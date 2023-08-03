import React from 'react';

export interface FormDate {
    firstName: string;
    lastName: string;
    email: string;
    age: string;
    university: string;
    department: string;
    hometown: string;
    states: string;
    country: string;
}

interface TableProps {
    data: FormDate[];
}

const Table: React.FC<TableProps> = ({ data }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>University</th>
                    <th>Department</th>
                    <th>Hometown</th>
                    <th>States</th>
                    <th>Country</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.email}</td>
                        <td>{item.age}</td>
                        <td>{item.university}</td>
                        <td>{item.department}</td>
                        <td>{item.hometown}</td>
                        <td>{item.states}</td>
                        <td>{item.country}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
