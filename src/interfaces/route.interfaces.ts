export interface IRoute {
  path: string;
  title: string;
  in_drawer: boolean;
  element: JSX.Element;
}

export interface IAppRoute {
  path: string;
  title: string;
  in_drawer: boolean;
  element: JSX.Element;
  children?: IRoute[];
  multi_menu: boolean;
}
