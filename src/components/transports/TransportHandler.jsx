import { useMutation } from '@apollo/client';
import { CREATE_TRANSPORT, EDIT_TRANSPORT, DELETE_TRANSPORT } from '../../graphql/mutation/TransportMutation'; 

export const useAddTransport = (refetch, setIsModalOpen, setErrorMessage) => {
  const [createTransport] = useMutation(CREATE_TRANSPORT);

  const handleAdd = async (formData) => {
    if (!formData.name.trim() || !formData.vehicleType.trim() || !formData.status.trim()) {
      setErrorMessage('All fields are required.');
      return;
    }

    try {
      const { data } = await createTransport({ variables: { transportInfo: formData } });
      if (data.createTransport.transport) {
        alert('Transport added successfully.');
        refetch();
        setIsModalOpen(false);
      } else {
        setErrorMessage('Error adding transport.');
      }
    } catch (error) {
      setErrorMessage('Error adding transport.');
      console.error('Error adding transport:', error);
    }
  };

  return handleAdd;
};

// Edit Transport Hook
export const useEditTransport = (refetch, setIsModalOpen, setErrorMessage) => {
  const [editTransport] = useMutation(EDIT_TRANSPORT);

  const handleUpdate = async (transportData, updatedData) => {
    if (!updatedData.name.trim() || !updatedData.vehicleType.trim() || !updatedData.status.trim()) {
      setErrorMessage('All fields are required.');
      return;
    }

    try {
      const { data } = await editTransport({
        variables: { transportId: transportData.id, transportInfo: updatedData }
      });
      if (data.updateTransport.transport) {
        alert('Transport updated successfully.');
        refetch();
        setIsModalOpen(false);
      } else {
        setErrorMessage('Error updating transport.');
      }
    } catch (error) {
      setErrorMessage('Error updating transport.');
      console.error('Error updating transport:', error);
    }
  };

  return handleUpdate;
};

export const useDeleteTransport = (refetch) => {
  const [deleteTransport] = useMutation(DELETE_TRANSPORT);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this transport?')) return;

    try {
      const { data } = await deleteTransport({ variables: { transportId: id } });
      
      if (data.deleteTransport.success) {
        alert('Transport deleted successfully.');
        refetch();
      } else {
        alert('Error deleting transport.');
      }
    } catch (error) {
      alert('Error deleting transport.');
      console.error('Error deleting transport:', error);
    }
  };

  return handleDelete;
};
