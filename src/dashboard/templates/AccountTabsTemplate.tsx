import { Outlet } from "react-router-dom";

// const TAB_ITEMS_MY_ACCOUNT = [
//   {
//     name: "Moje miejscówki",
//     route: routes.dashboard.main,
//   },
//   {
//     name: "Ustawienia",
//     route: routes.dashboard.settings.accountSettings,
//     hasNestedUrl: true,
//   },
// ];

const AccountTabsTemplate = () => {
  // const { session, profile } = useSession();

  return (
    <>
      <div className="flex flex-col px-6">
        {/* {profile && (
          <AccountHeader
            firstName={profile.username || "Firstname"}
            email={session?.user.email}
            // socialMedia={{
            //   facebook: "swswsw",
            //   instagram: "swsww",
            //   youtube: "ssdsvsvr",
            // }}
          />
        )} */}

        {/* <Tabs tabs={TAB_ITEMS_MY_ACCOUNT} /> */}
        <Outlet />
      </div>
    </>
  );
};

export default AccountTabsTemplate;
