import { useMutation } from '@apollo/client';
import { DELETE_CATEGORY } from '../graphql/CategoryMutations';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

export const useDeleteMerchandiseCategory = (refetch) => {
  const [deleteCategory] = useMutation(DELETE_CATEGORY);

  const handleDelete = (categoryId) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this category?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const { data } = await deleteCategory({
                variables: { merchandiseCategoryId: String(categoryId).trim() }
              });

              console.log('Delete response:', data);

              if (data.deleteMerchandiseCategory.message === 'Merchandise category deleted successfully') {
                await refetch();
                toast.success('Merchandise category deleted successfully');
              } else {
                console.error('Delete failed:', data.deleteMerchandiseCategory.message || 'Unknown error');
                toast.error(`Delete failed: ${data.deleteMerchandiseCategory.message || 'Unknown error'}`);
              }
            } catch (err) {
              console.error('Delete failed:', err.message);
              toast.error('Delete failed: ' + err.message);
            }
          }
        },
        {
          label: 'No',
          onClick: () => toast.info('Deletion cancelled.')
        }
      ]
    });
  };

  return handleDelete;
};
