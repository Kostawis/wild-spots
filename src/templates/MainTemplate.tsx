import { FC } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { Drawer } from "../drawer/components/Drawer";
import { DrawerContent } from "../drawer/components/DrawerContent";
import { useViewportHeight } from "../hooks/useViewportHeight";
import { closeDrawer } from "../redux/drawer/drawerSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";

const MainTemplate: FC = () => {
  const dispatch = useAppDispatch();
  const { open } = useAppSelector((s: RootState) => s.drawer);

  useViewportHeight();

  return (
    <div className="flex h-[calc(var(--vh)*100)] flex-col">
      <NavBar />
      <Outlet />
      <Footer />

      <Drawer
        open={open}
        onOpenChange={(open) => !open && dispatch(closeDrawer())}
      >
        <DrawerContent />
      </Drawer>
    </div>
  );
};

export default MainTemplate;
