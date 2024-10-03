import React from 'react';
import './Dashboard.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 1000 },
  { name: 'Feb', value: 1200 },
  { name: 'Mar', value: 900 },
  { name: 'Apr', value: 1400 },
  { name: 'May', value: 1600 },
  { name: 'Jun', value: 1500 },
  { name: 'Jul', value: 1700 },
  { name: 'Aug', value: 1800 },
  { name: 'Sep', value: 1300 },
  { name: 'Oct', value: 1900 },
  { name: 'Nov', value: 2200 },
  { name: 'Dec', value: 2500 },
];

function Dashboard() {

  return (
    <>
        <div className="dashboard">

          <h2 className="dashboard-title">Dashboard</h2>
          <div className="dashboard-cards">
            <div className="card">
              <h3>Merchandise</h3>
              <p>2382</p>
            </div>
            <div className="card">
              <h3>Transport</h3>
              <p>213</p>
            </div>
            <div className="card">
              <h3>Client</h3>
              <p>14,212</p>
            </div>
            <div className="card">
              <h3>Orders</h3>
              <p>64</p>
            </div>
          </div>
          <div className="dashboard-charts">
            <h3>Recent Movement</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid stroke="#3a3a3a" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        </>
  );
}

export default Dashboard;
