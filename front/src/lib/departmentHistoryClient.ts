import { IDepartmentHistory } from '../models';

class DepartmentHistoryClient {
  private apiUrl = import.meta.env.VITE_API_URL + '/department-history';

  async findByEmployee(id: number): Promise<IDepartmentHistory[]> {
    const res = await fetch(`${this.apiUrl}/employees/${id}`);

    return res.json();
  }
}

export const departmentHistoryClient = new DepartmentHistoryClient();
