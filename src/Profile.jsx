import React, { useState ,useEffect, useRef } from 'react';
import { Card, CardHeader, CardBody, CardFooter,Text,Heading,Stack,StackDivider,Box,Divider,ButtonGroup,Button,Image} from '@chakra-ui/react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useRecoilState } from 'recoil';
import { hoveredZoneState, clickedZoneState } from './Atoms';

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  SimpleGrid,
  VStack,
  HStack,
} from '@chakra-ui/react'
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
} from '@chakra-ui/react'

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
} from '@chakra-ui/react'
import Map_a from '../public/assets/img/map_w113.png';
import  {zone_113a, colname_113a} from './zones/113/zone_113a.js'



const MapComponent_1 = ({ zones_U, updateZonesInMapComponent }) => {
  
  const [hoveredZone, setHoveredZone] = useRecoilState(hoveredZoneState);
  const [clickedZone, setClickedZone] = useRecoilState(clickedZoneState);
  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState({});
  const [data, setData] = useState({});
  const [componentsLoaded, setComponentsLoaded] = useState(false);
  const [showLayer, setShowLayer] = useState(true);

  const [zones, setZones] = useRecoilState(zone_113a);

  const [zone_v, setZone_v] = useState(colname_113a);


  const getHighestLForZone = (zone) => {
    if (zone && zone.l5) return '5';
    if (zone && zone.l4) return '4';
    if (zone && zone.l3) return '3';
    if (zone && zone.l2) return '2';
    if (zone && zone.l1) return '1';
    return '0';
}

  const highestLs = zones.map(zone => ({
      mapid: zone.mapid,
      highestL: getHighestLForZone(zone)
  }));

  // console.log(highestLs); 


  const handleZoneHover = (zoneId) => {
    const hoveredZone = zones.find(item => item.mapid === zoneId);
    if (!clickedZone) {
      setHoveredZone(hoveredZone);
    }
    

  };



  const handleZoneClick = (zoneId) => {

    const clickedZone = zones.find(item => item.mapid === zoneId);
    console.log('click', zoneId, clickedZone);

    if (clickedZone) {
        setClickedZone(clickedZone);
        setHoveredZone(null);
    } else {
        setClickedZone(null); // ตั้งค่า clickedZone เป็น null หากไม่พบ
    }
};

  


  // const handleZoneClick_wood = (zoneId) => {
  //   const clickedZone_wood = zone_wood.find(item => item.mapid === zoneId);
  //   setClickedZone(clickedZone_wood);
  //   setHoveredZone(null);
  // };

  const handleCancelClick = () => {
    setClickedZone(null);
    setHoveredZone(null);
    setEditMode(false);
    setEditedValues({});
  };


  const getDisplayValue = (level) => {
    if (editedValues && editedValues[level]) {
      // console.log('editview',editedValues[level])
      return editedValues[level];
    }
    if (hoveredZone && hoveredZone[level]) {
      // console.log(hoveredZone[level])
      return hoveredZone[level];
    }
    if (clickedZone && clickedZone[level]) {
      // console.log(clickedZone[level])
      return clickedZone[level];
     
    }
    return '-';
  };

  const updateZonesWithZones_U = () => {
    // Create a new updatedZones array
    const updatedZones = zones.map(zone => {
        // Find the corresponding zone_U with the same mapid
        const matchingZone_U = zones_U.find(zu => zu.mapid === zone.mapid);
        // If a matching zone_U is found, merge the data, otherwise return the original zone
        return matchingZone_U ? {...zone, ...matchingZone_U} : zone;
    });

    // Update the zones state
    setZones(updatedZones);
};
  



  const handleEditMode = e => {
    e.preventDefault();
 
    setEditMode(prevEditMode => !prevEditMode);
    
    // If we're currently in edit mode, then toggle off and save changes
    if (editMode) {
      
     
      
      const payload = {
        warehouse: clickedZone.warehouse,
        zone: clickedZone.zone,
        col: clickedZone.col,
        row: clickedZone.row,
        level: '',
        l1: inputRefs.l1.current.value,
        l2: inputRefs.l2.current.value,
        l3: inputRefs.l3.current.value,
        l4: inputRefs.l4.current.value,
        l5: inputRefs.l5.current.value,
        product: '',
      };
      // setClickedZone(null)
      setHoveredZone({})
      setInputBgColors({})
      setEditedValues({})
  
      console.log('payload', payload);
  
      fetch('http://127.0.0.1:8000/api/storage/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then(response => response.json())
        .then(data => {
              toast({
            title: 'Update Successfully',
            description: `Column ${data.col}, Row ${data.row} is update`,
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'bottom-right'
          });
        
          // console.log(data,'datattt')

          const newZones = zones.map(zone => {
            
            // Find the updated data for the current zone based on some unique identifier (like id)
            // console.log(updatedZone)
            
            // If we found updated data, merge only the l1-l5 properties with the existing zone data
            if (zone.mapid === data.mapid) {
              const highestL = getHighestLForZone(data);
              return {
                  ...zone,
                  l1: data.l1,
                  l2: data.l2,
                  l3: data.l3,
                  l4: data.l4,
                  l5: data.l5,
                  highestL: highestL
              };
              

          } 
            
            return zone; // If no updates for this zone, return it unchanged
          
            
          });

          setZones(newZones);
          console.log(inputRefs,'inputRefs')
 
          // setClickedZone(editedValues)

          // setEditedValues('')
          setEditedValues({})
          console.log(clickedZone,'clickedZone')
          console.log(editedValues,'edit')
          console.log(hoveredZone,'hoverZone')
        
        })
        
        .catch(error => {
          console.log(error);
        });
    } else {
      setEditedValues(clickedZone);

    }
  };
  
  


  useEffect(() => {
    async function fetchDataAndUpdateZones() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/storage/');
        const fetchedData = await response.json();
        
        let newZones = zones.map(zone => {
          const updatedZone = fetchedData.find(data => data.mapid === zone.mapid);
          const highestL = getHighestLForZone(updatedZone);
          
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
          return zone;
        });

        // Combine with your updateZonesWithZones_U logic here
        newZones = newZones.map(zone => {
          const matchingZone_U = zones_U.find(zu => zu.mapid === zone.mapid);
          const highestL = getHighestLForZone(matchingZone_U);
          if (matchingZone_U) {
            return {
              ...zone,
              ...zone,
            l1: matchingZone_U.l1,
            l2: matchingZone_U.l2,
            l3: matchingZone_U.l3,
            l4: matchingZone_U.l4,
            l5: matchingZone_U.l5,
            highestL: highestL,
            state: matchingZone_U.state
            
              // add any properties you want to update from zones_U
            };
          }
          return zone;
        });

        console.log(newZones)
        setZones(newZones);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    fetchDataAndUpdateZones();
  }, []); 

   // <- If you want to run it only once when the component mounts

//    useEffect(() => {
//     console.log(zones, 'updated zones');
// }, [zones]);

useEffect(() => {
  console.log('zone change');
  setTimeout(() => {
    setComponentsLoaded(true); // อัปเดตสถานะข้อมูลเสร็จเรียบร้อยแล้ว (ใช้ loadedData แทนสถานะการแสดงข้อมูล)
  }, 200);
  
  
}, [zones]);



  
  

  
  const inputRefs = {
    l1: useRef(null),
    l2: useRef(null),
    l3: useRef(null),
    l4: useRef(null),
    l5: useRef(null),
  };

  
  
  const [zoom, setZoom] = useState(1); // 1 = 100%, 2 = 200%, etc.



  useEffect(() => {
    // Check if clickedZone is present in the updated zones
    if (clickedZone) {
      const updatedClickedZone = zones.find(item => item.mapid === clickedZone.mapid);
      if (updatedClickedZone) {
        setClickedZone(updatedClickedZone);
      } else {
        // Reset clickedZone if it's not found in the updated zones
        setClickedZone(null);
      }
    }
  }, [zones]);
  

  const getBackgroundColor = (zone) => {
    // if (clickedZone === zone || hoveredZone === zone) {
    //     return 'rgba(0, 0, 0, 0.2)';
    // }
    
    if (zone.highestL === '5') {
        return '#eac5c5'; 
    }

    if (zone.highestL === '4'|| zone.highestL === '3' || zone.highestL === '2' || zone.highestL === '1'  ) {
      return 'rgb(234 228 197)'; 
  }
 
    
    return 'whitesmoke';
}

// const getBackgroundColor_input = (level) => {
//   if ((hoveredZone[level] || clickedZone[level]) && (level === 'l1' || level === 'l2' || level === 'l3' || level === 'l4')) {
//     return 'rgb(234, 228, 197)';  // สีเหลือง
//   } else if ((hoveredZone[level] || clickedZone[level]) && level === 'l5') {
//     return '#eac5c5';  // สีแดง
//   }  else {
//     return 'gray.200';  // สีเทา
//   }
// };



const [inputBgColors, setInputBgColors] = useState({});

const handleInputChange = (level, value) => {
  // Check if the previous level is filled
  const previousLevel = getPreviousLevel(level); // Implement a function to get previous level
  if (previousLevel && !editedValues[previousLevel]) {
    // Prevent input change
    return;
  }

  // Update input values
  setEditedValues(prevValues => ({
    ...prevValues,
    [level]: value,
  }));
};
const getCustomLabel = (level) => {
  switch (level) {
    case 'l5':
      return 'Level 5';
    case 'l4':
      return 'Level 4';
    case 'l3':
      return 'Level 3';
    case 'l2':
      return 'Level 2';
    case 'l1':
      return 'Level 1';
    default:
      return '';
  }
};


// 2. ปรับปรุง event handler
const handleKeyUp = (level, event) => {
  const newBgColors = { ...inputBgColors };
  if (event.target.value) {
    newBgColors[level] = '#319795';
  } else {
    newBgColors[level] = 'gray.200';
  }
  setInputBgColors(newBgColors);
};

const handleZoomIn = () => {
  setZoom(prevZoom => prevZoom * 1.1);
  if (zoom > 1.5) {
    setShowLayer(false);
    setZoom(1);  // ตั้งค่า zoom กลับไปที่ 1
  }
};

const handleZoomOut = () => {
  setZoom(prevZoom => prevZoom / 1.1);
  if (zoom <= 1.5) {
    setShowLayer(true);
    setZoom(1);  // ตั้งค่า zoom กลับไปที่ 1
  }
};


  return (

    
    <div style={{position: 'relative' }} onClick={() => handleZoneClick(null)}>
      {componentsLoaded ? (
      <div style={{display:'flex'}}>
        <div style={{ width:'100%'}}>
        <button onClick={handleZoomIn}>Zoom In</button>
      <button onClick={handleZoomOut}>Zoom Out</button>
      {showLayer ? (

         <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top left',
            width: '2080px',
            height: '2080px',
            backgroundColor: 'white',
            borderRadius: '10px',
            paddingLeft: '2rem',
            paddingRight: '2rem',
            paddingTop: '0.5rem',
       
          }}
        >
  <div>HELLO WORLD</div> 
  </div>
  ) : (
       <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top left',
            width: '2080px',
            height: '2080px',
            backgroundColor: 'white',
            borderRadius: '10px',
            paddingLeft: '2rem',
            paddingRight: '2rem',
            paddingTop: '0.5rem',
            backgroundImage: `url(${Map_a})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >


  <>
    {zones.map((zone) => (
      <div
        key={zone.mapid}
        style={{
          position: 'absolute',
          left: `${zone.x}px`,
          top: `${zone.y}px`,
          width: zone.width || '35px',
          height: zone.height || '60px',
          border:
            (clickedZone && clickedZone.mapid === zone.mapid) ||
            (hoveredZone && hoveredZone.mapid === zone.mapid)
              ? 'solid black 2px'
              : 'none',
          textAlign: 'center',
          backgroundColor:
            zone.state === 'suggest'
              ? 'rgb(223, 197, 234)'
              : getBackgroundColor(zone),
        }}
        onMouseEnter={() => handleZoneHover(zone.mapid)}
        onMouseLeave={() => setHoveredZone('')}
        onClick={(e) => {
          e.stopPropagation();
          handleZoneClick(zone.mapid);
        }}
      >
        <label>{zone && zone.highestL}</label>
      </div>
    ))}

    {zone_v.map((zone) => (
      <div
        key={zone.mapid}
        style={{
          position: 'absolute',
          left: `${zone.x}px`,
          top: `${zone.y}px`,
          width: zone.width || '35px',
          height: zone.height || '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Tag variant="solid" colorScheme="teal">
          {zone.col}
        </Tag>
      </div>
    ))}
  </>
  </div>
)}


      
      {/* </TransformComponent>
    </TransformWrapper> */}
    </div>
  <div  >
    <div style={{
        flex: '1',
        position: 'sticky',
        top: '1rem',
        left: '10rem', // Stick to the top of the parent
        marginLeft: '1rem',
        zIndex: 1,
        // marginRight: '2rem'
        // alignSelf: 'flex-start'
        
        // ... other styles
      }}>
   <form >
     

      {/* <div   style={{overflow:'auto'}} >
        <VStack
          divider={<StackDivider borderColor='gray.200' />}
          spacing={1}
          align='stretch'
        >
          <Heading size='md' >Side View</Heading>
          
          <FormControl>
          <HStack justify="center" align="center"  w="full">

          <HStack justify="center" align="center" spacing={5} w="full">
    <Text> Column </Text> <Text color='red'>    {hoveredZone && hoveredZone.col||clickedZone && clickedZone.col || '-'} </Text>
    </HStack>
                  
  
                        <HStack justify="center" align="center" spacing={5} w="full">
    <Text> Row </Text> <Text color='red'>   {hoveredZone && hoveredZone.row||clickedZone && clickedZone.row || '-'} </Text>
    </HStack>
    </HStack>
  
  </FormControl>
   

          {['l5', 'l4', 'l3', 'l2', 'l1'].map(level => (
          
   
                      <HStack key={level} >
                      <FormLabel w='50%'> {getCustomLabel(level)} </FormLabel>
            
                        <Box
                        w='100%'
                        bg={getDisplayValue(level) !== '-' || editedValues[level] ? '#319795' : 'gray.200'}
                        borderRadius={'10px'}
                        // Set the padding to match the Input component's padding
                      >
                  
                      <Input
                        size='sm'
                        // value={formp[level]}
                        name={level}
                       
                        // onChange={handleChange}
                        value={hoveredZone && hoveredZone[level]|| clickedZone && clickedZone[level]|| '' }
                        color={'white'}
                        readOnly
                       // ใช้สีพื้นหลังจาก state โดยใช้ key ที่เป็น level
                      />


                      </Box>

                      
                      </HStack>
          
          ))}

          <Text style={{textAlign:'center'}}>Ground</Text>
        </VStack>
      </div> */}
      <Divider />
      <div>
      
  {/* <ButtonGroup spacing='2'>
  
    <Button variant='ghost' colorScheme='blue' onClick={handleCancelClick} >
      Cancel
    </Button>
  </ButtonGroup> */}



        
      </div>
      </form>
      </div>
    </div>
    </div>
    ) : (
      <div style={{position: 'relative' }}>
        Loading...
      </div>
    )}
    </div>


  
  );
};

export default MapComponent_1;
