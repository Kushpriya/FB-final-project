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
  const [formData, setFormData] = useState({
    client: selectedOrderGroup?.client || { name: '' },
    venue: selectedOrderGroup?.venue || { name: '' },
    deliveryOrder: {
      source: '',
      transport: {
        name: '',
        vehicleType: ''
      },
      lineItems: []
    },
    isRecurring: false,
    frequency: '',
    startDate: '',
    endDate: ''
  });

  const [lineItem, setLineItem] = useState({
    category: '',
    merchandise: '',
    price: '',
    unit: '',
    quantity: ''
  });

  const [errors, setErrors] = useState({});
  const [selectedCourier, setSelectedCourier] = useState('');
  const [selectedClient, setSelectedClient] = useState('');

  const { loading: loadingCourier, error: errorCourier, data: courierData } = useQuery(GET_ALL_COURIER);
  const { loading: loadingClients, error: errorClients, data: clientData } = useQuery(GET_ALL_CLIENTS);
  const [getVenuesByClientId, { loading: venuesLoading, data: venuesData }] = useLazyQuery(GET_VENUES_BY_CLIENT_ID);
  const [getTransportsByVehicleType, { loading: loadingTransportsByType, data: transportsDataByType }] = useLazyQuery(GET_TRANSPORTS_BY_VEHICLE_TYPE_QUERY);
  const { data: categoriesData } = useQuery(GET_ALL_MERCHANDISE_CATEGORIES);
  const [fetchMerchandise, { loading: loadingMerchandise, data: merchandiseData }] = useLazyQuery(GET_MERCHANDISE_BY_CATEGORY_QUERY);

  useEffect(() => {
    if (selectedOrderGroup) {
      setFormData({
        client: selectedOrderGroup.client || { name: '' },
        venue: selectedOrderGroup.venue || { name: '' },
        deliveryOrder: selectedOrderGroup.deliveryOrder || {
          source: '',
          transport: {
            name: '',
            vehicleType: ''
          },
          lineItems: []
        }
      });
    }
  }, [selectedOrderGroup]);

  const handleClientChange = (e) => {
    const clientId = e.target.value;
    setSelectedClient(clientId);
    const selectedClientData = clientData?.getAllClients?.find(client => client.id === clientId);
    setFormData(prevState => ({
      ...prevState,
      client: selectedClientData || { name: '' },
      venue: { name: '' }
    }));

    if (clientId) {
      getVenuesByClientId({ variables: { clientId } });
    }
  };

  const handleVehicleTypeChange = (e) => {
    const vehicleType = e.target.value;

    setFormData(prevState => ({
      ...prevState,
      deliveryOrder: {
        ...prevState.deliveryOrder,
        transport: {
          ...prevState.deliveryOrder.transport,
          vehicleType
        }
      }
    }));

    if (vehicleType) {
      getTransportsByVehicleType({ variables: { vehicleType } });
    }
  };

  const handleRecurringChange = (e) => {
    const isRecurring = e.target.value === 'yes';

    setFormData(prevState => ({
      ...prevState,
      deliveryOrder: {
        ...prevState.deliveryOrder,
        isRecurring: isRecurring
      }
    }));
  };

  const handleAddLineItem = () => {
    if (lineItem.category && lineItem.merchandise && lineItem.quantity) {
      setFormData(prevState => ({
        ...prevState,
        deliveryOrder: {
          ...prevState.deliveryOrder,
          lineItems: [...prevState.deliveryOrder.lineItems, lineItem]
        }
      }));
      setLineItem({
        category: '',
        merchandise: '',
        price: '',
        unit: '',
        quantity: ''
      });
    } else {
      setErrors({ lineItem: 'All line item fields must be filled out.' });
    }
  };

  const handleLineItemChange = (e) => {
    const { name, value } = e.target;
    setLineItem(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'category' && value) {
      fetchMerchandise({ variables: { merchandiseCategoryId: value } });
    }

    if (name === 'merchandise' && value) {
      const selectedMerchandise = merchandiseData?.getMerchandiseByCategory?.find(item => item.id === value);
      if (selectedMerchandise) {
        setLineItem(prevState => ({
          ...prevState,
          price: selectedMerchandise.price,
          unit: selectedMerchandise.unit
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const data = {
        deliveryOrder: {
          source: formData.deliveryOrder.source.trim(),
          transport: {
            name: formData.deliveryOrder.transport.name.trim(),
            vehicleType: formData.deliveryOrder.transport.vehicleType.trim(),
          },
          lineItems: formData.deliveryOrder.lineItems
        },
        client: {
          name: formData.client.name.trim(),
        },
        venue: {
          name: formData.venue.name.trim(),
        }
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
                value={formData.deliveryOrder.source}
                onChange={(e) => setFormData(prevState => ({
                  ...prevState,
                  deliveryOrder: { ...prevState.deliveryOrder, source: e.target.value }
                }))}
                placeholder="Enter Source"
              />
              {errors.deliveryOrderSource && <p className="error-message">{errors.deliveryOrderSource}</p>}
            </label>

            <label>Courier:</label>
            <select
              id="courier"
              name="courier"
              value={selectedCourier}
              onChange={(e) => setSelectedCourier(e.target.value)}
            >
              <option value="">Select a Courier</option>
              {courierData?.getAllCourier?.map((courier) => (
                <option key={courier.id} value={courier.id}>
                  {courier.firstName} {courier.lastName}
                </option>
              ))}
            </select>

            <fieldset>
              <legend>Transport</legend>
              <label>
                Vehicle Type:
                <select
                  id="vehicleType"
                  name="vehicleType"
                  value={formData.deliveryOrder.transport.vehicleType}
                  onChange={handleVehicleTypeChange}
                >
                  <option value="">All Vehicles</option>
                  <option value="Tank">Tank</option>
                  <option value="TankWagon">Tank Wagon</option>
                  <option value="Truck">Truck</option>
                  <option value="SemiTruck">Semi Truck</option>
                </select>
                {errors.vehicleType && <p className="error-message">{errors.vehicleType}</p>}
              </label>

              <label>
                Transport List:
                <select
                  id="transport"
                  name="transport"
                  value={formData.deliveryOrder.transport.name}
                  onChange={(e) => setFormData(prevState => ({
                    ...prevState,
                    deliveryOrder: {
                      ...prevState.deliveryOrder,
                      transport: { ...prevState.deliveryOrder.transport, name: e.target.value }
                    }
                  }))}
                  disabled={!transportsDataByType || loadingTransportsByType}
                >
                  <option value="">Select Transport</option>
                  {transportsDataByType?.getAllTransportByVehicleType?.map((transport) => (
                    <option key={transport.id} value={transport.name}>
                      {transport.name}
                    </option>
                  ))}
                </select>
                {errors.transportName && <p className="error-message">{errors.transportName}</p>}
              </label>
              {loadingTransportsByType && <p>Loading transport options...</p>}
            </fieldset>
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
                value={formData.venue.name}
                onChange={(e) => setFormData(prevState => ({
                  ...prevState,
                  venue: { ...prevState.venue, name: e.target.value }
                }))}
                disabled={!venuesData}
              >
                <option value="">Select a Venue</option>
                {venuesData?.getVenuesByClientId?.map((venue) => (
                  <option key={venue.id} value={venue.name}>
                    {venue.name}
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
                name="isRecurring"
                value="yes"
                checked={formData.deliveryOrder.isRecurring === true}
                onChange={handleRecurringChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="isRecurring"
                value="no"
                checked={formData.deliveryOrder.isRecurring === false}
                onChange={handleRecurringChange}
              />
              No
            </label>

          {formData.deliveryOrder.isRecurring && (
            <>
              <label>
                Frequency:
                <select
                  id="frequency"
                  name="frequency"
                  value={formData.deliveryOrder.frequency}
                  onChange={(e) => setFormData(prevState => ({
                    ...prevState,
                    deliveryOrder: {
                      ...prevState.deliveryOrder,
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
                  value={formData.deliveryOrder.startDate}
                  onChange={(e) => setFormData(prevState => ({
                    ...prevState,
                    deliveryOrder: {
                      ...prevState.deliveryOrder,
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
                  value={formData.deliveryOrder.endDate}
                  onChange={(e) => setFormData(prevState => ({
                    ...prevState,
                    deliveryOrder: {
                      ...prevState.deliveryOrder,
                      endDate: e.target.value
                    }
                  }))}
                />
                {errors.endDate && <p className="error-message">{errors.endDate}</p>}
              </label>
            </>
          )}
          </fieldset>

          <fieldset>
            <legend>Line Items</legend>
               <div className="line-item-form">
            <label>
        Merchandise Category:
        <select
          name="category"
          value={lineItem.category}
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
</div>
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

                <button type="button" onClick={handleAddLineItem}>Add Line Item</button>
              </>
              
            )}
          </fieldset>

           <fieldset>
            <legend>Added Line Items</legend>
            <ul>
              {formData.deliveryOrder.lineItems.map((item, index) => (
                <li key={index}>
                  {item.merchandise} - {item.price} - {item.unit} - {item.quantity}
                </li>
              ))}
            </ul>
          </fieldset> 


          <button type="submit">{selectedOrderGroup ? 'Update' : 'Add'} Order Group</button>
        </form>
      </div>
    </div>
  );
};

export default OrderGroupForm;
