import React, { useState,useTransition } from 'react';
import { Tooltip, Box, Card,StackDivider,FormControl,FormLabel,HStack, CardHeader, CardBody, Text, Select,Flex,Center,Square,Container, VStack, flexbox } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Grid, Button, Input,ButtonGroup, GridItem,Heading,Divider,CardFooter } from '@chakra-ui/react'
import MapComponent_1 from './Profile';
import Productinput from './Productinput';
import Map_Select from './map_select';
import DrawerExample from './Drawer';
import Product_data from './test';
import { useRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';
import { hoveredZoneState, clickedZoneState,productSelectedState,zoneSelectedState } from './Atoms';
import { unstable_startTransition as startTransition } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,  
} from '@chakra-ui/react'

import Map_warehouse from '../public/assets/img/map_warehouse.svg';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import Map_select from './map_select';



// function DrawerExample({ isOpen, onClose, btnRef, handleProductSelect })  {


//   return (
//     <Drawer size={'lg'} isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
//       <DrawerOverlay />
//       <DrawerContent>
//         <DrawerCloseButton />
//         <DrawerHeader>Job List</DrawerHeader>
//         <DrawerBody>
//         <TableContainer >
//   <Table variant='simple'>
//     <TableCaption>Imperial to metric conversion factors</TableCaption>
//     <Thead>
//       <Tr>
//         <Th>Product info</Th>
//         <Th>from</Th>
//         <Th >to</Th>
//         <Th isNumeric>Pallet</Th>
//         <Th></Th>
//       </Tr>
//     </Thead>
//     <Tbody>
//       <Tr>
//         <Td>ZCA123000008xxx</Td>
//         <Td>XXX</Td>
//         <Td >HS7</Td>
//         <Td isNumeric> 40</Td>
//         <Button onClick={() => handleProductSelect({ id: 'ZCA123000008xxx', from: 'XXX', to: 'HS7', pallet: 40 })}>
//     Select Product
//   </Button>
//       </Tr>
//       <Tr >
//       <Td>ZCA123000008xxx</Td>
//         <Td>XXX</Td>
//         <Td >HS8</Td>
//         <Td isNumeric> 40</Td>
//         <Td><Button >
//           Open
//         </Button></Td>
        
//       </Tr>
//       <Tr>
//       <Td>ZCA123000008xxx</Td>
//         <Td>XXX</Td>
//         <Td >HS9</Td>
//         <Td isNumeric>  40</Td>
//         <Td><Button>Select Product</Button></Td>
//       </Tr>
//       <Tr>
//       <Td>ZCA123000008xxx</Td>
//         <Td>XXX</Td>
//         <Td >HS9</Td>
//         <Td isNumeric>  40</Td>
//         <Td><Button>Select Product</Button></Td>
//       </Tr>
//       <Tr>
//       <Td>ZCA123000008xxx</Td>
//         <Td>XXX</Td>
//         <Td >HS9</Td>
//         <Td isNumeric>  40</Td>
//         <Td><Button>Select Product</Button></Td>
//       </Tr>
//       <Tr>
//       <Td>ZCA123000008xxx</Td>
//         <Td>XXX</Td>
//         <Td >HS9</Td>
//         <Td isNumeric>  40</Td>
//         <Td><Button>Select Product</Button></Td>
//       </Tr>
//     </Tbody>
    
//   </Table>
// </TableContainer>
//         </DrawerBody>
//         <DrawerFooter>
//           <Button variant="outline" mr={3} onClick={onClose}>
//             Cancel
//           </Button>
//           <Button colorScheme="blue">Save</Button>
//         </DrawerFooter>
//       </DrawerContent>
//     </Drawer>
//   );
// }



const MapComponent = () => {
  const [productSelected, setProductSelected] = useRecoilState(productSelectedState);
  const [hoveredZone, setHoveredZone] = useState(null);
  const [isPending, startTransition] = useTransition();
  const [selectedProduct, setselectedProduct] = useState(null);
  const [clickedZone, setClickedZone] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const [isMapSelected, setIsMapSelected] = useState(false);
  const [suggestInfo, setSugestInfo] = [
    { id:1 ,zone:'W1',location:'',pallet:'1-10'}
  ];
  const [zoneSelected, setZoneSelected] = useRecoilState(zoneSelectedState);


  const [showMap, setShowMap] = useState(false);
  const [zones, setZones] = useState([

    { id: 2, x: 570, y: 60,name: 'Zone_B', info: 'Information about Zone B',width: 75, height: 140,clippath: "polygon(0% 0%, 0% 0%, 100% 50%, 100% 100%, 0% 100%)", mapid:'113'   },

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

  const handleZoneClick = (zoneId) => {
    startTransition(() => {
      setClickedZone(zoneId);
    });
  };


  const handleProductSelect = (product) => {
    setselectedProduct(product);
    setProductSelected(product);
    onClose();  // Close the drawer
  };
  const renderZoneComponent = () => {
    if (clickedZone === 113) {
      return <Map_select />;
    }
    return <>No</>;
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
  
  const handleBackClick = () => {
    setIsMapSelected(false); // ย้อนกลับไปยัง Map_Select
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
    <div>
 
       <Grid
  h='100vh'
  templateRows='repeat(2, 1fr)'
  templateColumns='5fr 20rem'
  gap={4}
>



<GridItem rowSpan={2} colSpan={1}>  
    

{isPending ? "Loading..." : null}
     
      {clickedZone === '113' ? 
      <div> <Button onClick={() => setClickedZone(null)}>ย้อนกลับ</Button> 
      <Map_Select /> 
      </div>
      : (

          <Box p='5' style={{ height: '100%', overflow: 'auto' }} bg='white'>
          <Heading> Warehouse Layout</Heading>
          <Divider m='1'/>

   
            <div
              style={{
                width: '900px',  // กำหนดให้มีขนาดเต็ม Box
                height: '450px',  // กำหนดให้มีขนาดเต็ม Box
                position: 'relative',
                backgroundImage: `url(${Map_warehouse})`,
                backgroundSize: '100% 100%',  // ให้รูปภาพครอบคลุมทั้ง Box
                backgroundPosition: 'center',  // จัดตำแหน่งรูปภาพให้อยู่ตรงกลาง
              }}
            >
              
            {zones.map((zone) => (
 <Tooltip hasArrow key={zone.id} label={` ${zone.name}`} aria-label="Zone tooltip">
    <div
  style={{
    position: "absolute",
    left: `${zone.x}px`,
    top: `${zone.y}px`,
    zIndex: 2
  }}
  onMouseEnter={() => handleZoneHover(zone.mapid)}
  onMouseLeave={() => setHoveredZone(null)}
  onClick={() => handleZoneClick(zone.mapid,zone.name)}
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

           

      </div>
      
    
 
          </Box>


)}

                  </GridItem>
    
                  <GridItem colSpan={1} rowSpan={2} bg='white' >
                  <Box p='5' bg='white'>
                  <Heading>Select Product</Heading>
         
          <Divider m='1'/>
          {productSelected ? ( <div className="product-card">
          <h3>Selected Product</h3>
          <p>ID: {productSelected.id}</p>
          <p>From: {productSelected.from}</p>
          <p>To: {productSelected.to}</p>
          <p>Pallet: {productSelected.pallet}</p>
        </div>
         ):( 
        
        <>
        <Text>PLS SELECT YOUR PRODUCT</Text> <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
        Open
      </Button></>)
          }
         
     

         <DrawerExample isOpen={isOpen} onClose={onClose} btnRef={btnRef} handleProductSelect={handleProductSelect} />

</Box>

<Box p='5'  bg='white'>
                  <Heading>Select Location</Heading>
          <Divider m='1'/>
          <TableContainer>
  <Table variant='simple'>
    <TableCaption>Imperial to metric conversion factors</TableCaption>
    <Thead>
      <Tr>
        <Th>Zone</Th>
        <Th>Pallet</Th>
        <Th></Th>
      </Tr>
    </Thead>
    <Tbody>
      {zoneSelected && zoneSelected.length > 0 ? ( <Tr>
        <Td>{zoneSelected?.[0]?.zone || 'N/A'}</Td>
        <Td>{zoneSelected?.length || 0}</Td>
        <Td>
          <Button onClick={() => {/* Your onClick logic here */}}>
            Select Location
          </Button>
        </Td>
      </Tr>):(
        <div>Not avaliable</div>
      )}
     
    </Tbody>
  </Table>
</TableContainer>






</Box>

</GridItem>

    


    </Grid>
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
