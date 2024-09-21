import { useMutation } from '@apollo/client';
import { CREATE_CLIENT, DELETE_CLIENT, EDIT_CLIENT } from '../../graphql/mutation/ClientMutation';

export const useAddClient = (refetch, setformOpen, setErrorMessage) => {
  const [createClient] = useMutation(CREATE_CLIENT);

  const handleAdd = async (formData) => {
    const { name, email, address, phone } = formData;
  
    if (!name.trim() || !email.trim() || !address.trim() || !phone.trim()) {
      setErrorMessage('All fields must be filled.');
      return;
    }
    try {
      const { data } = await createClient({ variables: { clientInfo: formData } });
      if (data.createClient.client) {
        alert('Client added successfully.');
        refetch();
        setformOpen(false);
        setErrorMessage('');
      } else {
        setErrorMessage(data.createClient.errors || 'Error adding client.');
      }
    } catch (error) {
      setErrorMessage('Error adding client.');
      console.error('Error adding client:', error);
    }
  };  

  return handleAdd;
};

export const useEditClient = (refetch, setformOpen, setErrorMessage) => {
  const [editClient] = useMutation(EDIT_CLIENT);

  const handleUpdate = async (clientId, formData) => {
    if (!clientId || !formData.name.trim() || !formData.email.trim() || !formData.address.trim() || !formData.phone.trim()) {
      setErrorMessage('Client ID or form data is invalid.');
      return;
    }
    try {
      const { data } = await editClient({
        variables: { clientId, clientInfo: formData },
      });
      if (data.editClient.client) {
        alert('Client updated successfully.');
        refetch();
        setformOpen(false);
        setErrorMessage('');
      } else {
        setErrorMessage(data.editClient.errors || 'Error updating client.');
      }
    } catch (error) {
      console.error('Error updating client:', error);
      setErrorMessage('Error updating client.');
    }
  };
  

  return handleUpdate;
};

export const useDeleteClient = (refetch) => {
  const [deleteClient] = useMutation(DELETE_CLIENT);

  const handleDelete = async (clientId) => {
    if (!clientId) {
      alert('Invalid client ID');
      return;
    }

    if (window.confirm("Are you sure you want to delete this client?")) {

      try {
        const { data } = await deleteClient({ variables: { clientId: String(clientId).trim() } });
        if (data.deleteClient.message === 'Client deleted successfully') {
        alert('Client deletted successfully.');
        refetch();
        } else {
          console.error('Delete failed:', data.deleteClient.message || 'Unknown error');
        }
      } catch (err) {
        console.error('Delete failed:', err.message);
      }
    }
    };
  
  return handleDelete;
};
