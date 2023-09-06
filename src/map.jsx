import React, { useState } from 'react';
import { Tooltip, Box, Card,StackDivider,FormControl,FormLabel,HStack, CardHeader, CardBody, Text, Select,Flex,Center,Square,Container, VStack, flexbox } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Grid, Button, Input,ButtonGroup, GridItem,Heading,Divider,CardFooter } from '@chakra-ui/react'
import MapComponent_1 from './Profile';
import Product_data from './test';
import { useRecoilState } from 'recoil';
import { hoveredZoneState, clickedZoneState } from './Atoms';


const MapComponent = () => {
  const [hoveredZone, setHoveredZone] = useRecoilState(hoveredZoneState);
  const [clickedZone, setClickedZone] = useRecoilState(clickedZoneState);
  const [suggestInfo, setSugestInfo] = [
    { id:1 ,zone:'W1',location:'',pallet:'1-10'}
  ];
  

  const [zones, setZones] = useState([
    { id: 1, x: 70, y: 68, name: 'Zone_A', info: 'Information about Zone A',width: 108, height: 400,clippath: "polygon(0% 0%, 70% 0%, 100% 20%, 100% 100%, 0% 100%)" },
    { id: 2, x: 224, y: 125, name: 'Zone_B', info: 'Information about Zone B',width: 148, height: 340,clippath: "polygon(0% 0%, 0% 0%, 100% 50%, 100% 100%, 0% 100%)"  },
    { id: 3, x: 417, y: 345, name: 'Zone_C', info: 'Information about Zone B',width: 52, height: 120,clippath: "polygon(0% 0%, 0% 0%, 100% 50%, 100% 100%, 0% 100%)"  },
    { id: 4, x: 78, y: 505, name: 'Zone_E', info: 'Information about Zone B',width: 100, height: 185  },
    { id: 5, x: 225, y: 505, name: 'Zone_E', info: 'Information about Zone B',width: 100, height: 185  },
    { id: 6, x: 370, y: 505, name: 'Zone_F', info: 'Information about Zone B',width: 100, height: 185  },
    // { id: 2, x: 107, y: 129, name: 'Zone B', info: 'Information about Zone B' },
    // { id: 3, x: 132, y: 129, name: 'Zone C', info: 'Information about Zone C' },
    // { id: 4, x: 157, y: 129, name: 'Zone D', info: 'Information about Zone D' },
    // { id: 5, x: 182, y: 129, name: 'Zone E', info: 'Information about Zone E' },
    // { id: 6, x: 206, y: 129, name: 'Zone F', info: 'Information about Zone F' },
    // ... add more zone data
  ]);

  const [zones_U, setZones_U] = useState([


    { x: 50, y: 100,col:'55',row:'1',warehouse: '113',zone:'A',mapid:'551',highestL:'0',l1:'99',l2:'99',l3:'99',l4:'99',l5:'99',state:'suggest'},
    { x: 90, y: 100,col:'55',row:'2',warehouse: '113',zone:'A',mapid:'552',highestL:'0',l1:'99',l2:'99',l3:'99',l4:'99',l5:'99',state:'suggest'},
    { x: 130, y: 100,col:'55',row:'3',warehouse: '113',zone:'A',mapid:'553',highestL:'0',l1:'99',l2:'99',l3:'99',l4:'99',l5:'99',state:'suggest'},
    { x: 170, y: 100,col:'55',row:'4',warehouse: '113',zone:'A',mapid:'554',highestL:'0',l1:'99',l2:'99',l3:'99',l4:'99',l5:'99',state:'suggest'},
    { x: 210, y: 100,col:'55',row:'5',warehouse: '113',zone:'A',mapid:'555',highestL:'0',l1:'99',l2:'99',l3:'99',l4:'99',l5:'99',state:'suggest'},
    { x: 250, y: 100,col:'55',row:'6',warehouse: '113',zone:'A',mapid:'556',highestL:'0',l1:'99',l2:'99',l3:'99',l4:'99',l5:'99',state:'suggest'},
  ]);


  const handleZoneHover = (zoneId) => {
    const hoveredZone = zones.find(item => item.mapid === zoneId);
    
    setHoveredZone(hoveredZone);
  };

  const handleZoneClick = (zoneId,zoneName) => {
    // const clickedZone = zones.find(item => item.id === zoneId);
    // setClickedZone(clickedZone);
    window.location.href = `map113/${zoneName}`;
    // window.location.href = `/profile/${clickedZone.id}`;
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
  const [selectedOption, setSelectedOption] = useState(null);


  const optionNames = {
    option1: "ZCAWC020100001 WIP ไม้ฝา Non-A ตราช้าง 15x300x0.8 ซม.",
    option2: "OZCAXXXXXX2 WIP ไม้ฝา Non-A ตราช้าง 15x300x0.8 ซม.",
    option3: "ZCAXXXXXX2 WIP ไม้ฝา Non-A ตราช้าง 15x300x0.8 ซม.",
  };

  const [showMapComponent, setShowMapComponent] = useState(false);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setShowMapComponent(false); // Reset showMapComponent when changing options
  };
  const [editMode, setEditMode] = useState(false);

  const updateZonesInMapComponent = () => {
    console.log(zones_U);
    // Update zones_U and pass it to MapComponent
    setZones_U([...zones_U]); // This triggers a re-render
  };
  
  


  const [editedValues, setEditedValues] = useState({});

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


  return (

    

    <div  style={{
      display: 'inline',

      padding: '10px',
    }}>
      <Tabs>
  <TabList>
    <Tab>Manual</Tab>
    <Tab>Suggestion</Tab>
    
  </TabList>

  <TabPanels>
    <TabPanel>
    <Box maxW='xl' marginBottom='1rem' >
      <Select placeholder='Select option'
      bg='#614AEB'
      color='white'
      >
  <option value='option1'>ZCAWC020100001 WIP ไม้ฝา Non-A ตราช้าง 15x300x0.8 ซม.
</option>
  <option value='option2'>ZCAXXXXXX2 WIP ไม้ฝา Non-A ตราช้าง 15x300x0.8 ซม.</option>
  <option value='option3'>ZCAXXXXXX2 WIP ไม้ฝา Non-A ตราช้าง 15x300x0.8 ซม.</option>
</Select>
  </Box>

     

    <div className='column' style={{
      flex: '3',  // this makes the map take up 3 parts of space
       marginRight: '2rem',
       position: 'relative' // space between the map and newCard
   }}>
  <div style={{  width: '580px',  overflow: 'auto', boxShadow: '10px 10px rgba(0, 0, 0, 0.8)',backgroundColor: 'white' ,justifyContent:'center', borderRadius:'10px',paddingLeft:'2rem',paddingRight:'2rem',paddingTop:'0.5rem'}}> {/* Adjust width and height as needed */}
      
      <img
        src="../assets/img/map-1.png"
        alt="Clickable Map"
        style={{ cursor: 'pointer', width: '100%', position: 'relative' }} // width set to 100% to fill the parent container
      />
     {zones.map((zone) => (
 <Tooltip key={zone.id} label={` ${zone.name}`} aria-label="Zone tooltip">
    <div
  style={{
    position: "absolute",
    left: `${zone.x}px`,
    top: `${zone.y}px`,
  }}
  onMouseEnter={() => handleZoneHover(zone.id)}
  onMouseLeave={() => setHoveredZone(null)}
  onClick={() => handleZoneClick(zone.id,zone.name)}
>
  <div
    style={{
      width: `${zone.width}px`,
      height: `${zone.height}px`,
      backgroundColor: hoveredZone === zone ? "rgba(0, 0, 0, 0.5)" : "transparent",
      clipPath: zone.clippath,
      border: hoveredZone === zone ? "1px solid black" : "2px solid black",
    }}
  ></div>
</div>

  </Tooltip>
))}

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
       
        </div>
      )}
      </div>
    </div>
    </TabPanel>
    <TabPanel>
        
  <Box maxW='xl'  >
      <Select placeholder='Select Material No.'
      bg='#614AEB'
      color='white'
      onChange={handleSelectChange}
      marginBottom='1rem'
      >
  <option value='option1'>ZCAWC020100001 WIP ไม้ฝา Non-A ตราช้าง 15x300x0.8 ซม.
</option>
  <option value='option2'>ZCAXXXXXX2 WIP ไม้ฝา Non-A ตราช้าง 15x300x0.8 ซม.</option>
  <option value='option3'>ZCAXXXXXX2 WIP ไม้ฝา Non-A ตราช้าง 15x300x0.8 ซม.</option>
</Select>
  </Box>
    <Grid
  h='50rem'
  templateRows='repeat(2, 1fr)'
  templateColumns='repeat(5, 1fr)'
  gap={4}
>
  
  <GridItem rowSpan={2} colSpan={4}   > 

  {/* <Box bg='white' h='90%' marginTop='1rem' borderRadius='10px' p='5' overflow='auto' >
  <Heading>Warehouse</Heading>
  <Divider p='2'/>
  <MapComponent_1/>
  </Box> */}


        <Box bg='white' h='100%'  borderRadius='10px' p='5' >
          <Box mb='2'>
            <Heading>Warehouse 113 Zone W1 (Pallet 1-10)</Heading>
            <Divider pt='2' />
          </Box>
    
          {showMapComponent && ( 
          
              <Box overflow='auto' h='90%' >
                <MapComponent_1 zones_U={zones_U} updateZonesInMapComponent={updateZonesInMapComponent}/>
              </Box>
    
          )}
        </Box> 

  

     
    </GridItem>
  
    <GridItem colSpan={1} rowSpan={1} bg='white' style={{maxHeight: '100vh', overflow: 'auto'}}>
  {selectedOption && (
    <Box p='5'> 
      <Box pb='5'>
        <Heading as='h3' size='sm' textAlign='center'> {optionNames[selectedOption]}</Heading>
      </Box>
      <Box  >
      <Box
      p="4"
      border="solid black 1px"
      onClick={() => setShowMapComponent(!showMapComponent)} 
      cursor="pointer"
      _hover={{ backgroundColor: 'gray.100' }} // Hover style
      backgroundColor={showMapComponent ? 'gray.200' : 'white'} // Clicked style
    >
      <Heading as="h5" size="sm" mb="5">
        Pallet 1-10
      </Heading>
      <Text>ZONE W1</Text>
      <Text>BIN LOCATION A1</Text>
      <Text>MORE INFO BRAH BRAH</Text>
    </Box>

      <Box p ='4' border='solid black 1px'>
        <Heading as='h5' size='sm' mb='5' >
    Pallet 11-20
  </Heading>
  <Text> ZONE 113 
 </Text>
<Text> 
BIN LOCATION A2
 </Text>
<Text> 
MORE INFO BRAH BRAH </Text>
      </Box>


      <Box p ='4' border='solid black 1px'>
        <Heading as='h5' size='sm' mb='5' >
    Pallet 21-22 เศษ 22
  </Heading>
  <Text> ZONE 113 
 </Text>
<Text> 
BIN LOCATION A3
 </Text>

      </Box>

    
      </Box>
      <Center>
      <Button variant='solid' colorScheme='blue' onClick={() => updateZonesInMapComponent([...zones_U])} >Submit </Button>
      </Center>
      </Box>

    )}



  </GridItem>
  <GridItem colSpan={1} rowSpan={1} bg='white'>
  <Box p='5'> 
         
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

      </Box>
  </GridItem>
  {/* <GridItem colSpan={2} bg='tomato' >
      <Product_data/>
  </GridItem> */}
</Grid>
    </TabPanel>
    
  </TabPanels>
</Tabs>

    
    </div>
  );
};

export default MapComponent;
