// export const handleinput = (field, e) => {
//     const { name, value } = e.target;
  
//     setFormData(prevState => ({
//       ...prevState,
//       [field]: {
//         ...prevState[field],
//         [name]: value,
//       },
//     }));
//   };


// export const handleClientChange = (e) => {
//     const clientId = e.target.value;
//     setSelectedClient(clientId);
//     const selectedClientData = clientData?.getAllClients?.find(client => client.id === clientId);
//     setFormData(prevState => ({
//       ...prevState,
//       client: selectedClientData || { name: '' },
//       venue: { name: '' }
//     }));

//     if (clientId) {
//       getVenuesByClientId({ variables: { clientId } });
//     }
//   };

// export const handleVehicleTypeChange = (e) => {
//     const vehicleType = e.target.value;
  
//     setFormData(prevState => ({
//       ...prevState,
//       deliveryOrder: {
//         ...prevState.deliveryOrder,
//         transport: {
//           ...prevState.deliveryOrder.transport,
//           vehicleType
//         }
//       }
//     }));
  
//     if (vehicleType) {
//       getTransportsByVehicleType({ variables: { vehicleType } });
//     }
//   };

// export const handleRecurringChange = (e) => {
//     const isRecurring = e.target.value === 'yes';

//     setFormData(prevState => ({
//       ...prevState,
//       deliveryOrder: {
//         ...prevState.deliveryOrder,
//         isRecurring: isRecurring
//       }
//     }));
//   };

// export const validate = () => {
//     const newErrors = {};
//     const { deliveryOrder, client, venue } = formData;
  
//     if (!deliveryOrder.source.trim()) {
//       newErrors.deliveryOrderSource = "Source is required.";
//     }
//     if (!client.name) {
//       newErrors.client = "Client is required.";
//     }
//     if (!venue.name) {
//       newErrors.venue = "Venue is required.";
//     }
//     if (deliveryOrder.lineItems.length === 0) {
//       newErrors.lineItems = "At least one line item is required.";
//     }
//     if (deliveryOrder.isRecurring) {
//       if (!deliveryOrder.frequency) {
//         newErrors.frequency = "Frequency is required.";
//       }
//       if (!deliveryOrder.startDate) {
//         newErrors.startDate = "Start date is required.";
//       }
//       if (!deliveryOrder.endDate) {
//         newErrors.endDate = "End date is required.";
//       }
//     }

//     // deliveryOrder.lineItems.forEach((item, index) => {
//     //   if (item.quantity <= 0) {
//     //     newErrors[`lineItemQuantity_${index}`] = "Quantity must be greater than zero.";
//     //   }
//     // });
  
  
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

// export const handleAddOrUpdateLineItem = () => {
//     if (editingIndex !== null) {
//       const updatedLineItems = [...formData.deliveryOrder.lineItems];
//       updatedLineItems[editingIndex] = lineItem;
//       setFormData(prevState => ({
//         ...prevState,
//         deliveryOrder: {
//           ...prevState.deliveryOrder,
//           lineItems: updatedLineItems
//         }
//       }));
//       setEditingIndex(null);
//     } else {
//       setFormData(prevState => ({
//         ...prevState,
//         deliveryOrder: {
//           ...prevState.deliveryOrder,
//           lineItems: [...prevState.deliveryOrder.lineItems, lineItem]
//         }
//       }));
//     }
//     setLineItem({
//       category: '',
//       merchandise: '',
//       price: '',
//       unit: '',
//       quantity: ''
//     }); 
//   };

// export const handleEditLineItem = (index) => {
//     const selectedItem = formData.deliveryOrder.lineItems[index];
//     setLineItem(selectedItem);
//     setEditingIndex(index);
//   };

// export const handleDeleteLineItem = (index) => {
//     const updatedLineItems = formData.deliveryOrder.lineItems.filter((_, i) => i !== index);
//     setFormData(prevState => ({
//       ...prevState,
//       deliveryOrder: {
//         ...prevState.deliveryOrder,
//         lineItems: updatedLineItems
//       }
//     }));
//   };

// export const handleLineItemChange = (e) => {
//     const { name, value } = e.target;
//     setLineItem(prevState => ({
//       ...prevState,
//       [name]: value
//     }));

//     if (name === 'category' && value) {
//       console.log('Selected Category ID:', value); 
//       fetchMerchandise({ variables: { merchandiseCategoryId: value } });
//     }

//     if (name === 'merchandise' && value) {
//       const selectedMerchandise = merchandiseData?.getMerchandiseByCategory?.find(item => item.id === value);
//       if (selectedMerchandise) {
//         setLineItem(prevState => ({
//           ...prevState,
//           price: selectedMerchandise.price,
//           unit: selectedMerchandise.unit
//         }));
//       }
//     }
//   };

// export const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       const data = {
//         clientId: formData.clientId,
//         venueId: formData.venueId,
//         deliveryOrderAttributes: {
//           source: formData.deliveryOrder.source.trim(),
//           transportId: formData.deliveryOrder.transport.id, // Make sure you have this ID
//           lineItems: formData.deliveryOrder.lineItems.map(item => ({
//             category: item.category.trim(),
//             merchandise: item.merchandise.trim(),
//             price: parseFloat(item.price),
//             unit: item.unit.trim(),
//             quantity: parseInt(item.quantity, 10),
//           })),
//         },
//       };
  
//       console.log('Data form:', data);
  
//       if (selectedOrderGroup) {
//         onUpdate(selectedOrderGroup.id, data);
//       } else {
//         onAdd(data);
//       }
//       onClose();
//     }
//   };