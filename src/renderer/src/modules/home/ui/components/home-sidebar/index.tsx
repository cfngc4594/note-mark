import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { MainSection } from "@/modules/home/ui/components/home-sidebar/main-section";

export const HomeSidebar = () => {
  return (
    <Sidebar className="pt-12 z-40 border-none" collapsible="icon">
      <SidebarContent className="border-r">
        <MainSection />
      </SidebarContent>
    </Sidebar>
  );
};
