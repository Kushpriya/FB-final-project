import { useMutation } from '@apollo/client';
import { DELETE_VENUE } from '../graphql/VenueMutation';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';  
import 'react-confirm-alert/src/react-confirm-alert.css'; 

export const useDeleteVenue = (refetch) => {
  const [deleteVenue] = useMutation(DELETE_VENUE);

  const handleDelete = (clientId, venueId) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this venue?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const { data } = await deleteVenue({
                variables: { clientId, venueId },
              });
              console.log('Delete response:', data);
              if (data.deleteVenue.message) {
                toast.success('Venue deleted successfully.'); 
                refetch();
              } else {
                toast.error('Error deleting venue.'); 
              }
            } catch (error) {
              console.error('Error deleting venue:', error);
              toast.error(`Error deleting venue: ${error.message}`); 
            }
          },
        },
        {
          label: 'No',
          onClick: () => {
            toast.info('Venue deletion cancelled.'); 
          },
        },
      ],
      // className: 'custom-confirm-alert'
    });
  };

  return handleDelete;
};
