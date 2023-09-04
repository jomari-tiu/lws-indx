import React, { useEffect, useRef, useState } from "react";

import {
  addMinutes,
  format,
  startOfDay,
  parse,
  differenceInMinutes,
} from "date-fns";

import { AnimatePresence } from "framer-motion";

import { motion } from "framer-motion";

import moment from "moment";

import { fadeIn } from "./animation/animation";
import { Button } from "./Button";
import Input from "./Input";

type Props = {
  onChange: (value: string[]) => void;
  isTime: { start: string; end: string }[];
};

const convertTo24HourFormat = (time12Hour: string) => {
  const date = parse(time12Hour, "hh:mm a", new Date());
  return format(date, "HH:mm");
};

const convertToNumber = (time12Hour: string) => {
  const date = convertTo24HourFormat(time12Hour);
  return Number(date.replace(":", ""));
};

const getDatesBetween = (start: string, end: string) => {
  const times = [];
  let currentTime = parse(start, "hh:mm a", new Date());

  while (currentTime <= parse(end, "hh:mm a", new Date())) {
    times.push(format(currentTime, "hh:mm a"));
    currentTime = addMinutes(currentTime, 30);
  }

  return times;
};

const disabledTime = (
  type: string,
  isTime: { start: string; end: string }[]
) => {
  let disableHours: string[] = [];
  isTime.map((time) => {
    disableHours = [...disableHours, ...getDatesBetween(time.start, time.end)];
  });
  return disableHours;
};

export default function TimeRangePicker({ isTime, onChange, ...rest }: Props) {
  const disabledTimeArray = disabledTime("", isTime);
  const [show, setShow] = useState(false);
  const timeSlots = generateTimeSlots();
  const restValue: any = rest;
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  // close by clicking outside
  const Container = useRef<any>();
  useEffect(() => {
    const clickOutSide = (e: any) => {
      if (!Container.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", clickOutSide);
    return () => {
      document.removeEventListener("mousedown", clickOutSide);
    };
  });

  const applyHandler = () => {
    const startNumber = convertToNumber(start);
    const endNumber = convertToNumber(end);
    if (startNumber > endNumber) {
      onChange([end, start]);
      setStart(end);
      setEnd(start);
    } else {
      onChange([start, end]);
    }
    setShow(false);
  };

  return (
    <div className=" flex gap-3 relative z-10" ref={Container}>
      <Input
        {...rest}
        placeholder="time"
        value={
          restValue?.value?.length > 0
            ? restValue?.value[0] +
              `${
                restValue?.value[0] === "" && restValue?.value[1] === ""
                  ? ""
                  : " - "
              }` +
              restValue?.value[1]
            : ""
        }
        onClick={() => setShow(true)}
      />
      <AnimatePresence>
        {show && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeIn}
            className="w-full absolute top-[110%] grid grid-cols-2 gap-3"
          >
            <ul className=" bg-white rounded-md shadow-md max-h-[15rem] overflow-auto border border-gray-300">
              {timeSlots.map((time) => (
                <li
                  key={time}
                  className={`border-b cursor-pointer py-2 px-5 hover:bg-primary-500 hover:text-white duration-100 ${start ===
                    time &&
                    "bg-primary-500 text-white"} ${disabledTimeArray.includes(
                    time
                  ) && "pointer-events-none bg-gray-200 border-gray-300"}`}
                  onClick={() => setStart(time)}
                >
                  {time}
                </li>
              ))}
            </ul>
            <ul className=" bg-white rounded-md shadow-md max-h-[15rem] overflow-auto border border-gray-300">
              {timeSlots.map((time) => (
                <li
                  key={time}
                  className={`border-b cursor-pointer py-2 px-5 hover:bg-primary-500 hover:text-white duration-100 ${end ===
                    time &&
                    "bg-primary-500 text-white"} ${disabledTimeArray.includes(
                    time
                  ) && "pointer-events-none bg-gray-200 border-gray-300"}`}
                  onClick={() => setEnd(time)}
                >
                  {time}
                </li>
              ))}
            </ul>
            <div></div>
            <div className=" flex justify-end">
              <Button
                appearance="primary"
                onClick={applyHandler}
                className=" p-1"
              >
                APPLY
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function generateTimeSlots() {
  // 480; // 8:00 AM in minutes (8 * 60)
  // 1440; // 6:00 PM in minutes (24 * 60)
  // 30; // 30 minutes
  const timeSlots = [];
  let currentDate: any = startOfDay(new Date());
  while (currentDate < addMinutes(startOfDay(new Date()), 1440)) {
    timeSlots.push(format(currentDate, "hh:mm a"));
    currentDate = addMinutes(currentDate, 30);
  }
  return timeSlots;
}
