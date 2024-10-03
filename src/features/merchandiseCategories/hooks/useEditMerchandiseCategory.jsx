import { useMutation } from '@apollo/client';
import { EDIT_CATEGORY } from '../graphql/CategoryMutations';
import { toast } from 'react-toastify';

export const useEditMerchandiseCategory = (refetch, setFormOpen, setErrorMessage) => {
  const [editCategory] = useMutation(EDIT_CATEGORY);

  const handleUpdate = async (selectedCategory, formData) => {
    if (!selectedCategory?.id || !formData?.name.trim() || !formData?.description.trim()) {
      toast.error('Category ID or form data is invalid.');
      return;
    }

    try {
      const { data } = await editCategory({
        variables: {
          merchandiseCategoryId: selectedCategory.id,
          name: formData.name,
          description: formData.description,
        },
      });

      if (data.editMerchandiseCategory) {
        toast.success('Category updated successfully.');
        refetch();
        setFormOpen(false);
        setErrorMessage('');
      } else {
        toast.error('Error updating category.');
      }
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error(`Error updating category. Details: ${error.message}`);
    }
  };

  return handleUpdate;
};
