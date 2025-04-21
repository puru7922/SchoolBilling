"use client";

import { Icons } from "@/components/icons";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import React, { useState, useEffect } from "react";
import AddStudentModal from "@/components/AddStudentModal";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [students, setStudents] = useState([]);

    useEffect(() => {
        // Load students from local storage on component mount
        const storedStudents = localStorage.getItem('students');
        if (storedStudents) {
            setStudents(JSON.parse(storedStudents));
        }
    }, []);

  const handleAddStudent = (newStudent: any) => {
      const updatedStudents = [...students, newStudent];
      setStudents(updatedStudents);
      localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  return (
    <SidebarProvider>
      <div className="flex">
        <AppBar />
        <Sidebar>
          <SidebarHeader>
            <h1 className="font-bold text-xl">CampusConnect</h1>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard">
                  <Icons.home className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/students">
                  <Icons.user className="mr-2 h-4 w-4" />
                  <span>Students</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/billing">
                  <Icons.creditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
          <AddStudentModal onAddStudent={handleAddStudent} />
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 p-4">{React.cloneElement(children, { students: students })}</div>
      </div>
    </SidebarProvider>
  );
}

const AppBar = () => {
  const { toggleSidebar } = useSidebar();
    const router = useRouter();

  return (
    <div className="fixed top-0 left-0 w-full h-14 bg-secondary border-b border-border z-10">
      <div className="flex items-center justify-between h-full px-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Icons.arrowRight className="h-6 w-6" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
        <span className="font-bold text-xl">CampusConnect</span>
        <div></div> {/* Placeholder for centering the title */}
      </div>
    </div>
  );
};
