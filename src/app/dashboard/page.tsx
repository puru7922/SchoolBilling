"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DashboardProps {
  students: any[];
}

export default function Dashboard({ students }: DashboardProps) {
  let pendingCount = 0;
  let paidCount = 0;
  let overdueCount = 0;

  if (students && Array.isArray(students)) {
    students.forEach((student) => {
      if (student.feePaymentStatus === "Pending") {
        pendingCount++;
      } else if (student.feePaymentStatus === "Paid") {
        paidCount++;
      } else if (student.feePaymentStatus === "Overdue") {
        overdueCount++;
      }
    });
  }

  return (
    <div className="p-4 mt-14 w-full">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="flex flex-col gap-6">
        <Card className="w-full">
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

