import { useMutation } from '@apollo/client';
import { CREATE_MERCHANDISE, EDIT_MERCHANDISE, DELETE_MERCHANDISE } from '../../graphql/mutation/MerchandiseMutation'; 
import { GET_MERCHANDISE_BY_CATEGORY_QUERY, GET_ALL_MERCHANDISE_QUERY } from '../../graphql/queries/MerchandiseQueries';

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
      alert('Merchandise created successfully.');
    } catch (err) {
      console.error('Error creating merchandise:', err);
      setErrorMessage('Error creating merchandise. Please try again.');
    }
  };

  return handleAdd;
};

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
      alert('Merchandise updated successfully.');
    } catch (err) {
      console.error('Error updating merchandise:', err.message);
      setErrorMessage('Error updating merchandise. Please try again.');
    }
  };

  return handleUpdate;
};

export const useDeleteMerchandise = (refetch, categoryId) => {
  const [deleteMerchandise] = useMutation(DELETE_MERCHANDISE);

  const handleDelete = async (merchandiseId) => {
    if (!window.confirm('Are you sure you want to delete this Merchandise?')) return;

    try {
      await deleteMerchandise({
        variables: { merchandiseId },
        refetchQueries: [{ 
          query: categoryId ? GET_MERCHANDISE_BY_CATEGORY_QUERY : GET_ALL_MERCHANDISE_QUERY, 
          variables: categoryId ? { merchandiseCategoryId: categoryId } : {} 
        }],
      });
      refetch();
      alert('Merchandise deleted successfully.');
    } catch (err) {
      console.error('Error deleting merchandise:', err);
      alert('Error deleting merchandise. Please try again.');
    }
  };

  return handleDelete;
};
