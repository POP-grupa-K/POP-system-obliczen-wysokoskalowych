export default interface AppNodeData {
  nodeId?: number;
  diagramId: number;
  isAppNode: boolean;
  appId?: string;
  appName?: string;
  actionId?: string;
  actionName?: string;
  addFormActive?: boolean;
  nextNodes: number[];
}
