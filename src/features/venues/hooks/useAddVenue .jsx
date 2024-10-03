import { useMutation } from '@apollo/client';
import { CREATE_VENUE } from '../graphql/VenueMutation';
import { toast } from 'react-toastify';

export const useAddVenue = (refetch, setformOpen, setErrorMessage) => {
  const [createVenue] = useMutation(CREATE_VENUE);

  const handleAdd = async (formData) => {
    if (!formData.name.trim() || !formData.clientId.trim()) {
      setErrorMessage('Fields cannot be empty.');
      toast.error('Fields cannot be empty.'); 
      return;
    }

    try {
      const { data } = await createVenue({
        variables: { clientId: formData.clientId, name: formData.name },
      });
      if (data.createVenue.venue) {
        setErrorMessage('');
        toast.success('Venue added successfully!'); 

        refetch();
        setformOpen(false);
      } else {
        setErrorMessage('Error adding venue.');
        toast.error('Error adding venue.'); 
      }
    } catch (error) {
      console.error('Error adding venue:', error);
      setErrorMessage(error.message);
      toast.error('Error adding venue: ' + error.message); 
    }
  };

  return handleAdd;
};
