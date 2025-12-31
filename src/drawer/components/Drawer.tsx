import { Drawer as VaulDrawer } from "vaul";
import { ReactNode } from "react";

type DrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
};

export const Drawer = ({ open, onOpenChange, children }: DrawerProps) => {
  return (
    <VaulDrawer.Root
      open={open}
      onOpenChange={onOpenChange}
      dismissible={false}
      disablePreventScroll={true}
    >
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className="fixed inset-0 z-40 bg-black/40" />
        <VaulDrawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex max-h-[90vh] flex-col rounded-t-2xl bg-white dark:bg-gray-900">
          <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-gray-300" />
          {children}
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
};
