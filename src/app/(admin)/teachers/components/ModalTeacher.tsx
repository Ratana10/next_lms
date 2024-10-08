import { Teacher } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface ModalTeacherProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: Teacher;
}
export function ModalTeacher({ isOpen, onClose, teacher }: ModalTeacherProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Teacher Details
          </DialogTitle>
          <DialogDescription>View teacher details</DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="space-y-8 my-4">
          <div>
            <h3 className="text-lg text-muted-foreground mb-2 from-neutral-400">
              Code
            </h3>
            <p className="font-semibold text-lg">{teacher.code}</p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg text-muted-foreground mb-2 from-neutral-400">
                Firstname
              </h3>
              <p className="font-semibold text-lg">{teacher.firstname}</p>
            </div>
            <div>
              <h3 className="text-lg text-muted-foreground mb-2 from-neutral-400">
                Lastname
              </h3>
              <p className="font-semibold text-lg">{teacher.lastname}</p>
            </div>
            <div>
              <h3 className="text-lg text-muted-foreground mb-2 from-neutral-400">
                Phone
              </h3>
              <p className="font-semibold text-lg">{teacher.phone}</p>
            </div>
            <div>
              <h3 className="text-lg text-muted-foreground mb-2 from-neutral-400">
                Email
              </h3>
              <p className="font-semibold text-lg">{teacher.email}</p>
            </div>
            <div>
              <h3 className="text-lg text-muted-foreground mb-2 from-neutral-400">
                Gender
              </h3>
              <p className="font-semibold text-lg">{teacher.gender}</p>
            </div>
            <div>
              <h3 className="text-lg text-muted-foreground mb-2 from-neutral-400">
                HireDate
              </h3>
              <p className="font-semibold text-lg">
                {teacher.hireDate.toString()}
              </p>
            </div>
            <div>
              <h3 className="text-lg text-muted-foreground mb-2 from-neutral-400">
                Address
              </h3>
              <p className="font-semibold text-lg">{teacher.address}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
