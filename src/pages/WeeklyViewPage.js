import React, { useState, useRef, useEffect } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import "./WeekStyle.css";

const styles = {
  wrap: {
    display: "flex"
  },
  left: {
    marginRight: "10px"
  },
  main: {
    flexGrow: "1"
  }
};

const Calendar = () => {
  const [selectedOffice, setSelectedOffice] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");

  const handleRoomSelectorChange = (event) => {
    const selectedRoom = event.target.value;
    console.log(selectedRoom);
    setSelectedRoom(selectedRoom);
  };

  const handleOfficeSelectorChange = (event) => {
    const selectedOffice = event.target.value;
    console.log(selectedOffice);
    setSelectedOffice(selectedOffice);
  };


  const calendarRef = useRef();
  const [calendarConfig, setCalendarConfig] = useState({
    viewType: "Week",
    durationBarVisible: false,
    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: async args => {
      const dp = calendarRef.current.control;
    //   const modal = await DayPilot.Modal.prompt("Book A New Meeting: Specify Room No", "Meeting Title");
    const modal = await DayPilot.Modal.form({
        title: "Meeting title",
        office: "",
        room: "",
        attendees: "",
      });
          
      dp.clearSelection();
      if (!modal.result) { return; }
      
      dp.events.add({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result.title,
        room: modal.result.room,
        office: modal.result.office,
        attendees: modal.result.attendees
      });
    },
    eventDeleteHandling: "Update",
    onEventClick: async args => {
      const dp = calendarRef.current.control;
    //   const modal = await DayPilot.Modal.prompt("Update Meeting Details:", args.e.text());
    const modal = await DayPilot.Modal.form({
        // "Update Meeting Details:",
        title: args.e.text(),
        room: args.e.data.room,
        office: args.e.data.office,
        attendees: args.e.data.attendees,
    });
      if (!modal.result) { return; }
      const e = args.e;
      e.data.text = modal.result.title;
      e.data.room = modal.result.room;
      e.data.office = modal.result.office;
      e.data.attendees = modal.result.attendees;
      dp.events.update(e);
    },
  });
  

  useEffect(() => {
    const events = [
      {
        id: 1,
        text: "Meet 1",
        room: "Room 1",
        office: "Office 1",
        attendees: "2",
        start: "2023-07-10T10:30:00",
        end: "2023-07-10T13:00:00"
      },
      {
        id: 2,
        text: "Meet 2",
        room: "Room 2",
        office: "Office 1",
        attendees: "3",
        start: "2023-07-11T09:30:00",
        end: "2023-07-11T11:30:00",
        backColor: "#6aa84f"
      },
      {
        id: 3,
        text: "Meet 3",
        room: "Room 3",
        office: "Office 2",
        attendees: "4",
        start: "2023-07-11T12:00:00",
        end: "2023-07-11T15:00:00",
        backColor: "#f1c232"
      },
      {
        id: 4,
        text: "Meet 4",
        room: "Room 4",
        office: "Office 3",
        attendees: "6",
        start: "2023-07-12T11:30:00",
        end: "2023-07-12T14:30:00",
        backColor: "#cc4125"
      },
    ];

    const filteredEvents = events.filter(
        (event) =>
          (selectedRoom === "" || event.room === selectedRoom) &&
          (selectedOffice === "" || event.office === selectedOffice)
      );
    // const filteredEvents = events.filter(event => event.room === selectedRoom && event.office === selectedOffice);
    // console.log(selectedRoom.toString());
    // console.log(selectedOffice.toString());
    // const filteredEvents = events.filter(event => event.room === selectedRoom.toString() && eve);

    const dash = "-";
    const zero = "0";
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (zero + (currentDate.getMonth() + 1)).slice(-2);
    const day = (zero + currentDate.getDate()).slice(-2);
    const startDate = year + dash + month + dash + day;

    calendarRef.current.control.update({startDate, events: filteredEvents});
  }, [selectedRoom, selectedOffice]);

  return (
    <>
    <div>
    <label htmlFor="btn-check5" className="btn btn-primary-border" >Select Office: 
    <select style={{
        marginLeft: '5px',
        padding: '5px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        backgroundColor: '#f8f8f8',
        color: '#333',
      }} name="office" id="office" onChange={handleOfficeSelectorChange} value={selectedOffice}>
        <option value="none">none</option>
        <option value="Office 1">Office 1</option>
        <option value="Office 2">Office 2</option>
        <option value="Office 3">Office 3</option>
        {/* Add more office options as needed */}
      </select>
    </label>
      <label htmlFor="btn-check5" className="btn btn-primary-border">Select Room: 
      <select style={{
        marginLeft: '5px',
        padding: '5px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        backgroundColor: '#f8f8f8',
        color: '#333',
      }} name="room" id="room" onChange={handleRoomSelectorChange} value={selectedRoom}>
        <option value="none">none</option>
        <option value="Room 1">Room 1</option>
        <option value="Room 2">Room 2</option>
        <option value="Room 3">Room 3</option>
        {/* Add more room options as needed */}
      </select>
      </label>
    </div>
    <div style={styles.wrap}>
      <div style={styles.left}>
        <DayPilotNavigator
          selectMode={"Week"}
          showMonths={3}
          skipMonths={3}
          startDate={new Date()}
          selectionDay={new Date()}
          onTimeRangeSelected={ args => {
            calendarRef.current.control.update({
              startDate: args.day
            });
          }}
        />
      </div>
      <div style={styles.main}>
        <DayPilotCalendar
          {...calendarConfig}
          ref={calendarRef}
        />
      </div>
    </div>
    </>
  );
}

export default Calendar;
