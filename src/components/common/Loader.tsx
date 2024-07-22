const Loader = (props: any) => {
  if (props.isLoading) {
    return (
      <div className="text-center d-inline">
        <i className="fa fa-spin fa-spinner"></i>
      </div>
    );
  } else {
    return null;
  }
};

export default Loader;
