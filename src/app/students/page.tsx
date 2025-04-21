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

// Dummy data for demonstration purposes
const initialStudentsData = [
  {
    id: "1",
    name: "John Doe",
    enrollmentDate: "2024-01-15",
    feePaymentStatus: "Paid",
  },
  {
    id: "2",
    name: "Jane Smith",
    enrollmentDate: "2023-11-20",
    feePaymentStatus: "Pending",
  },
  {
    id: "3",
    name: "Alice Johnson",
    enrollmentDate: "2024-02-01",
    feePaymentStatus: "Paid",
  },
  {
    id: "4",
    name: "Bob Williams",
    enrollmentDate: "2023-12-10",
    feePaymentStatus: "Overdue",
  },
];

export default function StudentsPage() {
  const [students, setStudents] = useState(initialStudentsData);
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

  useEffect(() => {
    // Save students to local storage whenever the students state changes
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);


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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Enrollment Date</TableHead>
                <TableHead>Fee Payment Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.enrollmentDate}</TableCell>
                  <TableCell>{student.feePaymentStatus}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
