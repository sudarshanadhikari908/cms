import { Link } from 'react-router-dom';
interface IProps {
  title: string;
  needCreateBtn: boolean;
  createUrl: string;
  exportButton?: boolean;
}

const ContentHeader = ({ title, needCreateBtn, createUrl, exportButton }: IProps) => {
  const baseURL = import.meta.env.VITE_API_BASE_URI;

  return (
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 font-weight-bold">{title}</h1>
          </div>
          <div className="col-sm-6">
            {needCreateBtn && (
              <Link to={createUrl} className="btn btn-primary float-right">
                <i className="fa fa-plus mr-2"></i>Add New
              </Link>
            )}
            {exportButton && (
              <a href={baseURL + '/customers/export'} className="btn btn-primary float-right">
                <i className="fas fa-file-export mr-2"></i>Export CSV
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentHeader;
