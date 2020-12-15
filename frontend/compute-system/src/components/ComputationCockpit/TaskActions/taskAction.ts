export interface TaskActionProps {
  taskId: string | number;
  taskStatus?: string;
  allowReload?: boolean;
  makeReload: () => void;
}
