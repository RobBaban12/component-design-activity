import express from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

interface Employee {
    id: number;
    name: string;
    role: string;
    salary: number;
}

const employees: Employee[] = [
    { id: 1, name: "Patrick Gerona", role: "Software Engineer", salary: 45000 },
    { id: 2, name: "Daniel mark wiegand", role: "Senior Developer", salary: 75000 },
    { id: 3, name: "Nicholae Sara", role: "Junior Developer", salary: 40000 },
    { id: 4, name: "Paul Ardiente", role: "Tech Lead", salary: 85000 },
    { id: 5, name: "Prince Herrera", role: "Developer", salary: 48000 }
];

app.get('/api/employees', (req, res) => {
    res.json(employees);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 