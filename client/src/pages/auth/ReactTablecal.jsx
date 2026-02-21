import { useEffect, useState } from "react";
import { ReactTable } from "./ReactTable";

import {
  DateTimePicker,
  DateRangeCalendarPicker,
  DateTimeRangePicker,
} from "react-datetime-range-super-picker";
import "react-datetime-range-super-picker/dist/index.css";

export const ReactTablecal = () => {
  let nowtime = new Date();
  // nowtime =

  const [from_date, setFromDate] = useState({
    day: nowtime.getDate() - 1,
    month: nowtime.getMonth(),
    year: nowtime.getFullYear(),
    year: nowtime.getFullYear(),
    hour: 12,
    minute: 0,
    meridiem: "AM",
    hour24: 0,
  });
  const [to_date, setToDate] = useState({
    day: nowtime.getDate(),
    month: nowtime.getMonth(),
    year: nowtime.getFullYear(),
    year: nowtime.getFullYear(),
    hour: 12,
    minute: 0,
    meridiem: "AM",
    hour24: 0,
  });
  // OR use JSON object with : day, month, year

  const handleFromDateUpdate = ({ date }) => {
    setFromDate(date.date);
  };
  const handleToDateUpdate = ({ date }) => {
    setToDate(date.date);
  };
  useEffect(() => {
    console.log(from_date, " => ", to_date);
  }, [from_date, to_date]);

  return (
    <DateTimeRangePicker
      from_date={from_date}
      to_date={to_date}
      onFromDateTimeUpdate={handleFromDateUpdate}
      onToDateTimeUpdate={handleToDateUpdate}
    />
  );

  // const [from_date, setFromDate] = useState(new Date())
  // const [to_date, setToDate] = useState(new Date())
  // // OR use JSON object with : day, month, year

  // const handleFromDateUpdate = ({date}) => {
  //   setFromDate(date)
  // }
  // const handleToDateUpdate = ({date}) => {
  //   setToDate(date)
  // }
  // useEffect(() => {
  //   console.log(from_date, " => ", to_date)
  // }, [from_date, to_date]);

  // return (
  //   <DateRangeCalendarPicker from_date={from_date} to_date={to_date}
  //     onFromDateUpdate={handleFromDateUpdate}
  //     onToDateUpdate={handleToDateUpdate} />
  // )

  // const [curr_date, setDate] = useState(new Date())

  // // OR use JSON object with : day, month, year

  // const handleDateUpdate = ({date}) => {
  //   setDate(date.date)
  // }
  // return (
  //   <div>
  //     <DateTimePicker date={curr_date}
  //       onDateTimeUpdate={handleDateUpdate} />
  //   </div>
  // )

  // return (
  //       <ReactTable
  //         rows={[
  //           {
  //             task: "Add a New Feature",
  //             notes: "This is a note",
  //           },
  //           {
  //             task: "Write Integration Tests",
  //             notes: "Use Jest",
  //           },
  //           {
  //             task: "Add a New Feature",
  //             notes: "This is a note",
  //           },
  //           {
  //             task: "Write Integration Tests",
  //             notes: "Use Jest",
  //           },
  //           {
  //             task: "Add a New Feature",
  //             notes: "This is a note",
  //           },
  //           {
  //             task: "Write Integration Tests",
  //             notes: "Use Jest",
  //           },
  //           {
  //             task: "Write Integration Tests",
  //             notes: "Use Jest",
  //           },
  //           {
  //             task: "Add a New Feature",
  //             notes: "This is a note",
  //           },
  //           {
  //             task: "Write Integration Tests",
  //             notes: "Use Jest",
  //           },
  //           {
  //             task: "Write Integration Tests",
  //             notes: "Use Jest",
  //           },
  //           {
  //             task: "Add a New Feature",
  //             notes: "This is a note",
  //           },
  //           {
  //             task: "Write Integration Tests",
  //             notes: "Use Jest",
  //           },
  //           {
  //             task: "Write Integration Tests",
  //             notes: "Use Jest",
  //           },
  //           {
  //             task: "Add a New Feature",
  //             notes: "This is a note",
  //           },
  //           {
  //             task: "Write Integration Tests",
  //             notes: "Use Jest",
  //           },
  //         ]}
  //         columns={[
  //           {
  //             accessorKey: "task",
  //             header: "Task",
  //             size: 10,
  //             cell: EditableCell,
  //             enableColumnFilter: true,
  //             filterFn: "includesString",
  //           },
  //           {
  //             accessorKey: "notes",
  //             header: "notes",
  //           },
  //           {
  //             accessorKey: "notes",
  //             header: "notes",
  //           },
  //           {
  //             accessorKey: "notes",
  //             header: "notes",
  //           },
  //           {
  //             accessorKey: "notes",
  //             header: "notes",
  //           },
  //         ]}
  //         pageIndex={0}
  //         pageSize={5}
  //         paginationEnabled={true}
  //       />
  // )
};

function EditableCell({ getValue, row, column, table }) {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  // When the input is blurred, we'll call our table meta's updateData function
  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      variant="filled"
      size="sm"
      overflow="hidden"
      // textOverflow="ellipsis"
      // whiteSpace="nowrap"
    />
  );
}
