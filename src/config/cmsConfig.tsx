interface PermissionConfigInterface {
  modules: Array<ModulesPayloadInterface>;
}

export enum MethodList {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  ANY = 'any',
  OPTIONS = 'options',
}

export interface RoutePayloadInterface {
  path: string;
  method: MethodList;
  resource?: string;
  description?: string;
  isDefault?: boolean;
}

export interface ModulesPayloadInterface {
  name: string;
  resource: string;
  hasSubmodules: boolean;
  route?: string;
  icon?: string;
  subModules?: Array<SubModulePayloadInterface>;
  permissions?: Array<PermissionPayload>;
}

export interface SubModulePayloadInterface {
  name: string;
  resource?: string;
  route?: string;
  icon?: string;
  permissions?: Array<PermissionPayload>;
}

export interface PermissionPayload {
  name: string;
  resource?: string;
  route: Array<RoutePayloadInterface>;
}

const PermissionConfiguration: PermissionConfigInterface = {
  modules: [
    {
      name: 'Dashboard',
      resource: 'dashboard',
      hasSubmodules: false,
      route: '/',
      icon: 'fas fa-home',
    },
    {
      name: 'Users',
      resource: 'user',
      hasSubmodules: false,
      route: '/users',
      icon: 'fas fa-user-alt',
      permissions: [
        {
          name: 'View All Users',
          route: [
            {
              path: '/users',
              method: MethodList.GET,
            },
          ],
        },
        {
          name: 'Create User',
          route: [
            {
              path: '/users',
              method: MethodList.POST,
            },
          ],
        },
        {
          name: 'View User',
          route: [
            {
              path: '/users/:id',
              method: MethodList.GET,
            },
          ],
        },
        {
          name: 'Update User',
          route: [
            {
              path: '/users/:id',
              method: MethodList.PUT,
            },
          ],
        },
        {
          name: 'Delete User',
          route: [
            {
              path: '/users/:id',
              method: MethodList.DELETE,
            },
          ],
        },
      ],
    },
    {
      name: 'Auction Management',
      resource: 'auction',
      hasSubmodules: false,
      route: '/auctions',
      icon: 'fas fa-tasks',
      permissions: [
        {
          name: 'View All Auctions',
          route: [
            {
              path: '/auctions',
              method: MethodList.GET,
            },
          ],
        },
        {
          name: 'View Auction',
          route: [
            {
              path: '/auctions/:id',
              method: MethodList.GET,
            },
          ],
        },
        {
          name: 'Create Auction',
          route: [
            {
              path: '/auctions',
              method: MethodList.POST,
            },
          ],
        },
        {
          name: 'Update Auction',
          route: [
            {
              path: '/auctions/:id',
              method: MethodList.PUT,
            },
          ],
        },
        {
          name: 'Start Auction',
          route: [
            {
              path: '/auctions/:id/start',
              method: MethodList.POST,
            },
          ],
        },
        {
          name: 'Close Auction',
          route: [
            {
              path: '/auctions/:id/close',
              method: MethodList.POST,
            },
          ],
        },
        {
          name: 'Pause/Unpause Auction',
          route: [
            {
              path: '/auctions/:id/pause',
              method: MethodList.POST,
            },
          ],
        },
        {
          name: 'Finalize Auction',
          route: [
            {
              path: '/auctions/:address/finalize',
              method: MethodList.POST,
            },
          ],
        },
      ],
    },
    {
      name: 'Customers',
      resource: 'customer',
      hasSubmodules: false,
      route: '/customers',
      icon: 'fas fa-users',
      permissions: [
        {
          name: 'View All Customers',
          route: [
            {
              path: '/customers',
              method: MethodList.GET,
            },
          ],
        },
        {
          name: 'View Customer',
          route: [
            {
              path: '/customers/:id',
              method: MethodList.GET,
            },
          ],
        },
        {
          name: 'Export Customers',
          route: [
            {
              path: '/customers/export',
              method: MethodList.GET,
            },
          ],
        },
      ],
    },
    {
      name: 'System Settings',
      resource: 'role',
      icon: 'fas fa-cogs',
      route: '#',
      hasSubmodules: true,
      subModules: [
        {
          name: 'Roles and Permissions',
          resource: 'role',
          icon: 'fas fa-user-lock',
          route: '/roles-and-permissions',
          permissions: [
            {
              name: 'View All Roles',
              route: [
                {
                  path: '/roles',
                  method: MethodList.GET,
                },
              ],
            },
            {
              name: 'Create Role',
              route: [
                {
                  path: '/roles',
                  method: MethodList.POST,
                },
              ],
            },
            {
              name: 'View Role',
              route: [
                {
                  path: '/roles/:id',
                  method: MethodList.GET,
                },
              ],
            },
            {
              name: 'Update Role',
              route: [
                {
                  path: '/roles/:id',
                  method: MethodList.PUT,
                },
              ],
            },
            {
              name: 'Delete Role',
              route: [
                {
                  path: '/roles/:id',
                  method: MethodList.DELETE,
                },
              ],
            },
          ],
        },
        {
          name: 'Email Templates',
          resource: 'email-templates',
          route: '/email-templates',
          icon: 'fas fa-envelope',
          permissions: [
            {
              name: 'View all email templates',
              route: [
                {
                  path: '/email-templates',
                  method: MethodList.GET,
                },
              ],
            },
            {
              name: 'View email template',
              route: [
                {
                  path: '/email-templates/:id',
                  method: MethodList.GET,
                },
              ],
            },
            {
              name: 'Update email template',
              route: [
                {
                  path: '/email-templates/:id',
                  method: MethodList.PUT,
                },
              ],
            },
            {
              name: 'Delete email template',
              route: [
                {
                  path: '/email-templates/:id',
                  method: MethodList.DELETE,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default PermissionConfiguration;
