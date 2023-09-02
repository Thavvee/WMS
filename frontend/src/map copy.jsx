import React, { useState } from 'react';

const ZoneModal = ({ zone, onClose, onUpdateInfo }) => {
  const [formData, setFormData] = useState({
    info: zone.info, // Initialize form data with current info value
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Update the info value using onUpdateInfo function
    onUpdateInfo(zone.id, formData.info);
    // Close the modal after submission
    onClose();
  };

  return (
    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.30)', padding: '20px' }}>
      {zone.name}
      <div className="form-group d-md-flex">
        <form onSubmit={handleSubmit}>
          <textarea
            style={{ width: '20rem', height: '10rem', margin: '20px' }}
            name="info"
            value={formData.info}
            onChange={handleFormChange}
          />
          <button type="submit" className="form-control btn btn-primary submit ">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const MapComponent = () => {
  const [hoveredZone, setHoveredZone] = useState(null);
  const [clickedZone, setClickedZone] = useState(null);
  const [zones, setZones] = useState([
    { id: 1, x: 83, y: 129, name: 'Zone A', info: 'Information about Zone A' },
    { id: 2, x: 107, y: 129, name: 'Zone B', info: 'Information about Zone B' },
    { id: 3, x: 132, y: 129, name: 'Zone C', info: 'Information about Zone C' },
    { id: 4, x: 157, y: 129, name: 'Zone D', info: 'Information about Zone D' },
    { id: 5, x: 182, y: 129, name: 'Zone E', info: 'Information about Zone E' },
    { id: 6, x: 206, y: 129, name: 'Zone F', info: 'Information about Zone F' },
    // ... add more zone data
  ]);

  const handleZoneHover = (zoneId) => {
    const hoveredZone = zones.find(item => item.id === zoneId);
    setHoveredZone(hoveredZone);
  };

  const handleZoneClick = (zoneId) => {
    const clickedZone = zones.find(item => item.id === zoneId);
    setClickedZone(clickedZone);
  };

  const handleCloseModal = () => {
    setClickedZone(null);
  };

  const handleUpdateInfo = (zoneId, newInfo) => {
    setZones(prevZones => prevZones.map(zone => {
      if (zone.id === zoneId) {
        return {
          ...zone,
          info: newInfo,
        };
      }
      return zone;
    }));
  };

  return (
   <div style={{ position: 'relative', width: '1080px', height: '1920px', overflow: 'auto' }}> {/* Adjust width and height as needed */}
      
      <img
        src="../assets/img/map-1.png"
        alt="Clickable Map"
        style={{ cursor: 'pointer', width: '100%', position: 'relative' }} // width set to 100% to fill the parent container
      />

      {zones.map(zone => (
        <div
          key={zone.id}
          style={{
            position: 'absolute',
            left: `${zone.x}px`,
            top: `${zone.y}px`,
            width: '22px',
            height: '40px',
            border: 'solid black',
            backgroundColor: hoveredZone === zone ? 'rgba(0, 0, 0, 0.5)' : 'transparent', // Add background color when hovered
          }}
          onMouseEnter={() => handleZoneHover(zone.id)}
          onMouseLeave={() => setHoveredZone(null)}
          onClick={() => handleZoneClick(zone.id)}
        >
        </div>
      ))}

      {hoveredZone && (
        <div
          style={{
            position: 'fixed',
            left: `${hoveredZone.x + 30}px`,
            top: `${hoveredZone.y}px`,
            backgroundColor: 'rgba(0, 0, 0, 0.80)',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '3px',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        >
          <p>{hoveredZone.name}</p>
          <p>{hoveredZone.info}</p>
        </div>
      )}

      {clickedZone && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '1px',
            borderRadius: '5px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
          }}
        >
          <ZoneModal
            zone={clickedZone}
            onClose={handleCloseModal}
            onUpdateInfo={(newInfo) => handleUpdateInfo(clickedZone.id, newInfo)}
          />
        </div>
      )}
    </div>
  );
};

export default MapComponent;
