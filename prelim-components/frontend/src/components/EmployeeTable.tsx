import { Employee } from '../types/Employee';

interface EmployeeTableProps {
    title: string;
    employees: Employee[];
}

const EmployeeTable = ({ title, employees }: EmployeeTableProps) => {
    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 border-b text-left">ID</th>
                        <th className="py-2 px-4 border-b text-left">Name</th>
                        <th className="py-2 px-4 border-b text-left">Role</th>
                        <th className="py-2 px-4 border-b text-left">Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b">{employee.id}</td>
                            <td className="py-2 px-4 border-b">{employee.name}</td>
                            <td className="py-2 px-4 border-b">{employee.role}</td>
                            <td className="py-2 px-4 border-b">${employee.salary.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable; 