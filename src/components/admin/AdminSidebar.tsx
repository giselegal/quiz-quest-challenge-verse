
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileQuestion, 
  TestTube, 
  Settings, 
  Image, 
  BarChart3, 
  Edit 
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const adminMenuItems = [
  { title: "Overview", url: "/admin", icon: LayoutDashboard },
  { title: "Quiz", url: "/admin/quiz", icon: FileQuestion },
  { title: "A/B Tests", url: "/admin/ab-tests", icon: TestTube },
  { title: "Criativos", url: "/admin/criativos", icon: Image },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Editor", url: "/admin/editor", icon: Edit },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string, exact = true) => {
    if (exact) {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };

  const isExpanded = adminMenuItems.some((item) => isActive(item.url));

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-[#B89B7A] text-white font-medium hover:bg-[#A08B6F]" 
      : "text-[#432818] hover:bg-[#F5F1E8]";

  return (
    <Sidebar
      className={collapsed ? "w-14" : "w-60"}
      collapsible
    >
      <SidebarTrigger className="m-2 self-end" />

      <SidebarContent className="bg-[#FAF9F7] border-r border-[#E5DDD5]">
        <SidebarGroup
          open={isExpanded}
          onOpenChange={() => {}}
        >
          <SidebarGroupLabel className="text-[#432818] font-semibold px-4 py-2">
            Admin Panel
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/admin"}
                      className={({ isActive }) => `flex items-center px-4 py-2 rounded-lg mx-2 transition-colors ${getNavCls({ isActive })}`}
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
