import { useMutation } from '@apollo/client';
import { EDIT_ORDER_GROUP } from '../graphql/OrderGroupMutation';
import { toast } from 'react-toastify';

export const useEditOrderGroup = (refetch, setformOpen, setErrorMessage) => {
  const [editOrderGroup] = useMutation(EDIT_ORDER_GROUP);

  const handleUpdate = async (orderGroupId, formData) => {
    try {
      const { data } = await editOrderGroup({
        variables: { orderGroupId, 
          orderGroupInfo: formData },
      });

      if (data?.editOrderGroup?.orderGroup) {
        toast.success('Order group updated successfully.');
        refetch(); 
        setformOpen(false);
        console.log('Updated Order Group Data:', formData);
        setErrorMessage(''); 
      } else {
        const errorMessage = data?.editOrderGroup?.error || 'Error updating order group.';
        toast.error(errorMessage);
        setErrorMessage(errorMessage);
      }
    } catch (error) {
      console.error('Error updating order group:', error);
      const errorMessage = error?.graphQLErrors?.[0]?.message || error.message || 'Failed to update order group. Please try again.';
      toast.error(errorMessage);
      setErrorMessage(errorMessage);
    }
  };

  return handleUpdate;
};
