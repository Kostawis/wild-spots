import { Link } from "react-router-dom";
import { routes } from "../router/routes";

const NotFoundPage: React.FC = () => {
  return (
    <main>
      <section>
        <h1>404 Page Not Found</h1>
        <Link to={routes.home}>Go back to Home</Link>
      </section>
    </main>
  );
};

export default NotFoundPage;
