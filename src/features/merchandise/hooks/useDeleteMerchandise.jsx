import { useMutation } from '@apollo/client';
import { DELETE_MERCHANDISE } from '../graphql/MerchandiseMutation'; 
import { GET_MERCHANDISE_BY_CATEGORY_QUERY, GET_ALL_MERCHANDISE_QUERY } from '../graphql/MerchandiseQueries';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';  
import 'react-confirm-alert/src/react-confirm-alert.css'; 

export const useDeleteMerchandise = (refetch, categoryId) => {
  const [deleteMerchandise] = useMutation(DELETE_MERCHANDISE);

  const handleDelete = (merchandiseId) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this Merchandise?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await deleteMerchandise({
                variables: { merchandiseId },
                refetchQueries: [{ 
                  query: categoryId ? GET_MERCHANDISE_BY_CATEGORY_QUERY : GET_ALL_MERCHANDISE_QUERY, 
                  variables: categoryId ? { merchandiseCategoryId: categoryId } : {} 
                }],
              });
              refetch();
              toast.success('Merchandise deleted successfully.');
            } catch (err) {
              console.error('Error deleting merchandise:', err);
              toast.error('Error deleting merchandise. Please try again.');
            }
          },
        },
        {
          label: 'No',
          onClick: () => {
            toast.info('Merchandise deletion cancelled.');
          },
        },
      ],
      // className: 'custom-confirm-alert custom-form',
    });
  };

  return handleDelete;
};
