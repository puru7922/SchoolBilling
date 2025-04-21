"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronsUpDown, Circle, Copy, Edit, ExternalLink, File, HelpCircle, Home, Loader2, Mail, MessageSquare, Moon, Plus, PlusCircle, Search, Server, Settings, Share2, Shield, Sun, Trash, User, X, Workflow, Book, Calendar as CalendarIcon, CreditCard, UserPlus, MoreHorizontal } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";

// Dummy data for demonstration purposes
const initialStudentsData = [

];

interface Student {
    id: string;
    name: string;
    enrollmentDate: string;
    feePaymentStatus: string;
}

const UpdatePaymentStatusDropdown = ({ studentId, currentStatus, onStatusUpdate }: { studentId: string, currentStatus: string, onStatusUpdate: (studentId: string, newStatus: string) => void }) => {
    const [open, setOpen] = useState(false);
    const [newStatus, setNewStatus] = useState(currentStatus);

    const handleStatusChange = () => {
        onStatusUpdate(studentId, newStatus);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Payment Status</DialogTitle>
                    <DialogDescription>
                        Select the new payment status for the student.
                    </DialogDescription>
                </DialogHeader>
                <RadioGroup defaultValue={currentStatus} className="grid gap-2" onValueChange={setNewStatus}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Paid" id="r1" />
                        <Label htmlFor="r1">Paid</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Pending" id="r2" />
                        <Label htmlFor="r2">Pending</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Overdue" id="r3" />
                        <Label htmlFor="r3">Overdue</Label>
                    </div>
                </RadioGroup>
                <DialogFooter>
                    <Button type="submit" onClick={handleStatusChange}>
                        Update Status
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(initialStudentsData);
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [paymentStatus, setPaymentStatus] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Load students from local storage on component mount
    const storedStudents = localStorage.getItem('students');
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    }
  }, []);

    const handleStatusUpdate = (studentId: string, newStatus: string) => {
        const updatedStudents = students.map(student =>
            student.id === studentId ? { ...student, feePaymentStatus: newStatus } : student
        );
        setStudents(updatedStudents);
        localStorage.setItem('students', JSON.stringify(updatedStudents));
        router.refresh();
    };

  const filteredStudents = students.filter((student) => {
    if (date?.from && date?.to) {
      const enrollmentDate = new Date(student.enrollmentDate);
      if (enrollmentDate < date.from || enrollmentDate > date.to) {
        return false;
      }
    }
    if (paymentStatus && paymentStatus !== "All" && student.feePaymentStatus !== paymentStatus) {
      return false;
    }
    return true;
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Student List</h1>
      <Button onClick={() => router.back()}>Back</Button>
      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
          <CardDescription>List of all students</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div>
              <Label htmlFor="date">Enrollment Date Range</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[300px] justify-start text-left font-normal",
                      !date?.from
                        ? "text-muted-foreground"
                        : "text-foreground"
                    )}
                  >
                    {date?.from ? (
                      date.to ? (
                        `${format(date.from, "PPP")} - ${format(date.to, "PPP")}`
                      ) : (
                        format(date.from, "PPP")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) =>
                      date > new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="paymentStatus">Payment Status</Label>
              <Select onValueChange={setPaymentStatus}>
                <SelectTrigger className="w-[240px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <ScrollArea className="rounded-md border h-[400px] w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Enrollment Date</TableHead>
                  <TableHead>Fee Payment Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.enrollmentDate}</TableCell>
                    <TableCell>{student.feePaymentStatus}</TableCell>
                    <TableCell>
                      <UpdatePaymentStatusDropdown
                        studentId={student.id}
                        currentStatus={student.feePaymentStatus}
                        onStatusUpdate={handleStatusUpdate}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
