import { useEffect, useState } from 'react';
import { Employee } from '../types/Employee';
import EmployeeTable from './EmployeeTable';

const EmployeeList = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/employees');
                if (!response.ok) {
                    throw new Error('Failed to fetch employees');
                }
                const data = await response.json();
                setEmployees(data);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    if (loading) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-red-600">{error}</div>;
    }

    const entryLevelEmployees = employees.filter(emp => emp.salary < 50000);
    const seniorEmployees = employees.filter(emp => emp.salary >= 50000);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Employee Directory</h1>
            <EmployeeTable title="Entry Level Employees" employees={entryLevelEmployees} />
            <EmployeeTable title="Senior Employees" employees={seniorEmployees} />
        </div>
    );
};

export default EmployeeList; 