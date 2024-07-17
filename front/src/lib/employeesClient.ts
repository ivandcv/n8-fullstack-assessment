import { ListResponse, IEmployee, ICreateEmployee } from '../models';

// TODO fix issue with requests being called multiple times
// Possibly caused by multiple renders. EG. useEffect being called multiple times
// TODO handle errors
class EmployeesClient {
  private apiUrl = 'http://localhost:3001/employees';

  async list(pageNumber = 1, pageSize = 10): Promise<ListResponse<IEmployee>> {
    const res = await fetch(
      `${this.apiUrl}?page=${pageNumber}&limit=${pageSize}`,
    );

    return res.json();
  }

  async findById(id = '0'): Promise<IEmployee> {
    console.log('find by id was called');
    const res = await fetch(`${this.apiUrl}/${id}`);

    return res.json();
  }

  async create(employee: ICreateEmployee): Promise<IEmployee> {
    const res = await fetch(`${this.apiUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });

    return res.json();
  }

  async update(employee: ICreateEmployee): Promise<IEmployee> {
    const res = await fetch(`${this.apiUrl}/${employee.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });

    return res.json();
  }

  async delete(id: string): Promise<IEmployee> {
    const res = await fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE',
    });

    return res.json();
  }
}

export const employeesClient = new EmployeesClient();
