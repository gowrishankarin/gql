import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { Button } from "antd";

// @ts-ignore
import { DELETE_PROJECT } from "../mutations/projectMutations";
// @ts-ignore
import { GET_PROJECTS } from "../queries/projectQueries";

function DeleteProjectButton({ projectId }: { projectId: string }) {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  return (
    <div className="d-flex mt-5 ms-auto">
      <Button danger onClick={() => deleteProject()}>
        <FaTrash className="icon" /> Delete Project
      </Button>
    </div>
  );
}

export default DeleteProjectButton;
