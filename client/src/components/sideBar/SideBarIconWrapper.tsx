import React, { ReactNode } from "react";
import {
  IconButton,
  Tooltip,
  Fade,
  makeStyles,
  withStyles,
  InputProps,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { SvgIconComponent } from "@material-ui/icons";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
  menuButton: {
    color: "#fff",
    background: "transparent",
    cursor: "pointer",
    padding: "7px",
    transition:
      "all .15s cubic-bezier(.4,0,.2,1), color .33s cubic-bezier(.4,0,.2,1)",
    "&:hover": {
      background: "#3c4043",
    },
  },
}));

const CustomTooltip = withStyles({
  tooltipPlacementRight: {
    margin: "0 24px",
  },
})(Tooltip);

interface Props {
  icon: SvgIconComponent;
  title: string;
  handleClick: any;
  className?: any;
}

const SideBarIconWrapper: React.FC<Props> = ({
  icon,
  title,
  handleClick,
  className,
}: Props) => {
  const classes = useStyles();

  const Icon = icon;

  return (
    <div>
      <IconButton
        className={clsx(className, classes.menuButton)}
        color="inherit"
        size="small"
      >
        <CustomTooltip
          title={title}
          placement="right"
          enterDelay={500}
          leaveDelay={200}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          enterNextDelay={500}
        >
          {<Icon onClick={handleClick} />}
        </CustomTooltip>
      </IconButton>
    </div>
  );
};

export default SideBarIconWrapper;
