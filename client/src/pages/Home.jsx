import AddClientModal from "../components/AddClientModal"
import Projects from "../components/Projects";
import Clients from "../components/Clients";
import AddProjectModal from "../components/AddProjectModal";

function Home() {
  return (
    <>
      <AddClientModal />
      <AddProjectModal />
      <Projects />
      <Clients />
    </>
  )
}

export default Home;