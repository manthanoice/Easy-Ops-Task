import React, { useState, useEffect } from 'react';
import "./styles.css";

function Form() {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('form-data'));
    if (storedData) setData(storedData);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !contactNumber) {
        alert("Name and contact number are required");
        return;
    }
  
    const isDuplicate = data.some(
      (item) => item.name.toLowerCase() === name.toLowerCase() || item.contactNumber === contactNumber
    );
    if (isDuplicate) {
      alert('Name or contact number already exists!');
      return;
    }
  
    const newData = { name, contactNumber };
    setData((prevData) => {
      const newDataArray = [...prevData, newData];
      newDataArray.sort((a, b) => (a.name > b.name ? 1 : -1));
      localStorage.setItem('form-data', JSON.stringify(newDataArray));
      return newDataArray;
    });
    setName('');
    setContactNumber('');
  };
  

  const handleDelete = (index) => {
    const confirmation = window.confirm('Are you sure you want to delete?');
    if (confirmation) {
      setData((prevData) => {
        const newDataArray = prevData.filter((_, i) => i !== index);
        localStorage.setItem('form-data', JSON.stringify(newDataArray));
        return newDataArray;
      });
    }
  };
  

  return (
    <>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="input-field"
        />
        <br />
        <input
          type="text"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          placeholder="Contact Number"
          pattern="[0-9]*"
          onInvalid={(e) => e.target.setCustomValidity('Please enter only numbers')}
          onInput={(e) => e.target.setCustomValidity('')}
          inputMode="numeric" // Add this line to specify the input mode
          className="input-field"
        />

        <button className='submitbutton' type="submit">Submit</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Name</th>
            <th>Contact Number</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.name}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.contactNumber}</td>
              <td>
                <button className='deletebutton' onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Form;