import * as React from "react";
import * as PropTypes from "prop-types";
import { Theme, WithStyles, withStyles } from "@material-ui/core/styles";
import classNames from "clsx";
import { Appointments } from "@devexpress/dx-react-scheduler-material-ui";

export const XS_LAYOUT_WIDTH = 500;
export const SMALL_LAYOUT_MEDIA_QUERY = `@media (max-width: ${XS_LAYOUT_WIDTH}px)`;

export const addCommaAndSpaceToString = (string: string) =>
  string && `${string},\xa0`;

const styles = ({ palette, spacing }: Theme) => ({
  title: {
    fontWeight: "bold",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  textContainer: {
    lineHeight: 1,
    whiteSpace: "pre-wrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  middleContainer: {
    lineHeight: "0.9!important",
  },
  time: {
    display: "inline-block",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  teacher: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  location: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  content: {
    color: palette.common.white,
    padding: spacing(0.5, 1),
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    display: "flex",
    [`${SMALL_LAYOUT_MEDIA_QUERY}`]: {
      paddingLeft: spacing(0.5),
      paddingRight: spacing(0.5),
    },
  },
  shortContent: {
    padding: spacing(0.25, 1),
    [`${SMALL_LAYOUT_MEDIA_QUERY}`]: {
      paddingLeft: spacing(0.5),
      paddingRight: spacing(0.5),
    },
  },
  shortContainer: {
    display: "flex",
  },
  shortTime: {
    textOverflow: "initial",
    flexShrink: 0,
  },
  shortTitle: {
    flexShrink: 3,
  },
  container: {
    width: "100%",
  },
  recurringContainer: {
    width: `calc(100% - ${spacing(2)}px)`,
  },
  imageContainer: {
    width: spacing(2),
    height: spacing(2),
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

const VerticalAppointmentBase = ({
  classes,
  data,
  children,
  className,
  formatDate,
  recurringIconComponent: any,
  durationType,
  ...restProps
}: Appointments.AppointmentContentProps &
  WithStyles<any> & { className: any }) => {
  const repeat = !!data.rRule;
  const isShortHeight = durationType === "short";
  const isMiddleHeight = durationType === "middle";

  return (
    <div
      className={classNames(
        {
          [classes.content]: true,
          [classes.shortContent]: isShortHeight || isMiddleHeight,
        },
        className
      )}
      {...restProps}
    >
      {children || (
        <React.Fragment>
          <div
            className={classNames({
              [classes.container]: !repeat,
              [classes.recurringContainer]: repeat,
            })}
          >
            {isShortHeight ? (
              <div className={classes.shortContainer}>
                <div className={classNames(classes.title, classes.shortTitle)}>
                  {addCommaAndSpaceToString(data.title || "")}
                </div>
                <div className={classNames(classes.time, classes.shortTime)}>
                  {formatDate(data.startDate, {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </div>
              </div>
            ) : (
              <React.Fragment>
                <div className={classes.title}>{data.title}</div>
                <div
                  className={classNames({
                    [classes.textContainer]: true,
                    [classes.middleContainer]: isMiddleHeight,
                  })}
                >
                  <div className={classes.time}>
                    {formatDate(data.startDate, {
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </div>
                  <div className={classes.time}>&nbsp; - &nbsp;</div>
                  <div className={classes.time}>
                    {formatDate(data.endDate, {
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </div>
                </div>{" "}
                <div className={classes.location}>{data.locationName}</div>
                <div className={classes.teacher}>{data.teacherName}</div>
              </React.Fragment>
            )}
          </div>
          {/* {repeat ? (
            <div className={classes.imageContainer}>
              <RecurringIcon className={classes.image} />
            </div>   
          ) : undefined} */}
        </React.Fragment>
      )}
    </div>
  );
};

export const AppointmentContent = withStyles(styles as any, {
  name: "VerticalAppointment",
})(VerticalAppointmentBase) as any;
