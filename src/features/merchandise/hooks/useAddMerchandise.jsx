import { useMutation } from '@apollo/client';
import { CREATE_MERCHANDISE } from '../graphql/MerchandiseMutation'; 
import { GET_MERCHANDISE_BY_CATEGORY_QUERY, GET_ALL_MERCHANDISE_QUERY } from '../graphql/MerchandiseQueries';
import { toast } from 'react-toastify';

export const useAddMerchandise = (refetch, setIsModalOpen, setErrorMessage, categoryId) => {
  const [createMerchandise] = useMutation(CREATE_MERCHANDISE);

  const handleAdd = async (merchandise) => {
    try {
      await createMerchandise({
        variables: {
          merchandiseCategoryId: merchandise.merchandiseCategoryId,
          merchandiseInfo: {
            name: merchandise.name,
            price: parseFloat(merchandise.price),
            status: merchandise.status,
            unit: merchandise.unit,
            description: merchandise.description,
          },
        },
        refetchQueries: [{ 
          query: categoryId ? GET_MERCHANDISE_BY_CATEGORY_QUERY : GET_ALL_MERCHANDISE_QUERY, 
          variables: categoryId ? { merchandiseCategoryId: categoryId } : {} 
        }],
      });
      refetch();
      setIsModalOpen(false);
      toast.success('Merchandise created successfully.');
    } catch (err) {
      console.error('Error creating merchandise:', err);
      setErrorMessage('Error creating merchandise. Please try again.');
      toast.error('Error creating merchandise. Please try again.');
    }
  };

  return handleAdd;
};
