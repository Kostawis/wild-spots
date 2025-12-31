import { Link } from "react-router-dom";
import { useSession } from "../context/sessionContext";
import supabase from "../supabase";

const ProtectedPage = () => {
  const { session } = useSession();

  const buttonHandler = async () => {
    try {
      const data = await supabase.from("places").insert([
        {
          name: "New Place",
          description: "A newly added place",
          lat: 1,
          lng: 2.8374837,
          category: "semi-legal",
        },
      ]);
    } catch (err) {
      console.error("Error inserting data:", err);
    }
  };

  return (
    <main>
      <Link className="home-link" to="/">
        ◄ Home
      </Link>
      <section className="main-container">
        <h1 className="header-text">This is a Protected Page</h1>
        <button onClick={buttonHandler}>Add place</button>
        <p>Current User : {session?.user.email || "None"}</p>
      </section>
    </main>
  );
};

export default ProtectedPage;
