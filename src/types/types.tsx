export type AlertType = {
  isOpen: boolean;
  severity: "error" | "success";
  massage: string;
  action?: any;
};
