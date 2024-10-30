import React, { useState } from "react";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "dayjs/locale/pt-br";

dayjs.locale("Pt-Br");

const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export const ScaleCalendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const today = dayjs();

    const handlePreviousMonth = () => {
        setCurrentDate(currentDate.subtract(1, "month"));
    };

    const handleNextMonth = () => {
        setCurrentDate(currentDate.add(1, "month"));
    };

    const startOfMonth = currentDate.startOf("month");
    const daysInMonth = currentDate.daysInMonth();

    const emptyDays = Array(startOfMonth.day()).fill(null);
    const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
        <div className="p-4 w-full h-full m-auto overflow-hidden">
            <div className="flex justify-between items-center mb-4">
                <button onClick={handlePreviousMonth} className="text-lg font-bold">
                    <ChevronLeft />
                </button>
                <h2 className="text-xl font-semibold">
                    {currentDate.format("MMMM YYYY").replace(/^\w/, (c) => c.toUpperCase())}
                </h2>
                <button onClick={handleNextMonth} className="text-lg font-bold">
                    <ChevronRight />
                </button>
            </div>

            <div className="grid grid-cols-7 text-center font-semibold mb-2">
                {daysOfWeek.map((day) => (
                    <div key={day} className="p-2">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2 text-center cursor-pointer h-[87%]">
                {emptyDays.map((_, index) => (
                    <div key={index} className="p-2 h-full bg-secondary opacity-30 shadow"></div>
                ))}
                {monthDays.map((day) => {
                    const isPastDay = currentDate.date(day).isBefore(today, "day");

                    return (
                        <div
                            key={day}
                            className={`p-2 h-full rounded shadow-md ${isPastDay ? "bg-secondary opacity-30" : "bg-secondary"}`}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
