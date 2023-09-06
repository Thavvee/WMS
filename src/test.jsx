import { useState,useEffect } from "react";
const Product_data = () => {
  const [zones, setZones] = useState ([

  ])
  useEffect(() => {
    async function fetchDataAndUpdateZones() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/storage/');
        const fetchedData = await response.json();
        // console.log(fetchedData,'fetched')
  
        const newZones = zones.map(zone => {
          // Find the updated data for the current zone based on some unique identifier (like id)
          const updatedZone = fetchedData.find(data => data.mapid === zone.mapid);
          const highestL = getHighestLForZone(updatedZone);
          // console.log(updatedZone)
          
          // If we found updated data, merge only the l1-l5 properties with the existing zone data
          if (updatedZone) {
            return {
              ...zone,
              l1: updatedZone.l1,
              l2: updatedZone.l2,
              l3: updatedZone.l3,
              l4: updatedZone.l4,
              l5: updatedZone.l5,
              mapid: updatedZone.mapid,
              highestL: highestL
            };
          }
          
          return zone; // If no updates for this zone, return it unchanged

          
        });
  
        setZones(newZones);
        console.log(newZones,'newzones')
        


      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    fetchDataAndUpdateZones();
  }, []);
  if (zones.length === 0) {
    // Display a loading indicator or message
    return <p>Loading...</p>;
  } 

  return (
    <div>
    {zones.map(zone => (
      <div
        key={zone.id}
        style={{
          position: 'absolute',

          clipPath: zone.clippath,
          border: '1px solid black'
        }}
      >
        <h3>{zone.name}</h3>
        <p>{zone.info}</p>
      </div>
    ))}
  </div>
  );
  
};

export default Product_data;