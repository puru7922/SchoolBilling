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
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

const bills = [
  {
    id: "1",
    student: "John Doe",
    amount: "$500",
    dueDate: "2024-08-01",
    status: "Pending",
  },
  {
    id: "2",
    student: "Jane Smith",
    amount: "$750",
    dueDate: "2024-08-15",
    status: "Paid",
  },
  {
    id: "3",
    student: "Alice Johnson",
    amount: "$600",
    dueDate: "2024-08-22",
    status: "Overdue",
  },
  {
    id: "4",
    student: "Bob Williams",
    amount: "$800",
    dueDate: "2024-09-01",
    status: "Pending",
  },
  {
    id: "5",
    student: "Charlie Brown",
    amount: "$400",
    dueDate: "2024-09-15",
    status: "Paid",
  },
  {
    id: "6",
    student: "Diana Prince",
    amount: "$900",
    dueDate: "2024-09-22",
    status: "Overdue",
  },
];

export default function Dashboard() {
    let pendingCount = 0;
    let paidCount = 0;
    let overdueCount = 0;

    bills.forEach(bill => {
        if (bill.status === "Pending") {
            pendingCount++;
        } else if (bill.status === "Paid") {
            paidCount++;
        } else if (bill.status === "Overdue") {
            overdueCount++;
        }
    });

  return (
    <div className="p-0">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Billing Overview</CardTitle>
            <CardDescription>Summary of student bills</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Pending Bills: {pendingCount}</p>
            <p>Paid Bills: {paidCount}</p>
            <p>Overdue Bills: {overdueCount}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
