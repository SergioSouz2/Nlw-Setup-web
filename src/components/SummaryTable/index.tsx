import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { HabitDay } from "../HabitDay";


import { api } from "../../lib/axios";
import { generateDatesFromYearBeginning } from "../../utils/generateDatesFromYearBeginning";

const weekDay = ["D", "S", "T", "Q", "Q", "S", "S"];
const summaryDates = generateDatesFromYearBeginning()

const minimumSummaryDatesSiza = 18 * 7 //18 semanas
const amountOfDayToFill = minimumSummaryDatesSiza - summaryDates.length


type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[]


export function SummaryTable() {

  const [summary, setSummary] = useState<Summary>([])

  useEffect(() => {
    api.get('summary').then(response => {
      setSummary(response.data);
    })
  }, [])


  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDay.map((weekDay, i) => {
          return (
            <div
              key={`${weekDay}-${i}`}
              className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
            >
              {weekDay}
            </div>
          );
        })}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">

        {summaryDates.map(date => {

          const dayInSummary = summary.find(day => {
            return dayjs(date).isSame(day.date, 'day')
          })


          return (
            <HabitDay
              key={date.toString()}
              date={date}
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
            />
          )
        })}


        {amountOfDayToFill > 0 && Array.from({ length: amountOfDayToFill }).map((_, i) => {
          return (
            <div
              key={i}
              className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
            />
          )
        })}

      </div>
    </div>
  );
} 