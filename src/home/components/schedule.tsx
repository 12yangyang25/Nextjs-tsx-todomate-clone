import { faCaretSquareDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { TodoType, DateArray } from "../../model/list-type";
import useTodoListStore from "./useTodoListStore";
import scheduleStyle from "./style/scheduleStyle";
import getDaysArray from "./style/getCalendar";

const week: string[] = ["일", "월", "화", "수", "목", "금", "토"];

type ScheduleProps = {
  undoneTask: number;
  selectedDate: number;
  setSelectedDate: (date: number) => void;
  selectedTodoStore: any;
};

const {
  CurDateWrapper,
  CalendarWrapper,
  WeeklyWrapper,
  WeekBar,
  MonthlyWrapper,
  DayStyle,
  DayofWeek,
  DayofMonth,
  HandleNull,
} = scheduleStyle();

export default function Schedule({
  undoneTask,
  selectedTodoStore,
  ...otherProps
}: ScheduleProps) {
  let curDate = new Date();
  let curYear = curDate.getFullYear();
  let curMonth = curDate.getMonth() + 1;
  let curDay = curDate.getDay();

  const [weeklyFlag, setState] = useState(true);

  const Handlecheck = () => {
    setState(!weeklyFlag);
  };

  const dateList = getDaysArray(weeklyFlag, curDay, curYear, curMonth);

  var ScheduleWrapper = WeeklyWrapper;

  if (!weeklyFlag) {
    ScheduleWrapper = MonthlyWrapper;
  }

  return (
    <>
      <CurDateWrapper>
        {curYear}년 {curMonth}월
      </CurDateWrapper>
      <FontAwesomeIcon icon={faCaretSquareDown} onClick={Handlecheck} />
      <WeekBar>
        {week.map((days, index) => {
          return <div key={`Calander-day-${index}-${days}`}>{days}</div>;
        })}
      </WeekBar>
      <div>
        <ScheduleWrapper>
          {dateList.map((Days: DateArray, index) => {
            if (Days.date == -1) {
              return <HandleNull></HandleNull>;
            }

            return (
              <DayPresenter
                day={Days.date}
                key={`daypresenter-${index}`}
                weeklyFlag={weeklyFlag}
                selectedTodoList={selectedTodoStore.todoList}
                {...otherProps}
              />
            );
          })}
        </ScheduleWrapper>
      </div>
    </>
  );
}

// stateStore
// stateStore = {
//  treelevel1State: {},
//  treelevel2State: {},
// }
// function hook() {
//   const callerComponent = <div></div>;
//   const componentOrder = 11;
//   let retState;

//   const treelevel = 3;
//   if (componentOrder + comopnent.key 바꼈다.) {
//     stateStore[treelevel].clear();
//   }

{
  /* <Schedule
            undoneTask={todoCount}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTodoStore={selectedTodoStore}
            key={`date-${selectedDate}`}
          /> */
}

//   if (callerComponent.key) {
//     const savedState = stateStore[callerComponet.key + comopnentOrder];
//     if (savedState) {
//       return savedState;
//     } else {
//       stateStore[callerComponent.key] = useTodoListStore();
//       return stateStore[callerComponent.key];
//     }
//   } else {
//     const savedState = stateStore[comopnentOrder];
//     if (savedState) {
//       return savedState;
//     } else {
//       stateStore[compoanentOrder] = useTodoListStore();
//       return stateStore[componentOrder];
//     }
//   }
// }

type DayPresenterProps = {
  day: number;
  selectedDate: number;
  setSelectedDate: (date: number) => void;
  weeklyFlag: boolean;
  selectedTodoList: TodoType[];
};

function DayPresenter({
  day,
  selectedDate,
  setSelectedDate,
  weeklyFlag,
  selectedTodoList,
}: DayPresenterProps) {
  let { todoList } = useTodoListStore({ wantedDate: day });
  console.log(day, "from use todo list store", todoList.length);
  if (selectedDate === day) {
    todoList = selectedTodoList;
    console.log(day, "from parent component", todoList.length);
  }
  var DateWrapper = DayofWeek;
  if (!weeklyFlag) {
    DateWrapper = DayofMonth;
  }
  return (
    <DateWrapper
      role={"button"}
      onClick={() => {
        setSelectedDate(day);
      }}
      selected={selectedDate === day}
    >
      {/* 해당 날짜의 투두리스트 갯수가 나타나도록 처리 */}
      {/* 날짜는 Days.date 에 저장이 되있음. */}
      {/* 이 날의 투두 리스트 todoListStore[Days.date] */}
      {/* 이 날의 undoneTask 는 위의 투두리스트.filter (undone) */}

      <div>{getUndoneTask(todoList)}</div>
      <div>{day}</div>
    </DateWrapper>
  );
}

function getUndoneTask(todoList: TodoType[] | undefined) {
  if (todoList === undefined) return 0;
  return todoList.filter((todo) => !todo.done).length;
}
