import { FC } from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { PlaceDrawer } from "../components/molecules/PlaceDrawer";
import Footer from "../components/Footer";
import { useViewportHeight } from "../hooks/useViewportHeight";
import { Drawer } from "../drawer/components/Drawer";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { closeDrawer } from "../redux/drawer/drawerSlice";
import { DrawerContent } from "../drawer/components/DrawerContent";

const MainTemplate: FC = () => {
  const dispatch = useAppDispatch();
  const { open } = useAppSelector((s: RootState) => s.drawer);

  useViewportHeight();

  return (
    <div className="debug-screens flex h-[calc(var(--vh)*100)] flex-col">
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
