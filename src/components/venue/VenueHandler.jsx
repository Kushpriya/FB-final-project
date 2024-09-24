import { useMutation } from '@apollo/client';
import { CREATE_VENUE, EDIT_VENUE, DELETE_VENUE } from '../../graphql/mutation/VenueMutation';

export const useAddVenue = (refetch, setformOpen, setErrorMessage) => {
  const [createVenue] = useMutation(CREATE_VENUE);

  const handleAdd = async (formData) => {
    if (!formData.name.trim() || !formData.clientId.trim()) {
      setErrorMessage('Fields cannot be empty.');
      return;
    }

    try {
      const { data } = await createVenue({
        variables: { clientId: formData.clientId, name: formData.name },
      });
      if (data.createVenue.venue) {
        setErrorMessage('');
        refetch();
        setformOpen(false);
      } else {
        setErrorMessage('Error adding venue.');
      }
    } catch (error) {
      console.error('Error adding venue:', error);
      setErrorMessage(error.message);
    }
  };

  return handleAdd;
};

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
        refetch();
        setformOpen(false);
      } else {
        setErrorMessage('Error updating venue.');
      }
    } catch (error) {
      console.error('Error updating venue:', error);
      setErrorMessage(error.message);
    }
  };

  return handleUpdate;
};

export const useDeleteVenue = (refetch) => {
  const [deleteVenue] = useMutation(DELETE_VENUE);

  const handleDelete = async (clientId, venueId) => {
    try {
      await deleteVenue({
        variables: { clientId, venueId },
      });
      refetch();
    } catch (error) {
      console.error('Error deleting venue:', error);
    }
  };

  return handleDelete;
};
