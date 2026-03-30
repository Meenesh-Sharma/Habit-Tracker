

"use client"

import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function HabitTrackerGrid({ habits, setHabits }: any) {

    const days = Array.from({ length: 14 }, (_, i) => i)

    const toggleHabit = async (habitIndex: number, dayIndex: number) => {

        const updated = [...habits]

        updated[habitIndex].tracker[dayIndex] =
            !updated[habitIndex].tracker[dayIndex]

        setHabits(updated)

        try {


        } catch (err) {
            console.log(err)
        }

    }

    return (

        <Card className="p-5 overflow-x-auto">

            <h2 className="text-lg font-semibold text-orange-500 mb-4">
                Last 14 Days
            </h2>

            <table className="w-full text-sm">

                <thead>

                    <tr>

                        <th className="text-left pb-2">Habit</th>

                        {days.map((d) => (
                            <th key={d} className="text-center text-gray-500">
                                {d + 1}
                            </th>
                        ))}

                    </tr>

                </thead>

                <tbody>

                    {habits.map((habit: any, habitIndex: number) => (

                        <tr key={habitIndex} className="border-t">

                            <td className="py-2 font-medium">
                                {habit.name}
                            </td>

                            {habit.tracker.map((done: boolean, dayIndex: number) => (

                                <td key={dayIndex} className="text-center">

                                    <button
                                        onClick={() => toggleHabit(habitIndex, dayIndex)}
                                        className={`w-6 h-6 rounded flex items-center justify-center border
${done
                                                ? "bg-green-500 text-white"
                                                : "bg-white text-gray-300"
                                            }`}
                                    >

                                        {done && <Check size={14} />}

                                    </button>

                                </td>

                            ))}

                        </tr>

                    ))}

                </tbody>

            </table>

        </Card>

    )

}