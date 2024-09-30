'use client';

import { Button } from "@/shadcn/components/ui/button"
import { Calendar } from "@/shadcn/components/ui/calendar"
import { Label } from "@/shadcn/components/ui"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcn/components/ui/popover"
import { useState } from 'react';

export default function BirthdayField({
    setBirthday,
    birthday
}: {
    setBirthday?: React.Dispatch<React.SetStateAction<Date | undefined>>,
    birthday?: Date | string
}) {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [date, setDate] = useState<any>(birthday)

    return (
        <fieldset>
            <Label htmlFor="birthday">Birthday</Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                      id="birthday"
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
                    >
                        {date ? date.toLocaleString("en-US") : <span>__/__/____</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full">
                    <Calendar
                      mode="single"
                      required
                      selected={date}
                      onSelect={(date) => {
                        setDate(date);
                        setBirthday?.(date);
                      }}
                    />
                </PopoverContent>
            </Popover>
        </fieldset>
    )
}