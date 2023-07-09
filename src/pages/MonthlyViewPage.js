import React, {Component} from 'react';
import {DayPilot, DayPilotMonth} from "@daypilot/daypilot-lite-react";
import "./MonthStyles.css";
import "./icons/style.css";

class MonthlyCalendar extends Component {

  constructor(props) {
    super(props);

    this.calendarRef = React.createRef();

    this.state = {
      eventHeight: 30,
      headerHeight: 30,
      cellHeaderHeight: 25,
      onBeforeEventRender: args => {
        args.data.borderColor = "darker";
        if (args.data.backColor) {
          args.data.barColor = DayPilot.ColorUtil.darker(args.data.backColor, -1);
        }
      },
      contextMenu: new DayPilot.Menu({
        items: [
          {
            text: "Delete",
            onClick: args => {
              const e = args.source;
              this.calendar.events.remove(e);
            }
          },
          {
            text: "-"
          },
          {
            text: "Blue",
            icon: "icon icon-blue",
            color: "#3d85c6",
            onClick: args => this.updateColor(args.source, args.item.color)
          },
          {
            text: "Green",
            icon: "icon icon-green",
            color: "#6aa84f",
            onClick: args => this.updateColor(args.source, args.item.color)
          },
          {
            text: "Yellow",
            icon: "icon icon-yellow",
            color: "#ecb823",
            onClick: args => this.updateColor(args.source, args.item.color)
          },
          {
            text: "Red",
            icon: "icon icon-red",
            color: "#d5663e",
            onClick: args => this.updateColor(args.source, args.item.color)
          },
          {
            text: "Auto",
            color: null,
            onClick: args => this.updateColor(args.source, args.item.color)
          },

        ]
      }),
      onTimeRangeSelected: async args => {
        const modal = await DayPilot.Modal.prompt("Book A New Meeting: Scpecify Room No and Meeting Hours", "Meeting Title");

        this.calendar.clearSelection();
        if (!modal.result) {
          return;
        }
        this.calendar.events.add({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: modal.result
        });
      },
    };
  }

  componentDidMount() {

    // load event data
    this.setState({
      startDate: "2023-07-01",
      events: [
        {
          id: 1,
          text: "Meet 1 - Room1 - 9:00-10:00",
        //   room: 'Room1',
        //   start_hour: '9:00',
        //   end_hour: '10:00',
          start: "2023-07-13",
          end: "2023-07-13",
          backColor: "#d5663e",
        },
        {
          id: 2,
          text: "Meet 2 - Room2 - 8:00-10:00",
          start: "2023-07-08",
          end: "2023-07-09",
          backColor: "#ecb823",
        },
        {
          id: 3,
          text: "Meet 3 - Room3 - 11:00-11:30",
          start:"2023-07-04",
          end: "2023-07-04",
          backColor: "#6aa84f",
        },
        {
          id: 4,
          text: "Meet 4 - Room2 - 8:00-10:00",
          start: "2023-07-15",
          end: "2023-07-16",
          backColor: "#3d85c6",
        },
        {
          id: 5,
          text: "Meet 5 - Room5 - 8:00-10:00",
          start: "2023-07-15",
          end: "2023-07-16"
        },
      ]
    });

  }

  get calendar() {
    return this.calendarRef.current.control;
  }

  updateColor(e, color) {
    e.data.backColor = color;
    this.calendar.events.update(e);
  }


  render() {
    return (
      <div>
        <DayPilotMonth
          {...this.state}
          ref={this.calendarRef}
        />
      </div>
    );
  }
}

export default MonthlyCalendar;
