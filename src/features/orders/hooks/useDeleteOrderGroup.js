import { useMutation } from '@apollo/client';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify'; 
import { DELETE_ORDER_GROUP } from '../graphql/OrderGroupMutation.jsx'; // Adjust the import path

export const useDeleteOrderGroup = (refetch) => {
  const [deleteOrderGroup] = useMutation(DELETE_ORDER_GROUP);

  const handleDelete = async (orderGroupId) => {
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure you want to delete this order group?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const { data } = await deleteOrderGroup({ variables: { orderGroupId } });
              console.log('Delete response:', data);

              const errors = data?.deleteOrderGroup?.errors;
              if (errors && errors.length > 0) {
                toast.error(errors.join(', '));
              } else {
                const message = data?.deleteOrderGroup?.message || 'Order group deleted successfully.';
                toast.success(message);
                await refetch();
              }
            } catch (error) {
              toast.error('Failed to delete the order group. Please try again.');
              console.error('Delete error:', error.message);
            }
          },
        },
        {
          label: 'No',
          onClick: () => toast.info('Delete action canceled.'),
        },
      ],
    });
  };

  return handleDelete;
};
