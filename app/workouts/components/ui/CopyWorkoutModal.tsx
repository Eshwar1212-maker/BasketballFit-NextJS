"use client";
import Modal from "@/app/components/Modal";
import { FC, useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { SlCalender } from "react-icons/sl";
import { Calendar } from "@/components/ui/calendar";
import { exercise } from "@/app/types";
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface CopyWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  workouts: any;
  handleCallback: (exercise: any) => void
  dateValue: Date
}

const CopyWorkoutModal: FC<CopyWorkoutModalProps> = ({
  isOpen,
  onClose,
  workouts,
  handleCallback,
  dateValue
}) => {
  const [date, setDate] = useState<any>(new Date());
  const [currentDate, setCurrentDate] = useState<any>(new Date());
  const [currentWorkouts, setCurrentWorkouts] = useState<exercise[]>([]);

  console.log(currentWorkouts, "  ", date);

  useEffect(() => {
    const workoutsForSelectedDate = workouts.filter((workout: any) => {
      return format(new Date(workout.date), "PPP") === format(date, "PPP");
    });

    setCurrentWorkouts(workoutsForSelectedDate);
  }, [date]);


  const addWorkoutsFunction = async (workouts: exercise[]) => {
    const result = await Promise.allSettled(
      workouts.map(async(workout) => {
        try{
          const response = await axios.post("api/workouts", {...workout, date: dateValue})
          return response.data
        }catch(error){

        }
      })
    )
    return await result
  }

  const { mutate: addWorkout, isLoading } = useMutation(
       addWorkoutsFunction,
    {
      onSuccess: (response) => {
        console.log(response);
        toast.success("Workout copied!")
      },
      onError: (error) => {
        console.log(error);
        
      },
    }
  );


  

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="h-[40vh]">
        <h2 className="text-center font-semibold text-lg">Select a date</h2>
        <div className="flex flex-row">
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button className="rounded-md">
                  <SlCalender size={20} className="" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex justify-center flex-col">
          <h3 className="text-center text-sm font-semibold">
            {date.toString().split(" ")[0] +
              "/" +
              date.toString().split(" ")[1] +
              "/" +
              date.toString().split(" ")[2]}
          </h3>
          <div className="max-h-[240px] overflow-y-auto">
            {currentWorkouts.map((w) => {
              return (
                <div className="flex bg-gray-100 dark:bg-inherit justify-between gap-4 m-2 p-2 rounded-lg">
                  <p className="w-[180px] md:w-[300px]">{w.title}</p>
                  <p>{w.reps ? w.reps : 0} reps</p>
                  <p>{w.sets ? w.sets : 0} sets</p>
                </div>
              );
            })}
          </div>
          {workouts.length === 0 && (
          <p className="px-10 text-sm my-20">
            You have no workouts! Use our log more, add in workouts for different days, 
            than you can copy and paste workouts.
          </p>
        )}
          <div>
            <Button
              className="rounded-md fixed bottom-4 right-8"
              disabled={currentWorkouts.length === 0!! || isLoading}
              onClick={() => {
                addWorkout(currentWorkouts)
                handleCallback(currentWorkouts)
                onClose()
              }}
              
             
            >
              Copy
            </Button>
          </div>
          
        </div>
      </div>
    </Modal>
  );
};

export default CopyWorkoutModal;
