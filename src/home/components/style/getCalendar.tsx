import { DateArray } from "../../../model/list-type";

export default function getDaysArray(
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
    console.log(`현재 setdate는 ${setdate}`);
  }

  if (weeklyFlag) {
    //주차별 배열 생성
    dateList.push({ date: setdate.getDate(), day: setdate.getDay() });

    fillDays(setdate, dateList, curDay, false); //현재 날짜를 기준으로 앞으로 채움

    setdate = new Date();

    for (var i = 6; i > curDay; i--) {
      //현재 날짜를 기준으로 뒤로 채움
      setdate.setDate(setdate.getDate() + 1);
      dateList.push({ date: setdate.getDate(), day: setdate.getDay() });
    }
  } else {
    //월별 배열 생성
    fillDays(setdate, dateList, LastDate[curMonth], true);

    let firstDay = dateList[0].day;
    let lastDay = dateList[LastDate[curMonth] - 1].day;

    for (i = 0; i < firstDay; i++) {
      //1일 전까지 -1로 채움
      dateList.unshift({ date: -1, day: -1 });
    }
    for (i = lastDay; i < 6; i++) {
      //마지막 날 이후를 -1로 채움
      dateList.push({ date: -1, day: -1 });
    }
  }
  return dateList;
}

function fillDays(
  baseDate: Date,
  daysArray: DateArray[],
  numDays: number,
  isMonth: boolean
) {
  // ex)3월 배열 생성:
  // setdate: 2022년 2월 28일
  // fillDays(setdate, dateList, LastDate[curMonth], true);
  for (let i = 0; i < numDays; i++) {
    //i는 0일 때 3월 1일, 3월 마지막 날까지 배열을 채움
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
