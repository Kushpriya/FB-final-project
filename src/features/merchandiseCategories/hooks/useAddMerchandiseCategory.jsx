import { useMutation } from '@apollo/client';
import { CREATE_CATEGORY } from '../graphql/CategoryMutations';
import { toast } from 'react-toastify';

export const useAddMerchandiseCategory = (refetch, setFormOpen, setErrorMessage) => {
  const [createCategory] = useMutation(CREATE_CATEGORY);

  const handleAdd = async (formData) => {
    if (!formData.name.trim() || !formData.description.trim()) {
      toast.error('Fields cannot be empty.');
      return;
    }

    try {
      const { data } = await createCategory({
        variables: { name: formData.name, description: formData.description },
      });
      if (data.createMerchandiseCategory.merchandiseCategory) {
        toast.success('Category added successfully.');
        refetch();
        setFormOpen(false);
        setErrorMessage('');
      } else {
        toast.error('Error adding category.');
      }
    } catch (error) {
      toast.error('Error adding category.');
      console.error('Error adding category:', error);
    }
  };

  return handleAdd;
};
