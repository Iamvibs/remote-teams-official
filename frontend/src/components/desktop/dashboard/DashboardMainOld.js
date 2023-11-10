import React, { Component, Fragment } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Select from "react-select";
import Checkbox from "rc-checkbox";
import "rc-checkbox/assets/index.css";
import LeftNavbar from "../header/LeftNavbar";
import PageTitle from "../common/PageTitle";
import TopNavbar from "../header/TopNavbar";
import { connect } from "react-redux";
import { updateUserDemoWalkthroughFlag } from "./../../../store/actions/authAction";
import isEmpty from "../../../store/validations/is-empty";
import io from "socket.io-client";
import GreenButtonSmallFont from "../common/GreenButtonSmallFont";
import GreenLinkSmallFont from "../common/GreenLinkSmallFont";
import DashboardProjectStatusBarGraph from "./DashboardProjectStatusBarGraph";
import DashboardProjectReportBarGraph from "./DashboardProjectReportBarGraph";
import DashboardCostVarianceChart from "./DashboardCostVarianceChart";
import DashboardInvoicesIssuedChart from "./DashboardInvoicesIssuedChart";
import DashboardExpenseVsIncomeChart from "./DashboardExpenseVsIncomeChart";
import DashboardInvoiceSummaryChart from "./DashboardInvoiceSummaryChart";
import DashboardYearlyExpenseReportChart from "./DashboardYearlyExpenseReportChart";
import DashboardAddNewTaskModal from "./DashboardAddNewTaskModal";
import InputFieldNumber from "../common/InputFieldNumber";
import {
  getAllToDo,
  updateToDo,
  invoicesIssuedByMonth,
  paidInvoicesIssuedByMonth,
  getCurrentTaskData,
  getExpenseData,
  getYearlyTotalExpense,
  getYearlyBilledExpense,
  getYearlyMisExpense,
  getInvoiceSummary,
  createWorkLog,
  updateWorklogByid,
  getProjectTaskStatusReport,
  getCostVariance,
  getTicketSummary,
  getProjectTimeline,
  getProjectCountDown,
  getProjectTaskCopletion,
} from "./../../../store/actions/dashboardAction";
import {
  getAllExpanses,
  approveBulkExpense,
} from "./../../../store/actions/financeAction";
import {
  getApprovalPendingLeaves,
  getOnLeaveToday,
  approveBulkLeaves,
} from "./../../../store/actions/calenderAction";
import {
  getAllProjectAction,
  onScheduleIndicator,
  getAllPinProjects,
} from "./../../../store/actions/projectAction";
import dateFns from "date-fns";
import { url } from "./../../../store/actions/config";
import getDayOfYear from "date-fns/get_day_of_year";
import DashboardGrid from "../dashboard-grid/DashboardGrid";
import WalkthroughDashboard1 from "../walkthrough/WalkthroughDashboard1";
import WalkthroughDashboard2 from "../walkthrough/WalkthroughDashboard2";
import WalkthroughNavbar1 from "../walkthrough/WalkthroughNavbar1";
import WalkthroughNavbar2 from "../walkthrough/WalkthroughNavbar2";
import WalkthroughAllProject1 from "../walkthrough/WalkthroughAllProject1";
import store from "./../../../store/store";
import { SET_WALKTHROUGH_PAGE } from "./../../../store/types";
import { withRouter } from "react-router-dom";
import FreeTrialAlmostOver from "./../popups/FreeTrialAlmostOver";

const dummyData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const optionsStatus = [
  { value: "Not Started", label: "Not Started" },
  { value: "In Progress", label: "In Progress" },
  { value: "Completed", label: "Completed" },
];

let userData = JSON.parse(localStorage.getItem("UserData"));

/*=============================
      Socket Connection
==============================*/
// let userData = JSON.parse(localStorage.getItem("UserData"));

const socket = io(`${url}`, {
  transports: ["false", "websocket"],
  query: {
    token: !isEmpty(userData) && userData.token,
  },
});

// const optionsProjectCountDown = [
//   { value: "Project 1", label: "Project 1" },
//   { value: "Project 2", label: "Project 2" },
//   { value: "Project 3", label: "Project 3" },
// ];

// const optionsProjectCostVar = [
//   { value: "Project 1", label: "Project 1" },
//   { value: "Project 2", label: "Project 2" },
//   { value: "Project 3", label: "Project 3" },
// ];

/*=============================
      Socket Connection
==============================*/
// let userData = JSON.parse(localStorage.getItem("UserData"));

// const socket = io(`${url}`, {
//   transports: ["false", "websocket"],
//   query: {
//     token: !isEmpty(userData) && userData.token,
//   },
// });

export class DashboardMainOld extends Component {
  constructor() {
    super();
    this.state = {
      // row 1
      selectedOptionStatus: optionsStatus[0],
      // row 2
      selectedOptionProjectCountDown: "",
      selectedOptionProjectCostVar: "",
      // row 3
      projectSelected: "",
      // row 5
      selectedOptionCurrentTaskStatus: optionsStatus[0],
      currentTaskTotalHoursSpent: 0,
      isCurrentTaskHoursSpentEditable: false,
      // row 7
      expenseTableRowCheckbox: false,
      leaveTableRowCheckbox: false,
      allToDo: [],
      approveExpanseList: [],
      approveLeaveList: [],
      optionsProjectCostVar: [],
      projectOptionsTimeline: [],
      optionsProjectCountDown: [],
      freeTrialAlmostOverPopup: false,
    };
    // socket.on("notifications", (data) => {
    //   console.log(data);
    // });
  }

  componentDidMount() {
    let OrganizationData = JSON.parse(localStorage.getItem("OrganizationData"));
    if (
      OrganizationData.planStatus === "CANCELLED" ||
      OrganizationData.planStatus === "PAYMENT_FAILED"
    ) {
      this.props.history.push("/profile");
    } else if (OrganizationData.planStatus === "TRIAL_ALMOST_OVER") {
      this.setState({
        freeTrialAlmostOverPopup: true,
      });
    }
    var data = JSON.parse(localStorage.getItem("UserData"));
    // console.log(data);
    if (!isEmpty(data) && data.demo === true) {
      store.dispatch({
        type: SET_WALKTHROUGH_PAGE,
        payload: "dashboard-1",
      });
    }

    // console.log(socket);

    socket.on("connect", (data) => {
      console.log("socket connected successfully");
    });

    // activeProjectDetailTabIndex set to 3 ..
    // since project timeline check complete ..
    // redirect to history of project detail page

    this.props.getAllToDo();
    this.props.invoicesIssuedByMonth();
    this.props.paidInvoicesIssuedByMonth();
    this.props.getAllExpanses();
    this.props.getApprovalPendingLeaves();
    this.props.getOnLeaveToday();
    this.props.getExpenseData();
    this.props.getYearlyTotalExpense();
    this.props.getYearlyBilledExpense();
    this.props.getYearlyMisExpense();
    this.props.getInvoiceSummary();
    this.props.getProjectTaskStatusReport();
    this.props.getAllProjectAction();
    this.props.getTicketSummary();
    this.props.getProjectTaskCopletion();
    this.props.getAllPinProjects();

    const formData = {
      date: getDayOfYear(new Date()),
      user: data.id,
    };

    this.props.getCurrentTaskData(formData);

    localStorage.setItem("activeProjectDetailTabIndex", 3);

    // if (!isEmpty(userData)) {
    //   let user = userData;
    //   user.demo = false;
    //   this.props.updateUserDemoWalkthroughFlag(user.id, user);
    // }
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    if (
      !isEmpty(nextProps.allToDo) &&
      nextProps.allToDo !== nextState.allToDo
    ) {
      return {
        allToDo: nextProps.allToDo,
      };
    }
    if (
      !isEmpty(nextProps.approvalExpense) &&
      nextProps.approvalExpense !== nextState.approvalExpense
    ) {
      return {
        approvalExpense: nextProps.approvalExpense,
      };
    }
    if (
      !isEmpty(nextProps.allPendingLeaves) &&
      nextProps.allPendingLeaves !== nextState.allPendingLeaves
    ) {
      return {
        allPendingLeaves: nextProps.allPendingLeaves,
      };
    }
    if (
      !isEmpty(nextProps.todaysTask) &&
      nextProps.todaysTask !== nextState.todaysTask
    ) {
      return {
        todaysTask: nextProps.todaysTask,
      };
    }
    if (
      !isEmpty(nextProps.allProjects) &&
      nextProps.allProjects !== nextState.allProjects &&
      !nextState.hasProjectSet
    ) {
      nextProps.getCostVariance(nextProps.allProjects[0]._id);
      nextProps.getProjectTimeline(nextProps.allProjects[0]._id);
      nextProps.getProjectCountDown(nextProps.allProjects[0]._id);
      nextProps.onScheduleIndicator(nextProps.allProjects[0]._id);
      let newArray =
        !isEmpty(nextProps.allProjects) &&
        nextProps.allProjects.map((project) => ({
          value: project._id,
          label: project.name,
        }));
      // console.log(nextProps.allProjects);
      return {
        allProjects: nextProps.allProjects,
        optionsProjectCostVar: newArray,
        projectOptionsTimeline: newArray,
        optionsProjectCountDown: newArray,
        projectSelected: {
          value: nextProps.allProjects[0]._id,
          label: nextProps.allProjects[0].name,
        },
        selectedOptionProjectCostVar: {
          value: nextProps.allProjects[0]._id,
          label: nextProps.allProjects[0].name,
        },
        selectedOptionProjectCountDown: {
          value: nextProps.allProjects[0]._id,
          label: nextProps.allProjects[0].name,
        },
        hasProjectSet: true,
      };
    }
    if (
      !isEmpty(nextProps.projectTimeline) &&
      nextProps.projectTimeline !== nextState.projectTimeline
    ) {
      return {
        projectTimeline: nextProps.projectTimeline,
      };
    }
    if (
      !isEmpty(nextProps.projectCountDown) &&
      nextProps.projectCountDown !== nextState.projectCountDown
    ) {
      return {
        projectCountDown: nextProps.projectCountDown,
      };
    }
    if (
      !isEmpty(nextProps.ticketSummary) &&
      nextProps.ticketSummary !== nextState.ticketSummary
    ) {
      return {
        ticketSummary: nextProps.ticketSummary,
      };
    }
    if (
      !isEmpty(nextProps.projectScheduleIndicator) &&
      nextProps.projectScheduleIndicator !== nextState.projectScheduleIndicator
    ) {
      return {
        projectScheduleIndicator: nextProps.projectScheduleIndicator,
      };
    }
    return null;
  }

  componentDidUpdate() {
    if (this.props.allToDo !== this.state.allToDo) {
      this.setState({
        allToDo: this.props.allToDo,
      });
    }
    if (this.props.allPendingLeaves !== this.state.allPendingLeaves) {
      this.setState({
        allPendingLeaves: this.props.allPendingLeaves,
      });
    }
    if (this.props.approvalExpense !== this.state.approvalExpense) {
      this.setState({
        approvalExpense: this.props.approvalExpense,
      });
    }
    if (
      this.props.projectScheduleIndicator !==
      this.state.projectScheduleIndicator
    ) {
      this.setState({
        projectScheduleIndicator: this.props.projectScheduleIndicator,
      });
    }
  }

  componentWillUnmount() {
    // remove activeProjectDetailTabIndex
    localStorage.removeItem("activeProjectDetailTabIndex", 3);
  }

  /*============================================================
      renderRow1
  ============================================================*/
  handleOnClickRemove = () => {
    console.log("icon clicked");
  };

  handleChangeStatusDropdown = (todoData) => (e) => {
    // this.setState({ selectedOptionStatus });
    console.log(`Option selected:`, todoData, e.value);

    let updatedStatus =
      e.value === "In Progress"
        ? "INPROGRESS"
        : e.value === "Not Started"
        ? "NOT_STARTED"
        : "COMPLETED";

    let formData = todoData;
    todoData.status = updatedStatus;

    this.props.updateToDo(todoData._id, formData);
  };

  renderProjectName = () => {
    return (
      <div className="d-card d-card--row1Colm2Card text-center">
        <p className="font-18-bold-space-light-uppercase pb-10">
          Pinned Project{" "}
          <img
            src={require("../../../assets/img/dashboard/new-pin-icon.svg")}
            alt="pin"
            className="d-r1-c2-icon"
          />
        </p>
        <img
          src={require("../../../assets/img/dashboard/dashboard-bag-icon.svg")}
          alt=""
          className="d-r1-c2-img"
        />
        <h3 className="d-r1-c2-text">Project Name</h3>
      </div>
    );
  };

  renderToDoTable = () => {
    const { allToDo } = this.state;
    // console.log(this.state.selectedOptionStatus);
    return (
      <div className="finances-table-tbody finances-table-tbody--dashbaordToDo">
        <table className="finances-table finances-table--dashbaordToDo">
          <tbody>
            {!isEmpty(allToDo) ? (
              allToDo.map((data, index) => (
                <tr key={index}>
                  <td>
                    <span className="font-14-semiBold color-offwhite-opacity-8">
                      {data.name}
                    </span>
                  </td>
                  {/* <td>
                    <span className="d-r1-c4-text2">{data.name}</span>
                  </td> */}
                  <td>
                    <span>
                      {data.status === "COMPLETED" ? (
                        // disabled
                        <Select
                          isSearchable={false}
                          className="react-select-container react-select-container--addInvoice react-select-container--addInvoice--dashboard-completed"
                          classNamePrefix="react-select-elements"
                          value={{ value: "Completed", label: "Completed" }}
                          placeholder="Select"
                          isDisabled={true}
                        />
                      ) : (
                        // active
                        <Select
                          isSearchable={false}
                          className="react-select-container react-select-container--addInvoice react-select-container--addInvoice--dashboard"
                          classNamePrefix="react-select-elements"
                          value={
                            data.status === "NOT_STARTED"
                              ? { value: "Not Started", label: "Not Started" }
                              : { value: "In Progress", label: "In Progress" }
                          }
                          onChange={this.handleChangeStatusDropdown(data)}
                          options={optionsStatus}
                          placeholder="Select"
                        />
                      )}
                    </span>
                  </td>
                  <td>
                    <span className="d-r1-c4-text2">
                      Due on {dateFns.format(data.dueDate, "DD/MM/YYYY")}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={0} className="text-center">
                  <span className="font-14-semibold table-data-empty-message">
                    No data found
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  renderRow1 = () => {
    let currentDate = new Date();
    return (
      <div className="dashboard-row1 row mx-0 flex-nowrap">
        <div>
          <div className="d-card d-card--row1Colm1Card1">
            <div className="row mx-0 flex-nowrap justify-content-between">
              <div className="d-r1-c1-text-block flex-shrink-0">
                <h2 className="d-r1-c1-text1">
                  {dateFns.format(currentDate, "Do MMM")}
                </h2>
                <p className="d-r1-c1-text2">
                  {dateFns.format(currentDate, "YYYY")}
                </p>
                <p className="d-r1-c1-text3">
                  {dateFns.format(currentDate, "dddd")}
                </p>
              </div>
              <div className="text-left">
                <h2 className="d-r1-c1-text1 d-r1-c1-text1--time">
                  {dateFns.format(currentDate, "HH:mm a")}
                </h2>
                <p className="d-r1-c1-text2">GMT+5.5</p>
                <p className="d-r1-c1-text3">Pune, India</p>
              </div>
            </div>
          </div>
          <div className="d-card d-card--row1Colm1Card2">
            <div className="row mx-0 align-items-center justify-content-between flex-nowrap">
              {/**font-18-semiBold */}
              <div className="row mx-0 align-items-end justify-content-start flex-nowrap">
                <img
                  src={require("../../../assets/img/dashboard/new-meeting-icon.svg")}
                  alt="meeting"
                  className="d-r1-c1-icon"
                />
                <h3 className="font-14-semibold color-offwhite-opacity-8">
                  Meeting at 4:30 PM
                </h3>
              </div>
              <i
                className="fa fa-times d-r1-c1-iconRemove"
                onClick={this.handleOnClickRemove}
              ></i>
            </div>
          </div>
          <div className="d-card d-card--row1Colm1Card2">
            <div className="row mx-0 align-items-center justify-content-between flex-nowrap">
              <div className="row mx-0 align-items-end justify-content-start flex-nowrap">
                <img
                  src={require("../../../assets/img/dashboard/new-presentation-icon.svg")}
                  alt="meeting"
                  className="d-r1-c1-icon"
                />
                <h3 className="color-offwhite-opacity-8 font-14-semibold">
                  New Announcemt
                </h3>
              </div>
              <i
                className="fa fa-times d-r1-c1-iconRemove"
                onClick={this.handleOnClickRemove}
              ></i>
            </div>
          </div>
        </div>
        {this.renderProjectName()}
        {this.renderProjectName()}
        <div className="d-card d-card--row1Colm4Card">
          <div className="row mx-0 justify-content-between">
            <h3 className="d-r1-c4-text1">to do list</h3>
            <DashboardAddNewTaskModal />
          </div>
          {this.renderToDoTable()}
        </div>
      </div>
    );
  };

  /*============================================================
      renderRow2
  ============================================================*/

  handleChangeProjectDropdown = (selectedOptionProject) => {
    this.setState({ selectedOptionProjectCountDown: selectedOptionProject });
    console.log(`Option selected:`, selectedOptionProject);
    this.props.getProjectCountDown(selectedOptionProject.value);
    this.props.onScheduleIndicator(selectedOptionProject.value);
  };

  renderRow2 = () => {
    const { projectCountDown, projectScheduleIndicator } = this.state;
    return (
      <div className="dashboard-row2 row mx-0 flex-nowrap">
        <div className="d-card d-card--row2Colm1Card">
          <h3 className="d-r2-c1-text1">project tasks completion status</h3>
          <DashboardProjectStatusBarGraph />
        </div>
        <div className="d-card d-card--row2Colm2Card">
          <h3 className="d-r2-c1-text1 pb-10">project countdown</h3>
          <div className="row mx-0 pt-20  justify-content-between">
            <div className="text-center">
              <Select
                isSearchable={false}
                className="react-select-container react-select-container--project-countdown"
                classNamePrefix="react-select-elements"
                value={this.state.selectedOptionProjectCountDown}
                onChange={this.handleChangeProjectDropdown}
                options={this.state.optionsProjectCountDown}
                placeholder="Project Name"
              />
              <h4 className="overview-percent-gradient-text overview-percent-gradient-text--project-countdown mt-20">
                {!isEmpty(projectScheduleIndicator)
                  ? projectScheduleIndicator[0].onschedulepercentage.toFixed()
                  : 0}
                %
              </h4>
              <p className="d-r2-c2-text1">On Schedule</p>
            </div>
            <div className="d-r2-c2-circular-div">
              <div className="d-r2-c2-circular-div__text-block">
                <h4 className="d-r2-c2-circular-div__text-block-text">
                  {!isEmpty(projectCountDown) ? projectCountDown.value : 0}
                </h4>
                <p className="d-r2-c2-circular-div__text-block-desc">
                  Days left
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /*============================================================
      renderRow3
  ============================================================*/
  handleChangeSelectProject = (projectSelected) => {
    this.setState({ projectSelected });
    this.props.getProjectTimeline(projectSelected.value);
  };

  renderRow3 = () => {
    const { projectTimeline } = this.state;

    return (
      <div className="d-card d-card--row3">
        <div className="row mx-0 align-items-center justify-content-between d-card--row3__row1">
          <Select
            className="react-select-container react-select-container--noBorder react-select-container--dashboard-timeline"
            classNamePrefix="react-select-elements"
            value={this.state.projectSelected}
            onChange={this.handleChangeSelectProject}
            options={this.state.projectOptionsTimeline}
            placeholder="PROJECT NAME"
            isSearchable={false}
          />
          <h3 className="d-r2-c1-text1">project timeline</h3>
          <GreenLinkSmallFont text="Check Complete" path="/dashboard" />
        </div>
        <div className="d-r3-overflow-div">
          <div className="row mx-0 flex-nowrap align-items-start d-r3-overflow-div__row-top">
            {!isEmpty(projectTimeline) &&
              projectTimeline.map(
                (data, index) =>
                  index % 2 === 1 && (
                    <div key={index} className="d-r3-text-block-top">
                      <p className="font-18-bold">{data.text}</p>
                      <p className="d-r3-text2">
                        {dateFns.format(data.createdAt, "DD-MMM-YYYY")}
                      </p>
                    </div>
                  )
              )}
          </div>
          <div className="row mx-0 flex-nowrap align-items-center d-r3-overflow-div__img-row">
            {!isEmpty(projectTimeline) &&
              projectTimeline.map((data, index) => (
                <Fragment key={index}>
                  <img
                    src={require("../../../assets/img/dashboard/new-dashboard-project-timeline-dot.png")}
                    alt=""
                    className="d-r3-dot-img"
                  />
                  <img
                    src={require("../../../assets/img/dashboard/new-dashboard-project-timeline-line.svg")}
                    alt=""
                    className="d-r3-dot-line"
                  />
                </Fragment>
              ))}
          </div>
          <div className="row mx-0 flex-nowrap align-items-start d-r3-overflow-div__row-bottom">
            {!isEmpty(projectTimeline) &&
              projectTimeline.map(
                (data, index) =>
                  index % 2 === 0 && (
                    <div key={index} className="d-r3-text-block-bottom">
                      <p className="font-18-bold">{data.text}</p>
                      <p className="d-r3-text2">
                        {dateFns.format(data.createdAt, "DD-MMM-YYYY")}
                      </p>
                    </div>
                  )
              )}
          </div>
        </div>
      </div>
    );
  };

  /*============================================================
      renderRow4
  ============================================================*/
  handleChangeProjectCostVarDropdown = (selectedOptionProject) => {
    // this.setState({
    //   hasProjectSet: false,
    // });
    this.setState({ selectedOptionProjectCostVar: selectedOptionProject });
    // console.log(`Option selected:`, selectedOptionProject);
    this.props.getCostVariance(selectedOptionProject.value);
  };

  renderRow4_1 = () => {
    return (
      <div className="dashboard-row4 row mx-0 flex-nowrap">
        <div className="d-card d-card--row4Colm1Card">
          <h3 className="d-r2-c1-text1">project task status report</h3>
          <DashboardProjectReportBarGraph />
        </div>
        <div className="d-card d-card--row4Colm2Card">
          <h3 className="d-r2-c1-text1">cost variance</h3>
          <Select
            isSearchable={false}
            className="react-select-container"
            classNamePrefix="react-select-elements"
            value={this.state.selectedOptionProjectCostVar}
            onChange={this.handleChangeProjectCostVarDropdown}
            options={this.state.optionsProjectCostVar}
            placeholder="Select"
          />
          <DashboardCostVarianceChart />
        </div>
      </div>
    );
  };

  renderRow4_2 = () => {
    return (
      <div className="dashboard-row4 row mx-0 flex-nowrap">
        <div className="d-card d-card--row5Colm1Card">
          <h3 className="d-r2-c1-text1">invoices issued</h3>
          <DashboardInvoicesIssuedChart />
        </div>
        <div className="d-card d-card--row5Colm1Card_2">
          <h3 className="d-r2-c1-text1">expense vs income</h3>
          <DashboardExpenseVsIncomeChart />
        </div>
      </div>
    );
  };

  /*============================================================
      renderRow5
  ============================================================*/

  handleChangeCurrentTaskStatusDropdown = (selectedTaskData) => (e) => {
    // this.setState({ selectedOptionCurrentTaskStatus });
    console.log(`Option selected:`, selectedTaskData);

    if (
      selectedTaskData.status === undefined ||
      selectedTaskData.status === 0
    ) {
      const formData = {
        name: "th233",
        schedule: selectedTaskData._id,
        task: selectedTaskData.taskdata[0]._id,
        user: selectedTaskData.assignedTo,
        hours: this.state.currentTaskTotalHoursSpent,
        // createdBy: data.id,
        // lastModifiedBy: data.id,
        status:
          e.value === "Not Started"
            ? "NOTSTARTED"
            : e.value === "Completed"
            ? "COMPLETED"
            : "INPROGRESS",
      };

      // console.log(formData);

      this.props.createWorkLog(formData);
    } else {
      // console.log("call update api");

      const formData = {
        name: "th233",
        schedule: selectedTaskData._id,
        task: selectedTaskData.taskdata[0]._id,
        user: selectedTaskData.assignedTo,
        hours: selectedTaskData.hours,
        // createdBy: data.id,
        // lastModifiedBy: data.id,
        status:
          e.value === "Not Started"
            ? "NOTSTARTED"
            : e.value === "Completed"
            ? "COMPLETED"
            : "INPROGRESS",
      };

      this.props.updateWorklogByid(selectedTaskData.worklogId, formData);
    }
  };

  handleChangeNumberTable = (e) => {
    this.setState({
      [e.target.name]: e.target.validity.valid ? e.target.value : "",
    });
  };

  handleOnClickCurrentTaskHoursIconSave = (selectedTaskData) => {
    this.setState({
      isCurrentTaskHoursSpentEditable: false,
    });
    console.log(selectedTaskData, this.state.currentTaskTotalHoursSpent);

    if (selectedTaskData.hours === undefined || selectedTaskData.hours === 0) {
      const formData = {
        name: "th233",
        schedule: selectedTaskData._id,
        task: selectedTaskData.taskdata[0]._id,
        user: selectedTaskData.assignedTo,
        hours: this.state.currentTaskTotalHoursSpent,
        // createdBy: data.id,
        // lastModifiedBy: data.id,
        status:
          selectedTaskData.status === undefined || selectedTaskData.status === 0
            ? "NOTSTARTED"
            : selectedTaskData.status,
      };

      // console.log(formData);

      this.props.createWorkLog(formData);
      this.setState({
        currentTaskTotalHoursSpent: 0,
      });
    } else {
      // console.log("call update api");

      const formData = {
        name: "th233",
        schedule: selectedTaskData._id,
        task: selectedTaskData.taskdata[0]._id,
        user: selectedTaskData.assignedTo,
        hours: this.state.currentTaskTotalHoursSpent,
        // createdBy: data.id,
        // lastModifiedBy: data.id,
        status: selectedTaskData.status,
      };

      this.props.updateWorklogByid(selectedTaskData.worklogId, formData);
      this.setState({
        currentTaskTotalHoursSpent: 0,
      });
    }
  };

  handleOnClickCurrentTaskHoursIconEdit = (selectedTaskData) => {
    this.setState({
      isCurrentTaskHoursSpentEditable: true,
      selectedTaskData: selectedTaskData,
    });
  };

  // renderTodayTasksTable
  renderTodayTasksTable = () => {
    const { isCurrentTaskHoursSpentEditable, todaysTask } = this.state;
    return (
      <>
        <div className="finances-table-thead">
          <table className="finances-table finances-table--dashboardTasks">
            <thead>
              <tr>
                <th>
                  <span>task</span>
                </th>
                <th>
                  <span>project</span>
                </th>
                <th>
                  <span>start date</span>
                </th>
                <th>
                  <span>timings</span>
                </th>
                <th>
                  <span>status</span>
                </th>
                <th>
                  <span>hours spent today</span>
                </th>
                <th>
                  <span>Total hours spent</span>
                </th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="finances-table-tbody finances-table-tbody--dashboardTasks">
          <table className="finances-table finances-table--dashboardTasks">
            <tbody>
              {!isEmpty(todaysTask) ? (
                todaysTask.map((data, index) => (
                  <tr key={index}>
                    <td>
                      <span className="font-18-semibold">
                        {data.taskdata[0].name}
                      </span>
                    </td>
                    <td>
                      <span className="font-18-semibold">
                        {data.projectdata[0].name}
                      </span>
                    </td>
                    <td>
                      <span className="font-18-semibold">
                        {dateFns.format(data.fromDate, "DD-MM-YYYY")}
                      </span>
                    </td>
                    <td>
                      <span className="font-18-semibold">
                        {dateFns.format(data.fromTime, "hh:mmA")}-
                        {dateFns.format(data.toTime, "hh:mmA")}{" "}
                      </span>
                    </td>
                    <td>
                      <span>
                        {data.status !== undefined &&
                        data.status === "COMPLETED" ? (
                          // disabled
                          <Select
                            isSearchable={false}
                            className="react-select-container react-select-container--addInvoice react-select-container--addInvoice--dashboard-completed"
                            classNamePrefix="react-select-elements"
                            value={{ value: "Completed", label: "Completed" }}
                            placeholder="Select"
                            isDisabled={true}
                          />
                        ) : (
                          // active
                          <Select
                            isSearchable={false}
                            className="react-select-container react-select-container--addInvoice react-select-container--addInvoice--dashboard"
                            classNamePrefix="react-select-elements"
                            value={
                              data.status === undefined ||
                              data.status === "NOTSTARTED" ||
                              data.status === 0
                                ? { value: "Not Started", label: "Not Started" }
                                : { value: "In Progress", label: "In Progress" }
                            }
                            onChange={this.handleChangeCurrentTaskStatusDropdown(
                              data
                            )}
                            options={optionsStatus}
                            placeholder="Select"
                          />
                        )}
                      </span>
                    </td>
                    <td>
                      <div className="row mx-0 flex-nowrap align-items-center justify-content-center current-tasks-hours-spent-td">
                        {isCurrentTaskHoursSpentEditable &&
                        data._id === this.state.selectedTaskData._id ? (
                          <>
                            <InputFieldNumber
                              containerClassName="container-login-flow-input container-login-flow-input--addExpenseSmall"
                              name="currentTaskTotalHoursSpent"
                              value={this.state.currentTaskTotalHoursSpent}
                              onChange={this.handleChangeNumberTable}
                              maxLength={2}
                              autoFocus={true}
                            />
                            <div
                              className="current-task-hours-spent-icon-div"
                              onClick={() =>
                                this.handleOnClickCurrentTaskHoursIconSave(data)
                              }
                            >
                              <i className="fa fa-save"></i>
                            </div>
                          </>
                        ) : (
                          <>
                            <InputFieldNumber
                              containerClassName="container-login-flow-input container-login-flow-input--dashboard-current-task container-login-flow-input--addExpenseSmall"
                              value={
                                data.hours === undefined
                                  ? this.state.currentTaskTotalHoursSpent
                                  : data.hours
                              }
                              maxLength={2}
                              isDisabled={true}
                            />
                            <div
                              className="current-task-hours-spent-icon-div"
                              onClick={() =>
                                this.handleOnClickCurrentTaskHoursIconEdit(data)
                              }
                            >
                              <i className="fa fa-pencil"></i>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className="font-18-regular">
                        {data.totalhours === undefined ? 0 : data.totalhours}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={0} className="text-center">
                    <span className="font-14-semibold table-data-empty-message">
                      No data found
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  renderRow5 = () => {
    return (
      <div className="dashboard-row5 row mx-0 flex-nowrap">
        <div className="d-card d-card--row5Colm2Card">
          <div className="row mx-0 justify-content-between">
            <h3 className="d-r5-c2-text1 d-r2-c1-text1">current tasks</h3>
            {/*<GreenButtonSmallFont
              text="Complete Timsheet"
              onClick={this.handleOnClickAddNewTodoList}
            />*/}
            <GreenLinkSmallFont text={"Complete Timsheet"} path="/timesheet" />
          </div>
          {this.renderTodayTasksTable()}
        </div>
      </div>
    );
  };

  /*============================================================
      renderRow6
  ============================================================*/
  renderRow6 = () => {
    const { ticketSummary } = this.state;

    let answeredTickets =
      !isEmpty(ticketSummary) &&
      ticketSummary.filter((ticket) => ticket.ticketStatus === "ANSWERED");
    let inprogressTickets =
      !isEmpty(ticketSummary) &&
      ticketSummary.filter((ticket) => ticket.ticketStatus === "INPROGRESS");
    let onholdTickets =
      !isEmpty(ticketSummary) &&
      ticketSummary.filter((ticket) => ticket.ticketStatus === "ONHOLD");
    return (
      <div className="dashboard-row6 row mx-0 flex-nowrap justify-content-start">
        <div className="d-card d-card--row6Colm1Card">
          <h3 className="d-r2-c1-text1">tickets summary</h3>
          <div className="row mx-0 mt-20 pt-10">
            {/* closed */}
            <div className="d-r6-c1__circular-progressbar">
              <CircularProgressbar
                value={
                  !isEmpty(answeredTickets) && answeredTickets !== false
                    ? answeredTickets[0].ticketPercent
                    : 0
                }
                text={`${
                  !isEmpty(answeredTickets) && answeredTickets !== false
                    ? answeredTickets[0].ticketPercent
                    : 0
                }%`}
                strokeWidth={15}
              />
              <p className="font-12-bold-italic">Closed</p>
            </div>
            {/* in progress */}
            <div className="d-r6-c1__circular-progressbar d-r6-c1__circular-progressbar--skyBlue">
              <CircularProgressbar
                value={
                  !isEmpty(inprogressTickets) && inprogressTickets !== false
                    ? inprogressTickets[0].ticketPercent
                    : 0
                }
                text={`${
                  !isEmpty(inprogressTickets) && inprogressTickets !== false
                    ? inprogressTickets[0].ticketPercent
                    : 0
                }%`}
                strokeWidth={15}
              />
              <p className="font-12-bold-italic">In Progress</p>
            </div>
            {/* on hold */}
            <div className="d-r6-c1__circular-progressbar d-r6-c1__circular-progressbar--orange">
              <CircularProgressbar
                value={
                  !isEmpty(onholdTickets) && onholdTickets !== false
                    ? onholdTickets[0].ticketPercent
                    : 0
                }
                text={`${
                  !isEmpty(onholdTickets) && onholdTickets !== false
                    ? onholdTickets[0].ticketPercent
                    : 0
                }%`}
                strokeWidth={15}
              />
              <p className="font-12-bold-italic">On Hold</p>
            </div>
          </div>
        </div>
        <div className="d-card d-card--row6Colm2Card">
          <h3 className="d-r2-c1-text1">yearly expense report</h3>
          <DashboardYearlyExpenseReportChart />
        </div>
        <div className="d-card d-card--row6Colm3Card">
          <h3 className="d-r2-c1-text1">invoice summary</h3>
          <DashboardInvoiceSummaryChart />
        </div>
      </div>
    );
  };

  /*============================================================
      renderRow7
  ============================================================*/
  handleCheckboxChange = (e) => {
    this.setState({
      [e.target.id]: e.target.checked,
    });
  };

  handleOnClickApproveExpense = () => {
    console.log("clicked on approve expense");
    const { approveExpanseList } = this.state;

    const formData = {
      expenses: approveExpanseList,
    };
    // console.log(formData);
    this.props.approveBulkExpense(formData, "Expense Approved");
  };

  handleOnClickApproveLeave = () => {
    console.log("clicked on approve expense");
    const { approveLeaveList } = this.state;
    const formData = {
      leaves: approveLeaveList,
    };
    this.props.approveBulkLeaves(formData, "Leave Approved");
  };

  doEmailExist = (data) => {
    // console.log(data);
    let obj = this.state.approveExpanseList.find((emp) => emp === data);
    // console.log(obj);
    return obj ? this.state.approveExpanseList.indexOf(obj) : false;
  };

  onChangeCheckbox = (data) => (e) => {
    // console.log("Checkbox checked:", data);

    let approveExpenseList = this.state.approveExpanseList;

    let returnValue = this.doEmailExist(data);
    if (returnValue || returnValue === 0) {
      approveExpenseList.splice(returnValue, 1);
    } else {
      let newApprovedStatusData = data;
      newApprovedStatusData.status = "APPROVED";
      approveExpenseList.push(newApprovedStatusData);
    }
    this.setState({
      approveExpanseList: approveExpenseList,
    });
    // console.log(approveExpenseList);
  };

  renderExpenseTable = () => {
    const { approvalExpense } = this.state;
    return (
      <div className="finances-table-tbody finances-table-tbody--dashbaordExpense">
        <table className="finances-table finances-table--dashbaordExpense">
          <tbody>
            {!isEmpty(approvalExpense) ? (
              approvalExpense.map((data, index) => (
                <tr key={index}>
                  <td>
                    <div className="customCheckbox">
                      <Checkbox
                        // id="workingDaysCheckboxMonFri"
                        // value={this.state.workingDaysCheckboxMonFri}
                        // defaultChecked={true}
                        onChange={this.onChangeCheckbox(data)}
                        checked={
                          this.doEmailExist(data) ||
                          this.doEmailExist(data) === 0
                            ? true
                            : false
                        }
                      />
                    </div>
                  </td>
                  <td>
                    <span className="d-r7-c1-text3">{data.expenseTitle}</span>
                  </td>
                  <td>
                    <span className="d-r7-c1-text4">{data.expenseType}</span>
                  </td>
                  <td>
                    <span className="font-14-semibold">{data.payee_name}</span>
                  </td>
                  <td>
                    <span className="font-14-semibold font-14-semibold--dashboard-expenses-amount">
                      {data.total}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={0} className="text-center">
                  <span className="font-14-semibold table-data-empty-message">
                    No data found
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  doLeaveExist = (data) => {
    // console.log(data);
    let obj = this.state.approveLeaveList.find((emp) => emp === data);
    // console.log(obj);
    return obj ? this.state.approveLeaveList.indexOf(obj) : false;
  };

  onChangeLeaveCheckbox = (data) => (e) => {
    // console.log("Checkbox checked:", data);

    let approveLeaveList = this.state.approveLeaveList;

    let returnValue = this.doEmailExist(data);
    if (returnValue || returnValue === 0) {
      approveLeaveList.splice(returnValue, 1);
    } else {
      let newApprovedStatusData = data;
      newApprovedStatusData.leaveStatus = "APPROVED";
      approveLeaveList.push(newApprovedStatusData);
    }
    this.setState({
      approveExpanseList: approveLeaveList,
    });
    console.log(approveLeaveList);
  };

  renderLeaveTable = () => {
    const { allPendingLeaves } = this.state;
    return (
      <div className="finances-table-tbody finances-table-tbody--dashbaordLeave">
        <table className="finances-table finances-table--dashbaordLeave">
          <tbody>
            {!isEmpty(allPendingLeaves) ? (
              allPendingLeaves.map((data, index) => (
                <tr key={index}>
                  <td>
                    <div className="customCheckbox">
                      <Checkbox
                        // id="workingDaysCheckboxMonFri"
                        // value={this.state.workingDaysCheckboxMonFri}
                        // defaultChecked={true}
                        onChange={this.onChangeLeaveCheckbox(data)}
                        checked={
                          this.doLeaveExist(data) ||
                          this.doLeaveExist(data) === 0
                            ? true
                            : false
                        }
                      />
                    </div>
                  </td>
                  <td>
                    <span className="d-r7-c1-text3">{data.user.name}</span>
                  </td>
                  <td>
                    <span className="d-r7-c1-text4">{data.leaveType}</span>
                  </td>
                  <td>
                    <span className="font-14-semibold font-14-semibold--dashboard-expenses-amount">
                      Dates
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={0} className="text-center">
                  <span className="font-14-semibold table-data-empty-message">
                    No data found
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  renderRow7 = () => {
    const { onLeaveToday } = this.props;
    return (
      <div className="dashboard-row7 row mx-0 flex-nowrap">
        <div className="d-card d-card--row7Colm1Card">
          <h3 className="d-r2-c1-text1">Pending approvals</h3>
          <div className="d-r7-c1-row row mx-0 flex-nowrap">
            <div className="d-r7-c1-row__colm1">
              <h4 className="d-r7-c1-text2">Expense</h4>
              {this.renderExpenseTable()}

              <div className="d-r7-c1-greenBtnDiv">
                <GreenButtonSmallFont
                  text="Approve"
                  onClick={this.handleOnClickApproveExpense}
                />
              </div>
            </div>
            <div className="d-r7-c1-row__colm2">
              <h4 className="d-r7-c1-text2">Leave</h4>
              {this.renderLeaveTable()}
              <div className="d-r7-c1-greenBtnDiv">
                <GreenButtonSmallFont
                  text="Approve"
                  onClick={this.handleOnClickApproveLeave}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="d-card d-card--row7Colm2Card">
            <h3 className="d-r2-c1-text1">
              members on leave <br />
              today
            </h3>
            <div className="row7Colm2Card-overflow">
              {!isEmpty(onLeaveToday) ? (
                onLeaveToday.map((data, index) => (
                  <div key={index} className="row mx-0 flex-nowrap mb-30">
                    <i className="fa fa-circle d-r7-c2-fa-circle"></i>
                    <div>
                      <h4 className="font-18-semiBold">{data.user.name}</h4>
                      <p className="font-18-semiBold d-r7-c2-text2">
                        {data.leaveType}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center">
                  <span className="font-14-semibold table-data-empty-message">
                    No data found
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="dashboard-lorem-text">lorem ipsum</div>
        </div>
      </div>
    );
  };

  oncloseHandler = () => {
    this.setState({
      freeTrialAlmostOverPopup: false,
    });
  };

  okayHandler = () => {
    this.props.history.push({ pathname: "/profile", state: "savedCards" });
  };
  /*============================================================
      main
  ============================================================*/
  render() {
    // console.log(this.state.projectTimeline);

    return (
      <div className="dashboard-bg-color-new">
        <FreeTrialAlmostOver
          freeTrialAlmostOverPopup={this.state.freeTrialAlmostOverPopup}
          oncloseHandler={this.oncloseHandler}
          okayHandler={this.okayHandler}
        />
        {this.props.activeWalkthroughPage === "dashboard-1" && (
          <WalkthroughDashboard1 />
        )}

        {this.props.activeWalkthroughPage === "dashboard-2" && (
          <WalkthroughDashboard2 />
        )}

        {this.props.activeWalkthroughPage === "navbar-1" && (
          <WalkthroughNavbar1 />
        )}

        {this.props.activeWalkthroughPage === "navbar-2" && (
          <WalkthroughNavbar2 />
        )}

        {this.props.activeWalkthroughPage === "all-project-1" && (
          <WalkthroughAllProject1 />
        )}

        {/* left navbar */}
        <LeftNavbar activeMenu="dashboard" />

        <div className="main-page-padding">
          {/* pagetitle and topnavbar */}
          <div className="dashboard-mb pageTitle-topNavbar-div">
            <PageTitle title="Dashboard" />
            <TopNavbar />
          </div>

          {/* row1 */}
          {this.renderRow1()}
          {/* row2 */}
          {this.renderRow2()}
          {/* row3 */}
          {this.renderRow3()}
          {/* row4 */}
          {this.renderRow4_1()}
          {this.renderRow4_2()}
          {/* row5 */}
          {this.renderRow5()}
          {/* row6 */}
          {this.renderRow6()}
          {/* row7 */}
          {this.renderRow7()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allToDo: state.dashboard.allToDo,
  approvalExpense: state.finance.approvalExpense,
  allPendingLeaves: state.calender.pendingLeaves,
  onLeaveToday: state.calender.onLeaveToday,
  todaysTask: state.dashboard.todaysTask,
  allProjects: state.projects.allProjects,
  projectTimeline: state.dashboard.projectTimeline,
  projectCountDown: state.dashboard.projectCountDown,
  ticketSummary: state.dashboard.ticketSummary,
  activeWalkthroughPage: state.auth.activeWalkthroughPage,
  projectScheduleIndicator: state.projects.projectScheduleIndicator,
});

export { socket };

export default connect(mapStateToProps, {
  updateUserDemoWalkthroughFlag,
  getAllToDo,
  updateToDo,
  invoicesIssuedByMonth,
  paidInvoicesIssuedByMonth,
  getAllExpanses,
  getApprovalPendingLeaves,
  approveBulkExpense,
  approveBulkLeaves,
  getOnLeaveToday,
  getCurrentTaskData,
  getExpenseData,
  getYearlyTotalExpense,
  getYearlyBilledExpense,
  getYearlyMisExpense,
  getInvoiceSummary,
  createWorkLog,
  updateWorklogByid,
  getProjectTaskStatusReport,
  getCostVariance,
  getAllProjectAction,
  getTicketSummary,
  getProjectTimeline,
  getProjectCountDown,
  getProjectTaskCopletion,
  onScheduleIndicator,
  getAllPinProjects,
})(withRouter(DashboardMainOld));
