import AddClientModal from "../components/AddClientModal"
import Projects from "../components/Projects";
import Clients from "../components/Clients";
import AddProjectModal from "../components/AddProjectModal";
import { Flex } from "antd";

function Home() {
  return (
    <>
      <Flex justify="flex-start" gap="small">
        <AddClientModal />
        <AddProjectModal />
      </Flex>
      <Projects />
      <Clients />
    </>
  )
}

export default Home;
