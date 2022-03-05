import { faCaretSquareDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { TodoType } from "../../model/list-type";

const week: string[] = ["일", "월", "화", "수", "목", "금", "토"];
type DateArray = { date: number; day: number };

type ScheduleProps = {
  undoneTask: number;
  selectedDate: number;
  setSelectedDate: (date: number) => void;
};

export default function Schedule({ undoneTask, ...otherProps }: ScheduleProps) {
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
                {...otherProps}
              />
            );
          })}
        </ScheduleWrapper>
      </div>
    </>
  );
}

type DayPresenterProps = {
  day: number;
  selectedDate: number;
  setSelectedDate: (date: number) => void;
  weeklyFlag: boolean;
};
function DayPresenter({
  day,
  selectedDate,
  setSelectedDate,
  weeklyFlag,
}: DayPresenterProps) {
  const [todoList, setTodoList] = useState<undefined | TodoType[]>(undefined);
  const isLoaded = useRef<boolean>(false);
  useEffect(() => {
    if (!isLoaded.current) {
      fetch(`http://127.0.0.1:3000/api/hello?date=${day}`, {
        method: "get",
      }).then(async (response) => {
        // JSON: Javascript Object Notation
        // {
        //    key: value
        // }
        // [1, 2, 3]
        const body = await response.json();
        console.log(body);
        isLoaded.current = true;
        setTodoList(body.data);
      }); // 암묵적으로 GET 메소드를 사용함.
    }
  });
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

function getDaysArray(
  weeklyFlag: boolean,
  curDay: number,
  curYear: number,
  curMonth: number
) {
  const LastDate = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //매달 마지막 날

  let dateList: DateArray[] = [];

  let setdate = new Date();
  if (!weeklyFlag) {
    setdate = new Date(curYear, curMonth - 1, 0);
  }

  if (weeklyFlag) {
    //주차별 배열 생성
    dateList.push({ date: setdate.getDate(), day: setdate.getDay() });

    fillDays(setdate, dateList, curDay, false);

    setdate = new Date();

    for (var i = 6; i > curDay; i--) {
      setdate.setDate(setdate.getDate() + 1);
      dateList.push({ date: setdate.getDate(), day: setdate.getDay() });
    }
  } else {
    //월별 배열 생성
    fillDays(setdate, dateList, LastDate[curMonth], true);

    let firstDay = dateList[0].day;
    let lastDay = dateList[LastDate[curMonth] - 1].day;

    for (i = 0; i < firstDay; i++) {
      dateList.unshift({ date: -1, day: -1 });
    }
    for (i = lastDay; i < 6; i++) {
      dateList.push({ date: -1, day: -1 });
    }
  }
  return dateList;
}

function getUndoneTask(todoList: TodoType[] | undefined) {
  if (todoList === undefined) return 0;
  return todoList.filter((todo) => !todo.done).length;
}

function fillDays(
  baseDate: Date,
  daysArray: DateArray[],
  numDays: number,
  isMonth: boolean
) {
  for (let i = 0; i < numDays; i++) {
    baseDate.setDate(baseDate.getDate() + (isMonth ? 1 : -1));
    let newDate = {
      date: baseDate.getDate(),
      day: baseDate.getDay(),
    };
    if (isMonth) {
      daysArray.push(newDate);
    } else {
      daysArray.unshift(newDate);
    }
  }
}

const CurDateWrapper = styled.span`
  padding: 10px;
  font-weight: 600;
`;

const CalendarWrapper = styled.div`
  width: 350px;
  display: flex;
  flex-direction: row;
  gap: 35px;
  padding-left: 13px;
  justify-content: space-between;
  box-sizing: border-box;
`;
const WeeklyWrapper = styled(CalendarWrapper)``;

const WeekBar = styled.div`
  width: 350px;
  display: flex;
  flex-direction: row;
  gap: 41px;
  padding-left: 10px;
  padding-top: 40px;
  box-sizing: border-box;
  justify-content: space-between;
  font-weight: 600;
`;

const MonthlyWrapper = styled(CalendarWrapper)`
  flex-wrap: wrap;
  gap: 38px;
  padding-left: 15px;
`;

const DayStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 10px;
  margin-top: 30px;
  align-items: center;
  box-sizing: border-box;
`;

type SelectedDateProps = {
  selected: boolean;
};

const DayofWeek = styled(DayStyle)<SelectedDateProps>`
  gap: 10px;
  background-color: ${({ selected }) => (selected ? "red" : "transparent")};
`;

const DayofMonth = styled(DayStyle)<SelectedDateProps>`
  gap: 5px;
  background-color: ${({ selected }) => (selected ? "red" : "transparent")};
`;

const HandleNull = styled.div`
  width: 9px;
`;
