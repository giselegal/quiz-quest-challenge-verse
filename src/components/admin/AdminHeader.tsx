"use client";

import React from "react";
import { Bell, Search, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminAuth } from "@/context/AdminAuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminHeaderProps {
  title?: string;
}

export function AdminHeader({ title }: AdminHeaderProps) {
  const { adminUser, adminLogout } = useAdminAuth();

  const handleLogout = () => {
    adminLogout();
  };

  return (
    <header className="bg-white border-b border-[#D4C4A0] px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-[#432818]">
            {title || "Quiz Sell Genius"}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#B89B7A]" />
            <Input
              placeholder="Buscar..."
              className="pl-10 w-64 border-[#D4C4A0]"
            />
          </div>

          <Button variant="ghost" size="sm">
            <Bell className="w-5 h-5 text-[#B89B7A]" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
              >
                <User className="w-5 h-5 text-[#B89B7A]" />
                <span className="text-sm text-[#432818]">
                  {adminUser?.email?.split("@")[0] || "Admin"}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
