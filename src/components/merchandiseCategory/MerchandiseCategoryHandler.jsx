import { useMutation } from '@apollo/client';
import { CREATE_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY } from '../../graphql/mutation/MerchandiseCategoryMutation';

export const useAddMerchandiseCategory = (refetch, setFormOpen, setErrorMessage) => {
  const [createCategory] = useMutation(CREATE_CATEGORY);

  const handleAdd = async (formData) => {
    if (!formData.name.trim() || !formData.description.trim()) {
      alert('Fields cannot be empty.');
      return;
    }

    try {
      const { data } = await createCategory({ variables: { name: formData.name, description: formData.description } });
      if (data.createMerchandiseCategory.merchandiseCategory) {
        alert('Category added successfully.');
        refetch();
        setFormOpen(false);
        setErrorMessage('');
      } else {
        alert('Error adding category.');
      }
    } catch (error) {
      alert('Error adding category.');
      console.error('Error adding category:', error);
    }
  };

  return handleAdd;
};

export const useEditMerchandiseCategory = (refetch, setFormOpen, setErrorMessage) => {
    const [editCategory] = useMutation(EDIT_CATEGORY);
  
    const handleUpdate = async (selectedCategory, formData) => {
      if (!selectedCategory?.id || !formData.name.trim() || !formData.description.trim()) {
        alert('Category ID or form data is invalid.');
        return;
      }
  
      try {
        const { data } = await editCategory({
          variables: { merchandiseCategoryId: selectedCategory.id, name: formData.name, description: formData.description },
        });
  
        if (data.editMerchandiseCategory.merchandiseCategory) {
          alert('Category updated successfully.');
          refetch();
          setFormOpen(false);
          setErrorMessage('');
        } else {
          alert('Error updating category.');
        }
      } catch (error) {
        if (error.graphQLErrors) {
          error.graphQLErrors.forEach(({ message }) => {
            console.error('GraphQL error:', message);
          });
        } else {
          console.error('Error updating category:', error);
        }
        alert('Error updating category.');
      }
      
    };
  
    return handleUpdate;
  };

  export const useDeleteMerchandiseCategory = (refetch) => {
    const [deleteCategory] = useMutation(DELETE_CATEGORY);
  
    const handleDelete = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {

      try {
        const { data } = await deleteCategory({ variables: { merchandiseCategoryId: String(categoryId).trim() } });
        if (data.deleteMerchandiseCategory.message === 'Category deleted successfully') {
          await refetch();
        } else {
          console.error('Delete failed:', data.deleteMerchandiseCategory.message || 'Unknown error');
        }
      } catch (err) {
        console.error('Delete failed:', err.message);
      }
    }
    };
  
    return handleDelete;
  };