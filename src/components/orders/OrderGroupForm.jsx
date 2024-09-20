import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import '../../assets/css/OrderGroup.css';
import { GET_ALL_COURIER } from '../../graphql/queries/CourierQueries';
import { GET_ALL_CLIENTS } from '../../graphql/queries/ClientQueries';

const OrderGroupForm = ({ selectedOrderGroup, onClose, onAdd, onUpdate, errorMessage }) => {
  const [formData, setFormData] = useState({
    client: selectedOrderGroup?.client || { name: '' },
    venue: selectedOrderGroup?.venue || { name: '' },
    deliveryOrder: {
      source: '',
      transport: {
        name: '',
        vehicleType: ''
      }
    }
  });
  const [errors, setErrors] = useState({});
  const [selectedCourier, setSelectedCourier] = useState('');
  const [selectedClient, setSelectedClient] = useState('');

  const { loading: loadingCourier, error: errorCourier, data: courierData } = useQuery(GET_ALL_COURIER);
  const { loading: loadingClients, error: errorClients, data: clientData } = useQuery(GET_ALL_CLIENTS);

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
          }
        }
      });
    }
  }, [selectedOrderGroup]);

  const validate = () => {
    const newErrors = {};
    if (!formData.client.name.trim()) newErrors.clientName = 'Client name is required';
    if (!formData.venue.name.trim()) newErrors.venueName = 'Venue name is required';
    if (!formData.deliveryOrder.source.trim()) newErrors.deliveryOrderSource = 'Delivery order source is required';
    if (!formData.deliveryOrder.transport.name.trim()) newErrors.transportName = 'Transport name is required';
    if (!formData.deliveryOrder.transport.vehicleType.trim()) newErrors.vehicleType = 'Vehicle type is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const data = {
        startOn: formData.startOn?.trim(),
        status: formData.status?.trim(),
        completedOn: formData.completedOn?.trim(),
        deliveryOrder: {
          orderGroupId: formData.deliveryOrder.orderGroupId?.trim(),
          source: formData.deliveryOrder.source?.trim(),
          lineItems: formData.deliveryOrder.lineItems,
          courier: {
            firstName: formData.deliveryOrder.courier?.firstName?.trim(),
            lastName: formData.deliveryOrder.courier?.lastName?.trim(),
          },
          transport: {
            name: formData.deliveryOrder.transport?.name?.trim(),
            vehicleType: formData.deliveryOrder.transport?.vehicleType?.trim(),
          }
        },
        client: {
          name: formData.client.name?.trim(),
        },
        venue: {
          name: formData.venue.name?.trim(),
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

  const handleNestedChange = (section, e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [name]: value,
      }
    }));
  };

  if (loadingCourier || loadingClients) return <p>Loading...</p>;
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
                onChange={(e) => handleNestedChange('deliveryOrder', e)}
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
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.deliveryOrder.transport.name}
                  onChange={(e) => handleNestedChange('deliveryOrder.transport', e)}
                  placeholder="Enter Transport Name"
                />
                {errors.transportName && <p className="error-message">{errors.transportName}</p>}
              </label>

              <label>
                Vehicle Type:
                <input
                  type="text"
                  name="vehicleType"
                  value={formData.deliveryOrder.transport.vehicleType}
                  onChange={(e) => handleNestedChange('deliveryOrder.transport', e)}
                  placeholder="Enter Vehicle Type"
                />
                {errors.vehicleType && <p className="error-message">{errors.vehicleType}</p>}
              </label>
            </fieldset>
          </fieldset>

          <label>
            Client Name:
            <select
              id="client"
              name="client"
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
            >
              <option value="">Select a Client</option>
              {clientData?.getAllClients?.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
            {errors.clientName && <p className="error-message">{errors.clientName}</p>}
          </label>

          <label>
            Venue Name:
            <input
              type="text"
              name="name"
              value={formData.venue.name}
              onChange={(e) => handleNestedChange('venue', e)}
              placeholder="Enter Venue Name"
              required
            />
            {errors.venueName && <p className="error-message">{errors.venueName}</p>}
          </label>

          <button type="submit" className="submit-button">
            {selectedOrderGroup ? 'Update Order Group' : 'Add Order Group'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderGroupForm;
