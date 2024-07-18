import { IDepartment } from '../models';

class DepartmentsClient {
  private apiUrl = import.meta.env.VITE_API_URL + '/departments';

  async list(): Promise<IDepartment[]> {
    const res = await fetch(`${this.apiUrl}`);

    return res.json();
  }
}

export const departmentsClient = new DepartmentsClient();
