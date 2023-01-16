export type AlertType = {
  isOpen: boolean;
  severity: "error" | "success";
  massage: JSX.Element | string;
  action?: any;
};
