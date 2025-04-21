"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Icons} from "@/components/icons";

interface AddStudentModalProps {
  onAddStudent: (newStudent: { id: string; name: string; fathersName: string; mothersName: string; dateOfBirth: string; gender: string; address: string; studentClass: string, enrollmentDate: string; feePaymentStatus: string }) => void;
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({ onAddStudent }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [fathersName, setFathersName] = useState("");
  const [mothersName, setMothersName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [enrollmentDate, setEnrollmentDate] = useState("");
  const [feePaymentStatus, setFeePaymentStatus] = useState("Pending");
  const router = useRouter();

  const handleAddStudent = () => {
    if (name && fathersName && mothersName && dateOfBirth && gender && address && studentClass  && enrollmentDate && feePaymentStatus) {
      const newStudent = {
        id: Math.random().toString(36).substring(7),
        name,
        fathersName,
        mothersName,
        dateOfBirth,
        gender,
        address,
        studentClass,
        enrollmentDate,
        feePaymentStatus,
      };
      onAddStudent(newStudent);
      toast({
        title: "Success",
        description: "Student added successfully.",
      });
      setName("");
      setFathersName("");
      setMothersName("");
      setDateOfBirth("");
      setGender("");
      setAddress("");
      setStudentClass("");
      setEnrollmentDate("");
      setOpen(false);
      router.refresh();
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
            <Icons.userPlus className="mr-2 h-4 w-4" />
            Add Student
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>
            Enter the details for the new student.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="Student Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="fathersName">Father's Name</Label>
            <Input
              type="text"
              id="fathersName"
              placeholder="Father's Name"
              value={fathersName}
              onChange={(e) => setFathersName(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="mothersName">Mother's Name</Label>
            <Input
              type="text"
              id="mothersName"
              placeholder="Mother's Name"
              value={mothersName}
              onChange={(e) => setMothersName(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              type="date"
              id="dateOfBirth"
              placeholder="Date of Birth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="gender">Gender</Label>
            <Select onValueChange={setGender}>
              <SelectTrigger className="w-[240px]" required>
                <SelectValue placeholder="Select gender"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input
              type="text"
              id="address"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="studentClass">Class</Label>
            <Input
              type="text"
              id="studentClass"
              placeholder="Class"
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              required
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
              required
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleAddStudent}>
            Add Student
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentModal;
