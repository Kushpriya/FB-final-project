import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../graphql/ClientMutation';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';  
import 'react-confirm-alert/src/react-confirm-alert.css'; 
// import './ConfirmAlert.css';


export const useDeleteClient = (refetch) => {
  const [deleteClient] = useMutation(DELETE_CLIENT);

  const handleDelete = async (clientId) => {
    if (!clientId) {
      toast.error('Invalid client ID');
      return;
    }

    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this client?',
      buttons: [
        {
          label: 'Yes',
          // className: 'yes-button', 
          onClick: async () => {
            try {
              const { data } = await deleteClient({ variables: { clientId: String(clientId).trim() } });
              if (data.deleteClient.message === 'Client deleted successfully') {
                toast.success('Client deleted successfully.');
                refetch();
              } else {
                const errorMessage = data.deleteClient.message || 'Unknown error';
                toast.error(`Delete failed: ${errorMessage}`);
                console.error('Delete failed:', errorMessage);
              }
            } catch (err) {
              const errorMsg = err.message || 'Delete failed';
              toast.error(errorMsg);
              console.error('Delete failed:', err.message);
            }
          }
        },
        {
          label: 'No',
          // className: 'no-button', 
          onClick: () => {
            toast.info('Client deletion cancelled.');
          }
        }
      ],
      // className: 'custom-confirm-alert custom-form'  
    });
  };

  return handleDelete;
};
