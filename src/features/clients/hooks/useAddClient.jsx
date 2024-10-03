import { useMutation } from '@apollo/client';
import { CREATE_CLIENT } from '../graphql/ClientMutation';
import { toast } from 'react-toastify';  

export const useAddClient = (refetch, setformOpen, setErrorMessage) => {
  const [createClient] = useMutation(CREATE_CLIENT);

  const handleAdd = async (formData) => {
    const { name, email, address, phone } = formData;
  
    // if (!name.trim() || !email.trim() || !address.trim() || !phone.trim()) {
    //   setErrorMessage('All fields must be filled.');
    //   toast.error('All fields must be filled.');  
    //   return;
    // }
    try {
      const { data } = await createClient({ variables: { clientInfo: formData } });
      if (data.createClient.client) {
        toast.success('Client added successfully.');  
        refetch();
        setformOpen(false);
        setErrorMessage('');
      } else {
        const errorMsg = data.createClient.errors || 'Error adding client.';
        setErrorMessage(errorMsg);
        toast.error(errorMsg);  
      }
    } catch (error) {
      const errorMsg = error.message || 'Error adding client.';
      setErrorMessage(errorMsg);
      toast.error(errorMsg);  
      console.error('Error adding client:', error);
    }
  };

  return handleAdd;
};
