import { ReactNode } from "react";
import { Drawer as VaulDrawer } from "vaul";

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
        <VaulDrawer.Overlay className="fixed inset-0 bg-black/40" />
        <VaulDrawer.Content className="border-b-none fixed bottom-0 left-0 right-0 mx-[-1px] flex h-full max-h-[90%] flex-col rounded-t-[10px] border border-gray-200 bg-white">
          <VaulDrawer.Title className="hidden">
            Edycja miejscówki
          </VaulDrawer.Title>
          {/* <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-gray-300" /> */}
          <div className="flex-1 pb-4 mt-2 overflow-y-auto">{children}</div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
};
