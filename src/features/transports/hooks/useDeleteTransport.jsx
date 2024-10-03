import { useMutation } from '@apollo/client';
import { DELETE_TRANSPORT } from '../graphql/TransportMutation';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';  
import 'react-confirm-alert/src/react-confirm-alert.css'; 

export const useDeleteTransport = (refetch) => {
  const [deleteTransport] = useMutation(DELETE_TRANSPORT);

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this transport?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const { data } = await deleteTransport({ variables: { transportId: id } });
              console.log('Delete response:', data);
              if (data.deleteTransport.message) {
                toast.success('Transport deleted successfully.');
                refetch();
              } else {
                toast.error('Error deleting transport.');
              }
            } catch (error) {
              toast.error(`Error deleting transport: ${error.message}`);
              console.error('Error deleting transport:', error);
            }
          }
        },
        {
          label: 'No',
          onClick: () => {
            toast.info('Transport deletion cancelled.');
          }
        }
      ],
      className: 'custom-confirm-alert'
    });
  };

  return handleDelete;
};
