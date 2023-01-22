import { generateDateFromYearBeginning } from "../utils/generate-date-from-year-beginnig";
import { HabitDay } from "./HabitDay";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const summaryDates = generateDateFromYearBeginning();
const minimumSummaryDatesSize = 18 * 7; // 18 weeks
const amountOfDayToFill = minimumSummaryDatesSize - summaryDates.length;

export function SummaryTable() {
  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((day, index) => (
          <div
            key={`${day}_${index}`}
            className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
          >
            {day}
          </div>
        ))}

      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map(date => (
          <HabitDay key={date.toString()} amount={5} completed={Math.round(Math.random() * 5)} />
        ))}

        {amountOfDayToFill > 0 && Array.from({ length: amountOfDayToFill }).map((_, index) => (
          <div key={index} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed" />
        ))}
      </div>
    </div>
  );
}