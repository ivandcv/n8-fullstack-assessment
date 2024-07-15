import { ListResponse, IEmployee } from '../models';

class EmployeesClient {
  private apiUrl = 'http://localhost:3000/employees';

  async list(pageNumber = 1, pageSize = 10): Promise<ListResponse<IEmployee>> {
    const res = await fetch(
      `${this.apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    );

    return res.json();
  }
}

export const employeesClient = new EmployeesClient();
