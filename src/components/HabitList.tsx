import { useEffect, useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { api } from "../lib/axios";
import dayjs from "dayjs";

interface HabitListProps {
  date: Date;
  onCompletedChange: (value: number) => void;
}

interface HabitsInfo {
  possibleHabits: Array<{
    id: string,
    title: string,
    created_at: string
  }>,
  completedHabits: string[],
}

export function HabitList({
  date,
  onCompletedChange
}: HabitListProps) {
  const [habitsInfo, setHabitsInfos] = useState<HabitsInfo>();

  useEffect(() => {
    api.get("day", {
      params: {
        date: date.toISOString()
      }
    }).then(response => {
      setHabitsInfos(response.data)
    })
  }, []);

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

  const isHabitAlreadyCompleted = (id: string) => habitsInfo!.completedHabits.includes(id);

  async function handleToggleHabit(habitId: string) {
    await api.patch(`/habits/${habitId}/toggle`);

    let completedHabits: string[] = [];
    if (isHabitAlreadyCompleted(habitId)) {
      completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId);
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId]
    }

    setHabitsInfos({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits,
    });

    onCompletedChange(completedHabits.length);
  }

  return (
    <div className="mt-5 flex flex-col gap-3">
      {habitsInfo?.possibleHabits.map(habit => (
        <Checkbox.Root
          key={habit.id}
          className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
          disabled={isDateInPast}
          checked={isHabitAlreadyCompleted(habit.id)}
          onCheckedChange={() => handleToggleHabit(habit.id)}
        >
          <div className="h-8 w-8 rounded-lg flex justify-center items-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-500 group-focus:ring-offset-2 group-focus:ring-offset-background">
            <Checkbox.Indicator>
              <Check size={20} className="text-white" />
            </Checkbox.Indicator>
          </div>

          <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
            {habit.title}
          </span>
        </Checkbox.Root>
      ))}

    </div>
  );
}