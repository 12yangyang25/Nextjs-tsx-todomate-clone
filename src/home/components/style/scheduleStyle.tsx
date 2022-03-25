import styled from "styled-components";

export type SelectedDateProps = {
  selected: boolean;
};

export default function scheduleStyle() {
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

  return {
    CurDateWrapper,
    CalendarWrapper,
    WeeklyWrapper,
    WeekBar,
    MonthlyWrapper,
    DayStyle,
    DayofWeek,
    DayofMonth,
    HandleNull,
  };
}
