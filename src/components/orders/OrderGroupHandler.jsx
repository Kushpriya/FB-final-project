import { useMutation } from '@apollo/client';
import { CREATE_ORDER_GROUP, DELETE_ORDER_GROUP, EDIT_ORDER_GROUP } from '../../graphql/mutation/OrderGroupMutation';

export const useCreateOrderGroup = (refetch, setformOpen, setErrorMessage) => {
  const [createOrderGroup] = useMutation(CREATE_ORDER_GROUP);

  const handleCreate = async (formData) => {
    console.log("Form Data:", formData); 
  
    try {
      const { data } = await createOrderGroup({ variables: { orderGroupInfo: formData } });
      if (data.createOrderGroup.orderGroup) {
        alert('Order group created successfully.');
        refetch();
        setformOpen(false);
        setErrorMessage('');
      } else {
        alert('Error creating order group.');
      }
    } catch (error) {
      console.error('Error creating order group:', error);
      const errorMessage = error?.graphQLErrors?.[0]?.message || error.message || 'An unexpected error occurred.';
      alert(`Error creating order group: ${errorMessage}`);
      setErrorMessage(errorMessage);
    }
  };
  
  return handleCreate;
};

export const useEditOrderGroup = (refetch, setformOpen, setErrorMessage) => {
    const [editOrderGroup] = useMutation(EDIT_ORDER_GROUP);
  
    const handleUpdate = async (orderGroupId, formData) => {
      // if (!orderGroupId || !formData.startOn || !formData.status) {
      //   alert('Required fields cannot be empty.');
      //   return;
      // }
  
      try {
        const { data } = await editOrderGroup({
          variables: { orderGroupId, orderGroupInfo: formData },
        });
  
        if (data.editOrderGroup.orderGroup) {
          alert('Order group updated successfully.');
          refetch();
          setformOpen(false);
          setErrorMessage('');
        } else {
          alert('Error updating order group.');
        }
      } catch (error) {
        console.error('Error updating order group:', error);
        alert('Error updating order group.');
      }
    };
  
    return handleUpdate;
  };

  export const useDeleteOrderGroup = (refetch) => {
    const [deleteOrderGroup] = useMutation(DELETE_ORDER_GROUP);
  
    const handleDelete = async (orderGroupId) => {
      try {
        const { data } = await deleteOrderGroup({ variables: { orderGroupId } });
        if (data.deleteOrderGroup.message === 'Order group deleted successfully') {
          await refetch();
        } else {
          console.error('Delete failed:', data.deleteOrderGroup.message || 'Unknown error');
        }
      } catch (error) {
        console.error('Delete failed:', error.message);
      }
    };
  
    return handleDelete;
  };