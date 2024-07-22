class Helper {
  static isColError = (colName: string, errors: any) => {
    return errors?.some((el: any) => {
      return el?.name === colName;
    });
  };

  static getErrorMsg = (colName: string, errors: any) => {
    const errMsg = errors.find((el: any) => el?.name === colName);
    return errMsg ? errMsg?.errors[0] : '';
  };
}

export default Helper;
