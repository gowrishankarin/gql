import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { Button, message } from "antd";

// @ts-ignore
import { DELETE_CLIENT } from "../mutations/clientMutations";
// @ts-ignore
import { GET_CLIENTS } from "../queries/clientQueries";

import { Client } from "../types/client";

function ClientRow({ client }: { client: Client }) {
  // const [messageApi, contextHolder] = message.useMessage();
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: {
      id: client.id,
    },
    // refetchQueries: [{ query: GET_CLIENTS }],
    update(cache, { data: { deleteClient } }) {
      if (deleteClient.success) {
        message.info(deleteClient.message);
        // @ts-ignore
        const { clients } = cache.readQuery({
          query: GET_CLIENTS,
        });
        cache.writeQuery({
          query: GET_CLIENTS,
          data: {
            clients: clients.filter(
              (client: Client) => client.id !== deleteClient.client.id
            ),
          },
        });
      } else {
        message.error(deleteClient.message);
      }
    },
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>

      <td>
        <Button
          danger
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            deleteClient()
          }
        >
          <FaTrash />
        </Button>
      </td>
    </tr>
  );
}

export default ClientRow;
