import { useMutation } from '@apollo/client';
import { EDIT_VENUE } from '../graphql/VenueMutation';
import { toast } from 'react-toastify'; 

export const useEditVenue = (refetch, setformOpen, setErrorMessage) => {
  const [editVenue] = useMutation(EDIT_VENUE);

  const handleUpdate = async (clientId, venueId, name) => {
    if (!venueId || !name.trim()) {
      setErrorMessage('Venue ID or name is invalid.');
      return;
    }

    try {
      const { data } = await editVenue({
        variables: { clientId, venueId, name },
      });

      if (data.editVenue.venue) {
        setErrorMessage('');
        toast.success('Venue updated successfully!'); 
        refetch();
        setformOpen(false);
      } else {
        setErrorMessage('Error updating venue.');
        toast.error('Error updating venue.'); 
      }
    } catch (error) {
      console.error('Error updating venue:', error);
      setErrorMessage(error.message);
      toast.error('Error updating venue: ' + error.message); 
    }
  };

  return handleUpdate;
};
