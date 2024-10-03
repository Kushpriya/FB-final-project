import { useMutation } from '@apollo/client';
import { EDIT_MERCHANDISE } from '../graphql/MerchandiseMutation'; 
import { GET_MERCHANDISE_BY_CATEGORY_QUERY, GET_ALL_MERCHANDISE_QUERY } from '../graphql/MerchandiseQueries';
import { toast } from 'react-toastify';

export const useEditMerchandise = (refetch, setIsModalOpen, setErrorMessage, categoryId) => {
  const [editMerchandise] = useMutation(EDIT_MERCHANDISE);

  const handleUpdate = async (id, merchandiseInfo) => {
    try {
      await editMerchandise({
        variables: {
          merchandiseId: id,
          merchandiseInfo: {
            name: merchandiseInfo.name,
            price: parseFloat(merchandiseInfo.price),
            status: merchandiseInfo.status,
            unit: merchandiseInfo.unit,
            description: merchandiseInfo.description,
          },
        },
        refetchQueries: [{
          query: categoryId ? GET_MERCHANDISE_BY_CATEGORY_QUERY : GET_ALL_MERCHANDISE_QUERY,
          variables: categoryId ? { merchandiseCategoryId: categoryId } : {},
        }],
      });
      refetch();
      setIsModalOpen(false);
      toast.success('Merchandise updated successfully.');
    } catch (err) {
      console.error('Error updating merchandise:', err.message);
      setErrorMessage('Error updating merchandise. Please try again.');
      toast.error('Error updating merchandise. Please try again.');
    }
  };

  return handleUpdate;
};
