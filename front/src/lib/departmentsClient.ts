import { IDepartment } from '../models';

class DepartmentsClient {
  private apiUrl = 'http://localhost:3001/departments';

  async list(): Promise<IDepartment[]> {
    const res = await fetch(`${this.apiUrl}`);

    return res.json();
  }
}

export const departmentsClient = new DepartmentsClient();
