"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface AddStudentModalProps {
}

const AddStudentModal: React.FC<AddStudentModalProps> = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [enrollmentDate, setEnrollmentDate] = useState("");
  const [feePaymentStatus, setFeePaymentStatus] = useState("Pending");
    const router = useRouter();

  const handleAddStudent = () => {
    if (name && email && enrollmentDate && feePaymentStatus) {
      const newStudent = {
        id: Math.random().toString(36).substring(7),
        name,
        email,
        enrollmentDate,
        feePaymentStatus,
      };
        toast({
            title: "Success",
            description: "Student added successfully.",
        });
      setName("");
      setEmail("");
      setEnrollmentDate("");
      setFeePaymentStatus("Pending");
        router.refresh();
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Add Student</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Student</AlertDialogTitle>
          <AlertDialogDescription>
            Enter the details for the new student.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="Student Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Student Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="enrollmentDate">Enrollment Date</Label>
            <Input
              type="date"
              id="enrollmentDate"
              placeholder="Enrollment Date"
              value={enrollmentDate}
              onChange={(e) => setEnrollmentDate(e.target.value)}
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAddStudent}>
            Add Student
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddStudentModal;
