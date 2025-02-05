interface JWTUser {
  role: string;
  id: number;
  username: string;
}

export interface IJWTtoken {
  exp: number;
  iat: number;
  user: JWTUser;
}

export interface IWillDelete {
  id: number | null;
  loading: boolean;
  show: boolean;
}
