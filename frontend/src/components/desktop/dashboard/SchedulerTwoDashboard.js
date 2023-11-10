import React, { Component, Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  MonthView,
  DayView,
  ViewSwitcher,
  Toolbar,
  DateNavigator,
  TodayButton,
  AppointmentTooltip,
  AppointmentForm,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import AddNewSchedule from "./../scheduler-two/AddNewSchedule";
import AddNewDashboardScheduleOnCellClick from "./AddNewDashboardScheduleOnCellClick";
import isEmpty from "../../../store/validations/is-empty";
import EditDashboardSchedule from "./EditDashboardSchedule";
import EditScheduleMeeting from "./EditScheduleMeeting";
import EditScheduleDayOff from "./EditScheduleDayOff";
import { connect } from "react-redux";
import store from "./../../../store/store";
import { SET_AUTH_API_STATUS } from "./../../../store/types";
import getYear from "date-fns/get_year";
import getMonth from "date-fns/get_month";
import getDate from "date-fns/get_date";
import getHours from "date-fns/get_hours";
import getMinutes from "date-fns/get_minutes";
import { startOfDay, endOfDay } from "date-fns";
import { startOfWeek, endOfWeek } from "date-fns";
import { getScheduleWithCalender } from "./../../../store/actions/scheduleAction";

const AppointmentsDisplayStyle = ({ children, style, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      //backgroundColor: children[1].props.data.taskColor,
      borderRadius: "10px",
      borderTop: "4px soild transparent",
      backgroundImage: children[1].props.data.taskColor,
      backgroundOrigin: "border-box",
      backgroundClip: "padding-box,border-box",
    }}
    className="scheduler_card_css"
  >
    {children}
    {/* {console.log(children[1].props.data.taskColor)} */}
  </Appointments.Appointment>
);

const WeekViewDisplayStyle = ({ children, style, ...restProps }) => (
  <WeekView.Layout
    {...restProps}
    style={
      {
        // ...style,
        // backgroundColor: children[1].props.data.taskColor,
        // borderRadius: "8px",
      }
    }
    className="time_scale"
  >
    sd
    {/* {children} */}
    {/* {console.log(children[1].props.data.taskColor)} */}
  </WeekView.Layout>
);

const AppointmentsContentDisplayStyle = ({ children, style, ...restProps }) => (
  <Appointments.AppointmentContent
    {...restProps}
    style={{
      ...style,
      // backgroundColor: restProps.data.taskColor,
      borderRadius: "8px",
    }}
    className="scheduler_label_css"
  >
    {/* {console.log(restProps)} */}

    <div
      style={{
        textAlign: "center",
        display: "flex",
        wordBreak: "break-all",
      }}
    >
      {/*<div style={{ background: "linear-gradient(#e66465, #9198e5)" }}>
        sadasdd
    </div>*/}
      <span style={{ fontSize: "11px", marginRight: "10px" }}>
        {restProps.data.emoji}
      </span>
      <p>{restProps.data.bookingName}</p>
    </div>

    {/* {console.log(children[1].props.data.taskColor)} */}
  </Appointments.AppointmentContent>
);

const styles = (theme) => ({
  button: {
    color: theme.palette.background.default,
    padding: 0,
  },
  text: {
    paddingTop: theme.spacing(1),
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

// const style = (theme) => ({
//   todayCell: {
//     backgroundColor: fade(theme.palette.primary.main, 0.1),
//     "&:hover": {
//       backgroundColor: fade(theme.palette.primary.main, 0.14),
//     },
//     "&:focus": {
//       backgroundColor: fade(theme.palette.primary.main, 0.16),
//     },
//   },
//   weekendCell: {
//     backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
//     "&:hover": {
//       backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
//     },
//     "&:focus": {
//       backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
//     },
//   },
//   today: {
//     backgroundColor: fade(theme.palette.primary.main, 0.16),
//   },
//   weekend: {
//     backgroundColor: fade(theme.palette.action.disabledBackground, 0.06),
//   },
//   button: {
//     color: theme.palette.background.default,
//     padding: 0,
//   },
//   text: {
//     paddingTop: theme.spacing(1),
//     overflow: "hidden",
//     textOverflow: "ellipsis",
//     whiteSpace: "nowrap",
//   },
// });

// const TimeTableCellBase = ({ classes, ...restProps }) => {
//   const { startDate } = restProps;
//   const date = new Date(startDate);
//   if (date.getDate() === new Date().getDate()) {
//     return (
//       <WeekView.TimeTableCell {...restProps} className={classes.todayCell} />
//     );
//   }
//   if (date.getDay() === 0 || date.getDay() === 6) {
//     return (
//       <WeekView.TimeTableCell {...restProps} className={classes.weekendCell} />
//     );
//   }
//   return <WeekView.TimeTableCell {...restProps} />;
// };

// const TimeTableCell = withStyles(style, { name: "TimeTableCell" })(
//   TimeTableCellBase
// );

// const DayScaleCellBase = ({ classes, ...restProps }) => {
//   const { startDate, today } = restProps;
//   if (today) {
//     return <WeekView.DayScaleCell {...restProps} className={classes.today} />;
//   }
//   if (startDate.getDay() === 0 || startDate.getDay() === 6) {
//     return <WeekView.DayScaleCell {...restProps} className={classes.weekend} />;
//   }
//   return <WeekView.DayScaleCell {...restProps} />;
// };

// const DayScaleCell = withStyles(style, { name: "DayScaleCell" })(
//   DayScaleCellBase
// );

const AppointmentBase = ({
  children,
  data,
  onClick,
  classes,
  toggleVisibility,
  onAppointmentMetaChange,
  ...restProps
}) => (
  <Appointments.Appointment {...restProps}>
    <React.Fragment>
      <IconButton
        className={classes.button}
        onClick={({ target }) => {
          toggleVisibility();
          onAppointmentMetaChange({
            target: target.parentElement.parentElement,
            data,
          });
        }}
      >
        <InfoIcon fontSize="small" />
      </IconButton>
      {children}
    </React.Fragment>
  </Appointments.Appointment>
);

const Appointment = withStyles(styles, { name: "Appointment" })(
  AppointmentBase
);

export class SchedulerTwoDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentViewName: "work-week",
      data: [],
      currentDate: new Date(),
      visible: false,
      open: false,
      scheduleData: {},
      bookCalenderModel: false,
      bookOnCellClickData: [],
      meetingPopup: false,
      dayOffPopup: false,
    };
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    if (
      !isEmpty(nextProps.appointments) &&
      nextProps.appointments !== nextState.data &&
      !nextState.hasSet
    ) {
      let finalSchedules = [];

      if (!isEmpty(nextProps.appointments)) {
        finalSchedules = nextProps.appointments.map((element) => ({
          title: element.bookingName,
          startDate: new Date(
            getYear(element.fromDate),
            getMonth(element.fromDate),
            getDate(element.fromDate),
            getHours(element.fromTime),
            getMinutes(element.fromTime)
          ),
          endDate: new Date(
            getYear(element.toDate),
            getMonth(element.toDate),
            getDate(element.toDate),
            getHours(element.toTime),
            getMinutes(element.toTime)
          ),
          id: element._id,
          ...element,
        }));
      }

      // console.log(finalSchedules);
      return {
        data: finalSchedules,
      };
    }

    if (isEmpty(nextProps.appointments)) {
      return {
        data: [],
      };
    }

    return null;
  }

  onCloseModal = () => {
    this.setState({
      open: false,
      bookCalenderModel: false,
      dayOffPopup: false,
      meetingPopup: false,
    });
  };

  toggleVisibility = () => {
    const { visible: tooltipVisibility } = this.state;
    // this.setState({ visible: !tooltipVisibility });
  };
  onAppointmentMetaChange = ({ data, target }) => {
    if (data.CATEGORY === "SCHEDULE") {
      this.setState({
        open: true,
        scheduleData: data,
      });
    } else if (data.CATEGORY === "MEETING") {
      this.setState({
        meetingPopup: true,
        scheduleData: data,
      });
    } else if (data.CATEGORY === "DAYOFF") {
      this.setState({
        dayOffPopup: true,
        scheduleData: data,
      });
    }
  };

  myAppointment(props) {
    return (
      <Appointment
        {...props}
        toggleVisibility={this.toggleVisibility}
        onAppointmentMetaChange={this.onAppointmentMetaChange}
      />
    );
  }

  currentDateChange = (currentDate) => {
    var userData = JSON.parse(localStorage.getItem("UserData"));
    // console.log(currentDate);
    this.setState({ currentDate });

    // console.log(currentDate);
    let startWeek = startOfWeek(currentDate);
    let endWeek = endOfWeek(currentDate);

    let newStartDate = startOfDay(startWeek);
    let endStartDate = endOfDay(endWeek);

    const scheduleData = {
      startDate: newStartDate,
      endDate: endStartDate,
      member: userData.id,
    };
    this.props.getScheduleWithCalender(scheduleData);

    // console.log(formData);
  };

  currentViewNameChange = (currentViewName) => {
    this.setState({ currentViewName });
  };

  onCellClick = (data) => {
    console.log(data);
    this.setState({
      bookCalenderModel: true,
      bookOnCellClickData: data,
    });
  };

  render() {
    const {
      data,
      currentDate,
      visible,
      appointmentMeta,
      currentViewName,
      scheduleData,
    } = this.state;
    return (
      <Fragment>
        <EditDashboardSchedule
          open={this.state.open}
          onCloseModal={this.onCloseModal}
          scheduleData={scheduleData}
        />
        <EditScheduleMeeting
          open={this.state.meetingPopup}
          onCloseModal={this.onCloseModal}
          scheduleData={scheduleData}
        />
        <EditScheduleDayOff
          open={this.state.dayOffPopup}
          onCloseModal={this.onCloseModal}
          scheduleData={scheduleData}
        />
        <AddNewDashboardScheduleOnCellClick
          bookCalenderModel={this.state.bookCalenderModel}
          onCloseModal={this.onCloseModal}
          bookOnCellClickData={this.state.bookOnCellClickData}
        />

        <Paper>
          <Scheduler
            data={data}
            // height={660}
          >
            <ViewState
              currentDate={currentDate}
              onCurrentDateChange={this.currentDateChange}
              currentViewName={currentViewName}
              onCurrentViewNameChange={this.currentViewNameChange}
            />
            {/* <MonthView /> */}

            <WeekView
              startDayHour={9}
              endDayHour={20}
              cellDuration={60}
              //   timeTableCellComponent={TimeTableCell}
              //   dayScaleCellComponent={DayScaleCell}
            />

            <WeekView
              name="work-week"
              displayName="Work Week"
              excludedDays={[0, 6]}
              startDayHour={9}
              endDayHour={20}
              cellDuration={60}
              layoutComponent={WeekViewDisplayStyle}
            />

            <DayView
              startDayHour={9}
              endDayHour={20}
              cellDuration={60}
              //   timeTableCellComponent={TimeTableCell}
              //   dayScaleCellComponent={DayScaleCell}
            />

            <Appointments
              appointmentComponent={AppointmentsDisplayStyle}
              appointmentContentComponent={AppointmentsContentDisplayStyle}
            />
            <AppointmentTooltip
              showCloseButton
              visible={visible}
              onVisibilityChange={this.toggleVisibility}
              appointmentMeta={appointmentMeta}
              onAppointmentMetaChange={this.onAppointmentMetaChange}
            />
            <AppointmentForm
              visible={false}
              onAppointmentDataChange={this.onCellClick}
            />
            <Toolbar />
            {/* <ViewSwitcher /> */}
            <DateNavigator />
            <TodayButton />
          </Scheduler>
        </Paper>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  apiStatus: state.auth.apiStatus,
});

export default connect(mapStateToProps, { getScheduleWithCalender })(
  SchedulerTwoDashboard
);
