import AddClientModal from "../components/AddClientModal"
import Projects from "../components/Projects";
import Clients from "../components/Clients";

function Home() {
  return (
    <>
      <AddClientModal />
      <Projects />
      <Clients />
    </>
  )
}

export default Home