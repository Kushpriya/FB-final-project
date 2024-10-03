import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import './style.css';
import { GET_ALL_COURIER } from '../../../couriers/graphql/CourierQueries';
import { GET_ALL_CLIENTS } from '../../../clients/graphql/ClientQueries';
import { GET_VENUES_BY_CLIENT_ID } from '../../../venues/graphql/VenueQueries';
import { GET_TRANSPORTS_BY_VEHICLE_TYPE_QUERY } from '../../../transports/graphql/TransportQueries';
import { GET_ALL_MERCHANDISE_CATEGORIES } from '../../../merchandiseCategories/graphql/CategoryQueries';
import { GET_MERCHANDISE_BY_CATEGORY_QUERY } from '../../../merchandise/graphql/MerchandiseQueries';

const OrderGroupForm = ({ selectedOrderGroup, onClose, onAdd, onUpdate, errorMessage }) => {
  const initialFormData = {
    client: selectedOrderGroup?.client || { name: '' },
    venue: selectedOrderGroup?.venue || { name: '' },
    deliveryOrderAttributes: {
      source: '',
      transportId: '',
      vehicleType: '',
      courierId: '',
      lineItemsAttributes: [],
    },
    recurring: {
      frequency: '',
      startDate: '',
      endDate: '',
    },
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isRecurring, setIsRecurring] = useState(false);

  const [lineItem, setLineItem] = useState({
    category: '',
    merchandise: '',
    price: '',
    unit: '',
    quantity: '',
  });

  const [selectedClient, setSelectedClient] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const { loading: loadingCourier, data: courierData, error: errorCourier } = useQuery(GET_ALL_COURIER);
  const { loading: loadingClients, data: clientData, error: errorClients } = useQuery(GET_ALL_CLIENTS);
  const [getVenuesByClientId, { loading: venuesLoading, data: venuesData }] = useLazyQuery(GET_VENUES_BY_CLIENT_ID);
  const [getTransportsByVehicleType, { loading: loadingTransportsByType, data: transportsDataByType }] = useLazyQuery(GET_TRANSPORTS_BY_VEHICLE_TYPE_QUERY);
  const { data: categoriesData } = useQuery(GET_ALL_MERCHANDISE_CATEGORIES);
  const [fetchMerchandise, { loading: loadingMerchandise, data: merchandiseData }] = useLazyQuery(GET_MERCHANDISE_BY_CATEGORY_QUERY);

  useEffect(() => {
    console.log("Selected Order Group:", selectedOrderGroup); 
    if (selectedOrderGroup) {
      // debugger
      setFormData({
        client:  selectedOrderGroup.clientName || { name: '' },
        venue: selectedOrderGroup.venueName || { name: '' },
        deliveryOrderAttributes: {
          deliverySource: selectedOrderGroup.deliveryOrderAttributes?.source || '',
          transportId: selectedOrderGroup.deliveryOrderAttributes?.transportId || '',
          vehicleType: selectedOrderGroup.deliveryOrderAttributes?.vehicleType || '',
          courierId: selectedOrderGroup.deliveryOrderAttributes?.courierId || '',
          lineItemsAttributes: selectedOrderGroup.deliveryOrderAttributes?.lineItemsAttributes || [],
        },
        recurring: {
          recurringFrequency: selectedOrderGroup.recurring?.frequency || '',
          recurringStartDate: selectedOrderGroup.recurring?.startDate || '',
          recurringEndDate: selectedOrderGroup.recurring?.endDate || '',
        },
      });
    } else {
      setFormData(initialFormData); 
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
        courierId: selectedCourierId,  
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
    const selectedTransportId = e.target.value;  
  
    const selectedTransport = transportsDataByType?.getAllTransportByVehicleType?.find(
      (transport) => transport.id === selectedTransportId
    );
  
    setFormData((prevState) => ({
      ...prevState,
      deliveryOrderAttributes: {
        ...prevState.deliveryOrderAttributes,
        transportId: selectedTransport?.id || '',   
        vehicleType: selectedTransport?.vehicleType || '',  
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

  const handleRecurringChange = (e) => {
    setIsRecurring(e.target.value === 'yes');
  };

  const handleFrequencyChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      recurring: {
        ...prev.recurring,
        frequency: e.target.value,
      },
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      recurring: {
        ...prev.recurring,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const data = {
      clientId: formData.client.id || '',
      venueId: formData.venue.id || '',
      recurring: isRecurring ? {
        frequency: formData.recurring.frequency,
        startDate: formData.recurring.startDate,
        endDate: formData.recurring.endDate,
      } : null, 
      deliveryOrderAttributes: {
        source: formData.deliveryOrderAttributes.source.trim(),
        vehicleType: formData.deliveryOrderAttributes.vehicleType.trim(),
        transportId: formData.deliveryOrderAttributes.transportId.trim(),
        courierId: formData.deliveryOrderAttributes.courierId.trim(),
        lineItemsAttributes: formData.deliveryOrderAttributes.lineItemsAttributes.map((item) => ({
          merchandiseCategoryId: item.category.trim(),
          merchandiseId: item.merchandise.trim(),
          quantity: parseInt(item.quantity, 10),
          unit: item.unit.trim(),
          price: parseFloat(item.price) || 0,
        })),
      },
    };

    if (selectedOrderGroup) {
      onUpdate(selectedOrderGroup.id, data);
    } else {
      onAdd(data);
    }
    
    onClose();
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
        <fieldset >
          <legend>Delivery Order</legend>
          <div className="delivery-order-fieldset">

          <label>
            Source:
            <input
              type="text"
              name="source"
              value={formData.deliveryOrderAttributes.source}
              onChange={(e) => handleInputChange('deliveryOrderAttributes', e)}
              placeholder="Enter Source"
            />
          </label>

          <label>Courier:
            <select
              id="courier"
              name="courier"
              value={formData.deliveryOrderAttributes.courierId}  
              onChange={handleCourierChange}  
            >
              <option value="">Select a Courier</option>
              {courierData?.getAllCourier?.map((courier) => (
                <option key={courier.id} value={courier.id}>
                  {courier.firstName} {courier.lastName}
                </option>
              ))}
            </select>
          </label> 
          </div>   

          <fieldset className="transport-fieldset">
            <legend>Transport</legend>
            <label>
              Vehicle Type:
              <select
                id="vehicleType"
                name="vehicleType"
                value={formData.deliveryOrderAttributes.vehicleType || ''}  
                onChange={handleVehicleTypeChange}
              >
                <option value="">All Vehicles</option>
                <option value="tank">Tank</option>
                <option value="tank_wagon">Tank Wagon</option>
                <option value="truck">Truck</option>
                <option value="semi_truck">Semi Truck</option>
              </select>
            </label>

            <label>
              Transport List:
              <select
                id="transport"
                name="transport"
                value={formData.deliveryOrderAttributes.transportId}  
                onChange={handleTransportChange}  
                disabled={!transportsDataByType || loadingTransportsByType}
              >
                <option value="">Select Transport</option>
                {transportsDataByType?.getAllTransportByVehicleType?.map((transport) => (
                  <option key={transport.id} value={transport.id}>  
                    {transport.name}  
                  </option>
                ))}
              </select>
            </label>
          </fieldset>

          <fieldset className="client-fieldset">
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
                      ...prevState,   
                      venue: { id: selectedVenue.id, name: selectedVenue.name }  
                    }));
                  }
                }}
                disabled={!venuesData}
              >
                <option value="">Select a Venue</option>
                {venuesData?.getVenuesByClientId?.map((venue) => (
                  <option key={venue.id} value={venue.id}>  
                    {venue.name}  
                  </option>
                ))}
              </select>
            </label>
          </fieldset>

          <fieldset >
            <legend>Recurring</legend>
            <label className="radio-label">
              <input
                type="radio"
                name="recurring"
                value="yes"
                checked={isRecurring}
                onChange={handleRecurringChange}
              />
              Yes
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="recurring"
                value="no"
                checked={!isRecurring}
                onChange={handleRecurringChange}
              />
              No
            </label>
            
            {isRecurring && (
              <>
              <div className="recurring-fieldset">
                <label>
                  Frequency:
                  <select
                    value={formData.recurring.frequency}
                    onChange={handleFrequencyChange}
                  >
                    <option value="">Select Frequency</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </label>

                <label>
                  Start Date:
                  <input
                    type="date"
                    name="startDate"
                    value={formData.recurring.startDate}
                    onChange={handleDateChange}
                  />
                </label>

                <label>
                  End Date:
                  <input
                    type="date"
                    name="endDate"
                    value={formData.recurring.endDate}
                    onChange={handleDateChange}
                  />
                </label>
                </div>
              </>
            )}
          </fieldset>

            <fieldset >

              <legend>Line Items</legend>
          <div className='lineitem-list'>

              <label>
                Merchandise Category:
                <select
                  id="category"
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
              </div>

              {lineItem.category && (
                <>
                <div className="line-items-fieldset">
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
                  </div>

                  <button type="button" className="add-order-btn" onClick={handleAddOrUpdateLineItem}>
                    {editingIndex !== null ? 'Update Line Item' : 'Add Line Item'}
                  </button>
                </>
              )}

            </fieldset>

          <fieldset className="line-item-table-fieldset">
            <legend>Line Items Table</legend>
            <table border="1px">
              <thead>
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
