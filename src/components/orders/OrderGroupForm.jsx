import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import '../../assets/css/OrderGroup.css';
import { GET_ALL_COURIER } from '../../graphql/queries/CourierQueries';
import { GET_ALL_CLIENTS } from '../../graphql/queries/ClientQueries';
import { GET_VENUES_BY_CLIENT_ID } from '../../graphql/queries/VenueQueries';
import { GET_TRANSPORTS_BY_VEHICLE_TYPE_QUERY } from '../../graphql/queries/TransportQueries';
import { GET_ALL_MERCHANDISE_CATEGORIES } from '../../graphql/queries/MerchandiseCategoryQueries';
import { GET_MERCHANDISE_BY_CATEGORY_QUERY } from '../../graphql/queries/MerchandiseQueries';

const OrderGroupForm = ({ selectedOrderGroup, onClose, onAdd, onUpdate, errorMessage }) => {
  const initialFormData = {
    // startOn: new Date().toISOString().slice(0, 10),
    // status: 'pending',
    client: selectedOrderGroup?.client || { name: '' },
    venue: selectedOrderGroup?.venue || { name: '' },
    deliveryOrderAttributes : {
      source: '',
      transportId: '',
      vehicleType: '',
      courierId: '',
      lineItemsAttributes: [],
    },
    recurring:{
      frequency: '',
      startDate: '',
      endDate: '',  
    }
    // recurring: false,
    // frequency: '',
    // startDate: '',
    // endDate: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [lineItem, setLineItem] = useState({
    category: '',
    merchandise: '',
    price: '',
    unit: '',
    quantity: '',
  });

  const [errors, setErrors] = useState({});
  const [selectedClient, setSelectedClient] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const { loading: loadingCourier, data: courierData, error: errorCourier } = useQuery(GET_ALL_COURIER);
  const { loading: loadingClients, data: clientData, error: errorClients } = useQuery(GET_ALL_CLIENTS);
  const [getVenuesByClientId, { loading: venuesLoading, data: venuesData }] = useLazyQuery(GET_VENUES_BY_CLIENT_ID);
  const [getTransportsByVehicleType, { loading: loadingTransportsByType, data: transportsDataByType }] = useLazyQuery(GET_TRANSPORTS_BY_VEHICLE_TYPE_QUERY);
  const { data: categoriesData } = useQuery(GET_ALL_MERCHANDISE_CATEGORIES);
  const [fetchMerchandise, { loading: loadingMerchandise, data: merchandiseData }] = useLazyQuery(GET_MERCHANDISE_BY_CATEGORY_QUERY);

  useEffect(() => {
    if (selectedOrderGroup) {
      setFormData(prev => ({
        ...prev,
        client: selectedOrderGroup.client || { name: '' },
        venue: selectedOrderGroup.venue || { name: '' },
        deliveryOrderAttributes: {
          source: selectedOrderGroup.deliveryOrderAttributes?.source || '',
          transportId: selectedOrderGroup.deliveryOrderAttributes?.transportId || '',
          vehicleType: selectedOrderGroup.deliveryOrderAttributes?.vehicleType || '',
          courierId: selectedOrderGroup.deliveryOrderAttributes?.courierId || '',
          lineItemsAttributes: selectedOrderGroup.deliveryOrderAttributes?.lineItemsAttributes || [],
        },
      }));
    }
  }, [selectedOrderGroup]);

  const handleInputChange = (field, e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [name]: value,
      },
    }));
  };

  const handleCourierChange = (e) => {
    const selectedCourierId = e.target.value;
  
    setFormData((prevState) => ({
      ...prevState,
      deliveryOrderAttributes: {
        ...prevState.deliveryOrderAttributes,
        courierId: selectedCourierId,  // Update courierId in formData
      },
    }));
  };

  const handleClientChange = (e) => {
    const clientId = e.target.value;
    setSelectedClient(clientId);
    const selectedClientData = clientData?.getAllClients?.find(client => client.id === clientId);
    setFormData(prev => ({
      ...prev,
      client: selectedClientData || { name: '' },
      venue: { name: '' },
    }));

    if (clientId) {
      getVenuesByClientId({ variables: { clientId } });
    }
  };

  const handleVehicleTypeChange = (e) => {
    const vehicleType = e.target.value;
  
    setFormData((prevState) => ({
      ...prevState,
      deliveryOrderAttributes: {
          ...prevState.deliveryOrderAttributes,
          vehicleType, 
      },
    }));
  
    if (vehicleType) {
      getTransportsByVehicleType({ variables: { vehicleType } });
    }
  };  

  const handleRecurringChange = (e) => {
    const recurring = e.target.value === 'yes';
    setFormData(prev => ({
      ...prev,
      deliveryOrderAttributes: {
        ...prev.deliveryOrderAttributes,
        recurring,
      },
    }));
  };

  const validate = () => {
    const newErrors = {};
    const { deliveryOrderAttributes, client, venue } = formData;

    if (!deliveryOrderAttributes.source.trim()) newErrors.deliveryOrderAttributesSource = 'Source is required.';
    if (!client.name) newErrors.client = 'Client is required.';
    if (!venue.name) newErrors.venue = 'Venue is required.';
    if (deliveryOrderAttributes.lineItemsAttributes.length === 0) newErrors.lineItemsAttributes = 'At least one line item is required.';

    if (deliveryOrderAttributes.recurring) {
      if (!deliveryOrderAttributes.frequency) newErrors.frequency = 'Frequency is required.';
      if (!deliveryOrderAttributes.startDate) newErrors.startDate = 'Start date is required.';
      if (!deliveryOrderAttributes.endDate) newErrors.endDate = 'End date is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddOrUpdateLineItem = () => {
    const updatedlineItemsAttributes = editingIndex !== null
      ? formData.deliveryOrderAttributes.lineItemsAttributes.map((item, index) => (index === editingIndex ? lineItem : item))
      : [...formData.deliveryOrderAttributes.lineItemsAttributes, lineItem];

    setFormData(prev => ({
      ...prev,
      deliveryOrderAttributes: { ...prev.deliveryOrderAttributes, lineItemsAttributes: updatedlineItemsAttributes },
    }));

    setLineItem({
      category: '',
      merchandise: '',
      price: '',
      unit: '',
      quantity: '',
    });
    setEditingIndex(null);
  };

  const handleTransportChange = (e) => {
    const selectedTransportId = e.target.value;  // Get selected transport ID
  
    const selectedTransport = transportsDataByType?.getAllTransportByVehicleType?.find(
      (transport) => transport.id === selectedTransportId
    );
  
    setFormData((prevState) => ({
      ...prevState,
      deliveryOrderAttributes: {
        ...prevState.deliveryOrderAttributes,
        transportId: selectedTransport?.id || '',   // Store selected transport ID
        vehicleType: selectedTransport?.vehicleType || '',  // Optionally update vehicleType
      },
    }));
  };

  const handleEditLineItem = (index) => {
    const selectedItem = formData.deliveryOrderAttributes.lineItemsAttributes[index];
    setLineItem(selectedItem);
    setEditingIndex(index);
  };

  const handleDeleteLineItem = (index) => {
    const updatedlineItemsAttributes = formData.deliveryOrderAttributes.lineItemsAttributes.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      deliveryOrderAttributes: { ...prev.deliveryOrderAttributes, lineItemsAttributes: updatedlineItemsAttributes },
    }));
  };

  const handleLineItemChange = (e) => {
    const { name, value } = e.target;
    setLineItem(prev => ({ ...prev, [name]: value }));

    if (name === 'category' && value) {
      fetchMerchandise({ variables: { merchandiseCategoryId: value } });
    }

    if (name === 'merchandise' && value) {
      const selectedMerchandise = merchandiseData?.getMerchandiseByCategory?.find(item => item.id === value);
      if (selectedMerchandise) {
        setLineItem(prev => ({
          ...prev,
          price: selectedMerchandise.price,
          unit: selectedMerchandise.unit,
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const data = {
        clientId: formData.client.id || '',
        venueId: formData.venue.id || '',
        deliveryOrderAttributes: {
          source: formData.deliveryOrderAttributes.source.trim(),
          vehicleType: formData.deliveryOrderAttributes.vehicleType.trim(),
          transportId: formData.deliveryOrderAttributes.transportId.trim(),
          courierId: formData.deliveryOrderAttributes.courierId.trim(),
          lineItemsAttributes: formData.deliveryOrderAttributes.lineItemsAttributes.map((item) => ({
            merchandiseCategoryId: item.category.trim(),
            merchandiseId: item.merchandise.trim(),
            quantity: parseInt(item.quantity, 10),
            unit: item.unit.trim() , 
            price: parseFloat(item.price) || 0
          })),
        },
       
      };

      if (selectedOrderGroup) {
        onUpdate(selectedOrderGroup.id, data);
      } else {
        onAdd(data);
      }

      onClose(); 
    }
  };

  if (loadingCourier || loadingClients || venuesLoading) return <p>Loading...</p>;
  if (errorCourier) return <p>Error loading couriers: {errorCourier.message}</p>;
  if (errorClients) return <p>Error loading clients: {errorClients.message}</p>;

  return (
    <div className="order-group-form-overlay">
      <div className="order-group-form-container">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{selectedOrderGroup ? 'Edit Order Group' : 'Add Order Group'}</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Delivery Order</legend>
            <label>
              Source:
              <input
                type="text"
                name="source"
                value={formData.deliveryOrderAttributes.source}
                onChange={(e) => handleInputChange('deliveryOrderAttributes', e)}
                placeholder="Enter Source"
              />
              {errors.deliveryOrderAttributesSource && <p className="error-message">{errors.deliveryOrderAttributesSource}</p>}
            </label>

            <label>Courier:
              <select
                id="courier"
                name="courier"
                value={formData.deliveryOrderAttributes.courierId}  // Bind courierId from formData
                onChange={handleCourierChange}  // Handle selection
              >
                <option value="">Select a Courier</option>
                {courierData?.getAllCourier?.map((courier) => (
                  <option key={courier.id} value={courier.id}>
                    {courier.firstName} {courier.lastName}
                  </option>
                ))}
              </select>
            </label>    

            <fieldset>
              <legend>Transport</legend>
              <label>
                Vehicle Type:
                <select
                  id="vehicleType"
                  name="vehicleType"
                  value={formData.deliveryOrderAttributes.vehicleType || ''}  // Ensure it falls back to an empty string if undefined
                  onChange={handleVehicleTypeChange}
                >
                  <option value="">All Vehicles</option>
                  <option value="tank">Tank</option>
                  <option value="tank_wagon">Tank Wagon</option>
                  <option value="truck">Truck</option>
                  <option value="semi_truck">Semi Truck</option>
                </select>
                {errors.vehicleType && <p className="error-message">{errors.vehicleType}</p>}
              </label>

              <label>
                Transport List:
                <select
                  id="transport"
                  name="transport"
                  value={formData.deliveryOrderAttributes.transportId}  // This is linked to transportId
                  onChange={handleTransportChange}  // Event handler
                  disabled={!transportsDataByType || loadingTransportsByType}
                >
                  <option value="">Select Transport</option>
                  {transportsDataByType?.getAllTransportByVehicleType?.map((transport) => (
                    <option key={transport.id} value={transport.id}>  {/* Use transport.id as the value */}
                      {transport.name}  {/* Display transport.name */}
                    </option>
                  ))}
                </select>
                {errors.transportName && <p className="error-message">{errors.transportName}</p>}
              </label>
            </fieldset>

          <fieldset>
            <legend>Client</legend>
            <label>
              Client Name:
              <select
                id="client"
                name="client"
                value={selectedClient}
                onChange={handleClientChange}
              >
                <option value="">Select Client</option>
                {clientData?.getAllClients?.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </label>
          <label>
            Venue:
            <select
              id="venue"
              name="venue"
              value={formData.venue.id}  
              onChange={(e) => {
                const selectedVenue = venuesData?.getVenuesByClientId?.find((venue) => 
                  venue.id === e.target.value  
                );

                if (selectedVenue) {
                  setFormData(prevState => ({
                    ...prevState,   // Proper state update with spread operator
                    venue: { id: selectedVenue.id, name: selectedVenue.name }  // Update state with venue ID and name
                  }));
                }
              }}
              disabled={!venuesData}
            >
              <option value="">Select a Venue</option>
              {venuesData?.getVenuesByClientId?.map((venue) => (
                <option key={venue.id} value={venue.id}>  {/* Use venue.id as the value */}
                  {venue.name}  {/* Display venue.name in the dropdown */}
                </option>
              ))}
            </select>
            {errors.venue && <p className="error-message">{errors.venue}</p>}
          </label>
          </fieldset>
          <fieldset>
            <legend>Recurring</legend>
            <label>
              <input
                type="radio"
                name="recurring"
                value="yes"
                checked={formData.deliveryOrderAttributes.recurring === true}
                onChange={handleRecurringChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="recurring"
                value="no"
                checked={formData.deliveryOrderAttributes.recurring === false}
                onChange={handleRecurringChange}
              />
              No
            </label>

          {formData.deliveryOrderAttributes.recurring && (
            <>
              <label>
                Frequency:
                <select
                  id="frequency"
                  name="frequency"
                  value={formData.deliveryOrderAttributes.frequency}
                  onChange={(e) => setFormData(prevState => ({
                    ...prevState,
                    deliveryOrderAttributes: {
                      ...prevState.deliveryOrderAttributes,
                      frequency: e.target.value
                    }
                  }))}
                >
                  <option value="">Select Frequency</option>
                  <option value="daily">daily</option>
                  <option value="weekly">weekly</option>
                  <option value="monthly">monthly</option>
                </select>
                {errors.frequency && <p className="error-message">{errors.frequency}</p>}
              </label>

              <label>
                Start Date:
                <input
                  type="date"
                  name="startDate"
                  value={formData.deliveryOrderAttributes.startDate}
                  onChange={(e) => setFormData(prevState => ({
                    ...prevState,
                    deliveryOrderAttributes: {
                      ...prevState.deliveryOrderAttributes,
                      startDate: e.target.value
                    }
                  }))}
                />
                {errors.startDate && <p className="error-message">{errors.startDate}</p>}
              </label>

              <label>
                End Date:
                <input
                  type="date"
                  name="endDate"
                  value={formData.deliveryOrderAttributes.endDate}
                  onChange={(e) => setFormData(prevState => ({
                    ...prevState,
                    deliveryOrderAttributes: {
                      ...prevState.deliveryOrderAttributes,
                      endDate: e.target.value
                    }
                  }))}
                />
                {errors.endDate && <p className="error-message">{errors.endDate}</p>}
              </label>
            </>
          )}
          </fieldset>

<div className='lineitem-list'>
          <fieldset >
            <legend>Line Items</legend>
            <label>
        Merchandise Category:
        <select
          id = "category"
          name="category"
          value={lineItem.category.id}
          onChange={handleLineItemChange}
        >
          <option value="">Select Category</option>
          {categoriesData?.getAllMerchandiseCategories?.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && <p className="error-message">{errors.category}</p>}
      </label>

          <label>
            Merchandise:
            <select
              name="merchandise"
              value={lineItem.merchandise}
              onChange={handleLineItemChange}
              disabled={loadingMerchandise || !merchandiseData}
            >
              <option value="">Select Merchandise</option>
              {merchandiseData?.getMerchandiseByCategory
              ?.filter(item => item.status === 'available')
              ?.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name} 
                </option>
              ))}
            </select>
          </label>

          {lineItem.category && (
            <>
                <label>
                  Price:
                  <input
                    type="number"
                    name="price"
                    value={lineItem.price}
                    readOnly 
                  />
                </label>

                <label>
                  Unit:
                  <input
                    type="text"
                    name="unit"
                    value={lineItem.unit}
                    readOnly 
                  />
                </label>

                <label>
                  Quantity:
                  <input
                    type="number"
                    name="quantity"
                    value={lineItem.quantity}
                    onChange={handleLineItemChange}
                  />
                </label>

                <button type="button" className="add-order-btn"onClick={handleAddOrUpdateLineItem}>
              {editingIndex !== null ? 'Update Line Item' : 'Add Line Item'}
            </button>
              </>
            )}
          </fieldset>
          </div>

           <fieldset>
           <table border="1px">
            <thead >
              <tr>
                <th>Category</th>
                <th>Merchandise</th>
                <th>Price</th>
                <th>Unit</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {formData.deliveryOrderAttributes.lineItemsAttributes.map((item, index) => (
                <tr key={index}>
                  <td>{item.category}</td>
                  <td>{item.merchandise}</td>
                  <td>{item.price}</td>
                  <td>{item.unit}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <div className='line-btn'>
                    <button type="button" className='edit-order-btn' onClick={() => handleEditLineItem(index)}>Edit</button>
                    <button type="button" className='delete-order-btn' onClick={() => handleDeleteLineItem(index)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </fieldset> 
          </fieldset>
          <button type="submit">{selectedOrderGroup ? 'Update' : 'Add'} Order Group</button>
        </form>
      </div>
    </div>
  );
};

export default OrderGroupForm;
