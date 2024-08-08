import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class names
import { Teacher } from "@/types";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label";

interface ModalTeacherProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: Teacher;
}
export function ModalTeacher({ isOpen, onClose, teacher }: ModalTeacherProps) {
  console.log(teacher)
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-4xl h-[80vh]">
        <AlertDialogHeader>
          <AlertDialogTitle>Teacher Detail</AlertDialogTitle>
          <AlertDialogDescription>
            <form className="space-y-8 mt-5">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <Label>Code</Label>
                  <Input id="code" value={teacher.code} readOnly />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <Label>Firstname</Label>
                  <Input value={teacher.firstname} readOnly />
                </div>
                <div>
                  <Label>Lastname</Label>
                  <Input value={teacher.lastname} readOnly />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input value={teacher.email} readOnly />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input value={teacher.phone} readOnly />
                </div>
                <div>
                  <Label>Gender</Label>
                  <RadioGroup
                    value={teacher.gender}
                    className="flex flex-row gap-2"
                  >
                    <div className="flex items-center">
                      <RadioGroupItem value="MALE" checked={teacher.gender === "M"} disabled />
                      <span className="ml-2">Male</span>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem value="FEMALE" checked={teacher.gender === "F"} disabled />
                      <span className="ml-2">Female</span>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label>Hire date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !teacher.hireDate && "text-muted-foreground"
                        )}
                        disabled
                      >
                        {teacher.hireDate ? (
                          format(new Date(teacher.hireDate), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                  </Popover>
                </div>
                <div>
                  <Label>Address</Label>
                  <Textarea
                    value={teacher.address}
                    readOnly
                    className="resize-none"
                  />
                </div>
              </div>
            </form>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
