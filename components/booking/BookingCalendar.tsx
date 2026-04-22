"use client";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DateRange } from "react-day-picker";
import { useProperty } from "@/utils/store";

import {
  generateDisabledDates,
  generateDateRange,
  defaultSelected,
  generateBlockedPeriods,
} from "@/utils/calendar";

function BookingCalendar() {
  const currentData = new Date();
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  const bookings = useProperty((state) => state.bookings);

  const blockedPeriods = generateBlockedPeriods({
    bookings,
    today: currentData,
  });

  const unavailableDates = generateDisabledDates(blockedPeriods);
  console.log(unavailableDates);
  useEffect(() => {
    const selectedRange = generateDateRange(range);
    const isDisabledDateIncluded = selectedRange.some((date) => {
      if (unavailableDates[date]) {
        setRange(defaultSelected);
        // toast({
        //   description: "Some dates are booked. Please select again.",
        // });
        toast.error("Some dates are booked. Please select again.");
        return true;
      }
      return false;
    });
    useProperty.setState({ range });
  }, [range]);

  return (
    <Calendar
      mode="range"
      defaultMonth={currentData}
      selected={range}
      onSelect={setRange}
      className="mb-4"
      disabled={blockedPeriods}
    />
  );
}

export default BookingCalendar;
