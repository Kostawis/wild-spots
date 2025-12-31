import Heading from "../../components/text/Heading";
import { useSession } from "../../context/sessionContext";
import { routes } from "../../router/routes";
import { DashboardTail } from "../components/DashboardTail";

const DashboardGeneralPage = () => {
  const { profile } = useSession();

  return (
    <>
      <Heading.H1 className="mb-4">
        Witaj {profile?.username || "Użytkowniku"}!
      </Heading.H1>
      <div className="grid gap-6 pt-6 md:grid-cols-auto-fill-460">
        <DashboardTail
          title="Twoje miejscówki"
          description="Lista wszystkich dodanych przez ciebue miejscówek"
          route={routes.dashboard.places}
        />
      </div>
    </>
  );
};

export default DashboardGeneralPage;
