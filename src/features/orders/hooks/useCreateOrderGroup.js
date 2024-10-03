import { useMutation } from '@apollo/client';
import { CREATE_ORDER_GROUP } from '../graphql/OrderGroupMutation';
import { toast } from 'react-toastify';

export const useCreateOrderGroup = (refetch, setformOpen, setErrorMessage) => {
  const [createOrderGroup] = useMutation(CREATE_ORDER_GROUP);

  const handleCreate = async (formData) => {
    console.log("Form Data:", formData); 
  
    try {
      const { data } = await createOrderGroup({ variables: { orderGroupInfo: formData } });
      if (data.createOrderGroup.orderGroup) {
        toast.success('Order group created successfully.');
        refetch();
        setformOpen(false);
        setErrorMessage('');
      } else {
        toast.error('Error creating order group.');
      }
    } catch (error) {
      console.error('Error creating order group:', error);
      const errorMessage = error?.graphQLErrors?.[0]?.message || error.message || 'An unexpected error occurred.';
      toast.error(`Error creating order group: ${errorMessage}`);
      setErrorMessage(errorMessage);
    }
  };
  
  return handleCreate;
};
