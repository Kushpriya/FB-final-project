import { useMutation } from '@apollo/client';
import { CREATE_TRANSPORT } from '../graphql/TransportMutation';
import { toast } from 'react-toastify';

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
        toast.success('Transport added successfully.');
        refetch();
        setIsModalOpen(false);
      } else {
        setErrorMessage('Error adding transport.');
        toast.error('Error adding transport.');
      }
    } catch (error) {
      setErrorMessage('Error adding transport.');
      toast.error('Error adding transport.');
      console.error('Error adding transport:', error);
    }
  };

  return handleAdd;
};
