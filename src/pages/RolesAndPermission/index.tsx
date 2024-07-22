import Layout from '../../pages/Layout';
import { Pagination } from 'react-bootstrap';
import ComponentLayout from '../../components/common/ComponentLayout';
import ContentHeader from '../../components/common/ContentHeader';

function RolesAndPermission() {
  return (
    <Layout>
      <ContentHeader title="Users" needCreateBtn={true} createUrl="" />
      <ComponentLayout>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Roles And Permisision</h3>
                <a className="btn btn-primary btn-sm float-sm-right" id="addNew" href="/roles-and-permissions/create">
                  <i className="fa fa-plus"></i> Add New
                </a>
              </div>
              <div className="card-header card-rounded search_card">
                <h3 className="card-title">Search</h3>
                <div className="card-tools"></div>
              </div>
              <div className="card-body searchTemplateCsp">
                <form method="get" action="/system/roles-and-permissions">
                  <div className="row">
                    <div className="col-lg-10 customSearch_Container">
                      <div className="form-group">
                        <input
                          value=""
                          name="keyword"
                          type="text"
                          className="form-control  "
                          id="keyword"
                          placeholder="Search by..."
                          autoComplete=""
                        />
                      </div>
                    </div>
                    <div className="col-lg-2 customSearch_Container">
                      <div className="search-form-action-buttons d-flex">
                        <a
                          className="btn btn-default custom_ResearchButton"
                          data-toggle="tooltip"
                          data-placement="top"
                          title=""
                          type="button"
                          href="/system/roles-and-permissions"
                          data-original-title="Reset"
                        >
                          <i className="fa fa-retweet"></i>
                        </a>
                        <button
                          data-toggle="tooltip"
                          data-placement="top"
                          title=""
                          type="submit"
                          className="btn btn-primary custom_SearchButton"
                          data-original-title="Search"
                        >
                          <i className="fa fa-search"></i>Search
                        </button>
                      </div>
                    </div>
                    <div className="card-body table-responsive p-3">
                      <table className="table  custom_Table">
                        <thead>
                          <tr>
                            <th className="tableHeaderCsp">S.N</th>
                            <th>Name</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>superuser</td>
                            <td>
                              <div className="roles-btn"></div>
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Manager</td>
                            <td>
                              <div className="roles-btn">
                                <a href="/roles-and-permissions/6/view" className="btn btn-primary btn-sm btn-edit">
                                  <i className="fa fa-eye"></i> View
                                </a>
                                <a href="/roles-and-permissions/6/edit" className="btn btn-primary btn-sm btn-edit">
                                  <i className="fa fa-edit"></i> Edit
                                </a>

                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm btn-delete"
                                  data-toggle="modal"
                                  data-target="#confirmDeleteModal"
                                  data-href="/system/roles-and-permissions/6?_method=DELETE"
                                  data-confirm-txt="Are you sure you want to delete?"
                                  data-header-txt="Confirm Delete"
                                  data-ok="Ok"
                                  data-cancel="Cancel"
                                >
                                  <i className="fa fa-trash"></i> Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Operator</td>
                            <td>
                              <div className="roles-btn">
                                <a
                                  href="/system/roles-and-permissions/4/view"
                                  className="btn btn-primary btn-sm btn-edit"
                                >
                                  <i className="fa fa-eye"></i> View
                                </a>
                                <a
                                  href="/system/roles-and-permissions/4/edit"
                                  className="btn btn-primary btn-sm btn-edit"
                                >
                                  <i className="fa fa-edit"></i> Edit
                                </a>

                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm btn-delete"
                                  data-toggle="modal"
                                  data-target="#confirmDeleteModal"
                                  data-href="/system/roles-and-permissions/4?_method=DELETE"
                                  data-confirm-txt="Are you sure you want to delete?"
                                  data-header-txt="Confirm Delete"
                                  data-ok="Ok"
                                  data-cancel="Cancel"
                                >
                                  <i className="fa fa-trash"></i> Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </form>
              </div>
              <div className="pagination-wrap">
                <Pagination>
                  <Pagination.Prev />
                  <Pagination.Item>1</Pagination.Item>
                  <Pagination.Next />
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </ComponentLayout>
    </Layout>
  );
}

export default RolesAndPermission;
