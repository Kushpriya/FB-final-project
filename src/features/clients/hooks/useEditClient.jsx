import { useMutation } from '@apollo/client';
import { EDIT_CLIENT } from '../graphql/ClientMutation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useEditClient = (refetch, setFormOpen, setErrorMessage) => {
  const [editClient] = useMutation(EDIT_CLIENT);

  const handleUpdate = async (clientId, formData) => {
    if (!clientId || !formData.name.trim() || !formData.email.trim() || !formData.address.trim() || !formData.phone.trim()) {
      setErrorMessage('Client ID or form data is invalid.');
      toast.error('Invalid input. Please fill in all required fields.');
      return;
    }

    try {
      const { data } = await editClient({
        variables: { clientId, clientInfo: formData },
      });

      if (data.editClient.client) {
        toast.success('Client updated successfully.');
        refetch();
        setFormOpen(false);
        setErrorMessage('');
      } else {
        const errorMsg = data.editClient.errors || 'Error updating client.';
        setErrorMessage(errorMsg);
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error('Error updating client:', error);
      setErrorMessage('Error updating client.');
      toast.error('An error occurred while updating the client.');
    }
  };

  return handleUpdate;
};
