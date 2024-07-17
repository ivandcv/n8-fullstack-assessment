import { ListResponse, IEmployee } from '../models';

class EmployeesClient {
  private apiUrl = 'http://localhost:3001/employees';

  async list(pageNumber = 1, pageSize = 10): Promise<ListResponse<IEmployee>> {
    const res = await fetch(
      `${this.apiUrl}?page=${pageNumber}&limit=${pageSize}`,
    );

    return res.json();
  }

  async findById(id = '0'): Promise<IEmployee> {
    const res = await fetch(
      `${this.apiUrl}/${id}`,
    );

    return res.json();
  }
}

export const employeesClient = new EmployeesClient();
