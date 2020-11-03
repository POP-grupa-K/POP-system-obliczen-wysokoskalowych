import {Theme} from "@material-ui/core/styles";

export const toolbarStyle = (theme: Theme) => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }
}

export const rootStyle = () => {
  return {display: 'flex'};
};