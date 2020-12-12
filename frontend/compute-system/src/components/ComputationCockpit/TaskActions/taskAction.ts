export interface TaskActionProps {
  taskId: string | number;
  allowReload?: boolean;
  makeReload: () => void;
}
