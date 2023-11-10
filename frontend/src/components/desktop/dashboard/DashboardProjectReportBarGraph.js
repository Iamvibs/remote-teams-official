import React, { Component } from "react";
import { HorizontalBar } from "react-chartjs-2";
import { connect } from "react-redux";
import isEmpty from "../../../store/validations/is-empty";
import displaySmallText from "../../../store/utils/sliceString";

let letTicksFontSize = 0;

if (window.innerWidth > 880) {
  letTicksFontSize = 11;
} else {
  letTicksFontSize = 8;
}

const optionsTimesheetBarGraph = {
  curvature: 1,
  legend: {
    display: true,
    labels: {
      fontSize: letTicksFontSize,
      fontColor: "rgba(255, 255, 255, 1)",
      fontFamily: "Nunito-SemiBold",
      usePointStyle: true,
      boxWidth: 5,
    },
  },
  tooltips: {
    backgroundColor: "#4a5055",
    titleFontFamily: "Nunito-Regular",
    bodyFontFamily: "Nunito-Regular",
  },
  scales: {
    yAxes: [
      {
        stacked: true,
        ticks: {
          fontSize: letTicksFontSize,
          fontColor: "rgba(255, 255, 255, .33)",
          fontFamily: "Nunito-SemiBold",
          suggestedMin: 0,
          // suggestedMax: 200,
          // precision: 10,
          // stepSize: 100,
          beginAtZero: true,
        },
        categoryPercentage: 0.6,
        barPercentage: 1,

        gridLines: {
          display: false,
          drawBorder: false,
          borderDash: [8],
          color: "transparent",
          borderColor: "transparent",
        },
      },
    ],
    xAxes: [
      {
        stacked: true,
        ticks: {
          display: false,
          fontSize: letTicksFontSize,
          fontColor: "rgba(255, 255, 255, 1)",
          fontFamily: "Nunito-SemiBold",
          beginAtZero: true,
        },
        gridLines: {
          display: false,
          color: "rgba(112, 112, 112, 1)",
        },
      },
    ],
  },
};

class DashboardProjectReportBarGraph extends Component {
  constructor() {
    super();
    this.state = {};
  }

  static getDerivedStateFromProps(nextProps, nextStete) {
    if (
      !isEmpty(nextProps.projectTaskStatus) &&
      nextProps.projectTaskStatus !== nextStete.projectTaskStatus
    ) {
      return {
        projectTaskStatus: nextProps.projectTaskStatus,
      };
    }
    return null;
  }

  setBackgroundColor1 = (labelsLength, text) => {
    let arr = [];
    let i = 0;
    while (i < labelsLength) {
      arr.push(text);
      i++;
    }
    return arr;
  };

  render() {
    // console.log(this.state.projectTaskStatus);

    const { projectTaskStatus } = this.state;

    let notCompletedPercentArray = [];

    let notCompleted =
      !isEmpty(projectTaskStatus) &&
      projectTaskStatus.forEach((element) => {
        if (typeof element[0] === "string") {
          return null;
        } else {
          // console.log(element);
          element.map((percent) => {
            notCompletedPercentArray.push(100 - percent);
          });
        }
      });
    // console.log(notCompletedPercentArray);

    let labelArray = [];
    let percentageData = [];

    let mapData =
      !isEmpty(projectTaskStatus) &&
      projectTaskStatus.map((element, index) => {
        if (typeof element[0] === "string") {
          labelArray = element;
        } else {
          percentageData = element;
        }
      });

    const data = (canvas) => {
      const ctx = canvas.getContext("2d");
      const gradient1 = ctx.createLinearGradient(300, 0, 0, 0);
      gradient1.addColorStop(0, "rgba(67, 206, 162, 1)");
      gradient1.addColorStop(1, "rgba(24, 90, 157, 1)");

      const gradient2 = ctx.createLinearGradient(600, 0, 0, 0);
      gradient2.addColorStop(0, "rgba(234, 175, 200, 1)");
      gradient2.addColorStop(1, "rgba(101, 78, 163, 1)");

      const gradient3 = ctx.createLinearGradient(1200, 0, 0, 0);
      gradient3.addColorStop(0, "rgba(252, 151, 71, 1)");
      gradient3.addColorStop(1, "rgba(253, 118, 151, 1)");

      // shadow
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowBlur = letTicksFontSize;
      ctx.shadowColor = "rgba(35, 37, 39, 0.7)";

      // total projects displaying count
      const labelsLength = !isEmpty(labelArray) ? labelArray.length : 1;

      let finalLabels = [];
      if (!isEmpty(labelArray)) {
        labelArray.forEach((ele) => {
          let shortLabel = displaySmallText(ele, 10, true);
          finalLabels.push(shortLabel);
        });
      }
      return {
        labels: !isEmpty(finalLabels) && finalLabels,
        datasets: [
          {
            label: "Not Completed",
            backgroundColor: this.setBackgroundColor1(labelsLength, gradient1),
            data:
              !isEmpty(notCompletedPercentArray) && notCompletedPercentArray,
          },
          {
            label: "Completed",
            backgroundColor: this.setBackgroundColor1(labelsLength, gradient3),
            data: !isEmpty(percentageData) && percentageData,
          },
        ],
      };
    };
    return (
      <>
        {/* <ul className="percent_complete">
          <li>20</li>
          <li>20</li>
          <li>20</li>
          <li>20</li>
          <li>20</li>
        </ul> */}
        <HorizontalBar
          data={data}
          options={optionsTimesheetBarGraph}
          width={100}
          //height={40}
          height={30}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  projectTaskStatus: state.dashboard.projectTaskStatus,
});

export default connect(mapStateToProps, {})(DashboardProjectReportBarGraph);
