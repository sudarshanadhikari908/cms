export interface RolesInterface {
  results?: RoleResults[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  next: number;
  previous: number;
}

interface RoleResults {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface RolesData {
  [key: string]: Permissions;
}

export interface Permissions {
  name: string;
  isChecked?: boolean;
  route: Routes[];
}

export interface APermissions {
  id: number;
  resource: string;
  path: string;
  description: string;
  method: string;
}

export interface IFormData {
  name: string;
  description: string;
  permissions: number[];
}

export interface Routes {
  path: string;
  method: string;
}
