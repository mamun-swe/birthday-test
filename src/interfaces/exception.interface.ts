type ErrorType = {
  field: string;
  message: string;
};

export interface IHttpErrorResponse {
  status: boolean;
  errors: ErrorType[];
}

export interface IHttpSuccessResponse {
  status: boolean;
  message: string;
  token?: string;
  data?: any;
  paginate?: any;
}
