import { useMutation } from '@apollo/client';
import { CREATE_CLIENT, DELETE_CLIENT, EDIT_CLIENT } from '../../graphql/mutation/ClientMutation';

export const useAddClient = (refetch, setIsModalOpen ,setErrorMessage) => {
  const [createClient] = useMutation(CREATE_CLIENT);

  const handleAdd = async (formData) => {
    if (!formData.name.trim() || !formData.address.trim()) {
      alert('Fields cannot be empty.');
      return;
    }

    try {
      const { data } = await createClient({ variables: { clientInfo: formData } });
      if (data.createClient.client) {
        alert('Client added successfully.');
        refetch();
        setIsModalOpen(false);
        setErrorMessage('');
      } else {
        alert('Error adding client.');
      }
    } catch (error) {
      alert('Error adding client.');
      console.error('Error adding client:', error);
    }
  };

  return handleAdd;
};

export const useEditClient = (refetch, setIsModalOpen,setErrorMessage) => {
  const [editClient] = useMutation(EDIT_CLIENT);

  const handleUpdate = async (selectedClient, formData) => {
    console.log('Form Data for Update:', formData);
  
    if (!selectedClient?.id || !formData.name.trim() || !formData.address.trim()) {
      alert('Client ID or form data is invalid.');
      return;
    }
  
    try {
      const { data } = await editClient({
        variables: { clientId: selectedClient.id, clientInfo: formData },
      });
  
      if (data.editClient.client) {
        alert('Client updated successfully.');
        refetch();
        setIsModalOpen(false);
        setErrorMessage('');
      } else {
        alert('Error updating client.');
      }
    } catch (error) {
      console.error('Error updating client:', error);
      alert('Error updating client.');
    }
  };

  return handleUpdate;
};


export const useDeleteClient = (refetch) => {
  const [deleteClient] = useMutation(DELETE_CLIENT);

  const handleDelete = async (clientId) => {
    try {
      const { data } = await deleteClient({ variables: { clientId: String(clientId).trim() } });
      if (data.deleteClient.message === 'Client deleted successfully') {
        console.log('Client deleted successfully');
        await refetch(); 
        console.log('Data refetched');
      } else {
        console.error('Delete failed:', data.deleteClient.message || 'Unknown error');
      }
    } catch (err) {
      console.error('Delete failed:', err.message);
    }
  };
  
  return handleDelete;
};



  
