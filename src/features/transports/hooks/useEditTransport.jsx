import { useMutation } from '@apollo/client';
import { EDIT_TRANSPORT } from '../graphql/TransportMutation';
import { toast } from 'react-toastify';

export const useEditTransport = (refetch, setIsModalOpen, setErrorMessage) => {
  const [editTransport] = useMutation(EDIT_TRANSPORT);

  const handleUpdate = async (transportData, updatedData) => {
    if (!updatedData.name.trim() || !updatedData.vehicleType.trim() || !updatedData.status.trim()) {
      setErrorMessage('All fields are required.');
      toast.error('All fields are required.');
      return;
    }

    try {
      // console.log('Transport ID:', transportData.id);
      const { data } = await editTransport({
        variables: {
          transportId: transportData.id,
          transportInfo: {
            name: updatedData.name,
            vehicleType: updatedData.vehicleType,
            status: updatedData.status,
          },
        },
      });
      if (data.updateTransport.transport) {
        toast.success('Transport updated successfully.');
        refetch();
        setIsModalOpen(false);
      } else {
        setErrorMessage('Error updating transport.');
        toast.error('Error updating transport.');
      }
    } catch (error) {
      setErrorMessage('Error updating transport.');
      toast.error('Error updating transport.');
      console.error('Error updating transport:', error);
    }
  };

  return handleUpdate;
};
