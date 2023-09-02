import React, { useState ,useEffect, useRef } from 'react';
import { Card, CardHeader, CardBody, CardFooter,Text,Heading,Stack,StackDivider,Box,Divider,ButtonGroup,Button,Image} from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Radio,
  SimpleGrid,
  VStack,
  HStack,
} 



from '@chakra-ui/react'
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
} from '@chakra-ui/react'
import { Checkbox, CheckboxGroup,Select } from '@chakra-ui/react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
} from '@chakra-ui/react'
import Map_a from '../public/assets/img/113a.png';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { productListState } from './Atoms';
import { fetchProductList } from './Selectors';



const MapComponent_1 = () => {
  const setProductList = useSetRecoilState(productListState);
  const products = useRecoilValue(fetchProductList);
  const toast = useToast();
  const [hoveredZone, setHoveredZone] = useState('');
  const [clickedZone, setClickedZone] = useState('');
  const [editMode, setEditMode] = useState(false);
  const initialLevelState = {
    product: '',
    lock: false,
    lab: false,
  };
  
  const [formData, setFormData] = useState({
    1: { ...initialLevelState },
    2: { ...initialLevelState },
    3: { ...initialLevelState },  
    4: { ...initialLevelState },
    5: { ...initialLevelState },
  });
  
  const [editedValues, setEditedValues] = useState({
    1: { ...initialLevelState },
    2: { ...initialLevelState },
    3: { ...initialLevelState },
    4: { ...initialLevelState },
    5: { ...initialLevelState },
  });
  
  const [highestLevels, setHighestLevels] = useState({});

  const [zones, setZones] = useState([

    {  x: 50, y: 100,col:55,row:1,warehouse: '1',zone:1,mapid:"551",highestL:'0'},
    {  x: 90, y: 100,col:55,row:2,warehouse: '113',zone:1,mapid:'552',highestL:'0'},
    {  x: 130, y: 100,col:55,row:3,warehouse: '113',zone:1,mapid:'553',highestL:'0'},
    {  x: 170, y: 100,col:55,row:4,warehouse: '113',zone:1,mapid:'554',highestL:'0'},
    {  x: 210, y: 100,col:55,row:5,warehouse: '113',zone:1,mapid:'555',highestL:'0'},
    {  x: 250, y: 100,col:55,row:6,warehouse: '113',zone:1,mapid:'556',highestL:'0'},


  ]);


  useEffect(() => {
    // This will set the product list when the component mounts
    setProductList(products);
  }, [products, setProductList]);


  useEffect(() => {
    console.log('zone change',zones);
    
    
  }, [zones]);

  const handleZoneHover = (zoneId) => {
    const hoveredZone = zones.find(item => item.mapid === zoneId);
    if (!clickedZone) {
      setHoveredZone(hoveredZone);
    }
    

  };


  const handleZoneClick = (zoneId) => {

    const clickedZone = zones.find(item => item.mapid === zoneId);
    console.log('click',zoneId,clickedZone);
    setClickedZone(clickedZone);
    console.log(clickedZone)
    setHoveredZone(null);

  };
  

  const handleCancelClick = () => {
    setClickedZone(null);
    setHoveredZone(null);
    setEditMode(false);
    setEditedValues({});
  };




  const inputRefs = useRef({
    1: { product: null, lock: null, lab: null },
    2: { product: null, lock: null, lab: null },
    3: { product: null, lock: null, lab: null },
    4: { product: null, lock: null, lab: null },
    5: { product: null, lock: null, lab: null }
  });
  

   //////////////////////////////////////////////////////////////////////////////////////////////////
   /////////////////////////////////////   Handle Submit Form   /////////////////////////////////////
   //////////////////////////////////////////////////////////////////////////////////////////////////

   const [checkboxEnabled, setCheckboxEnabled] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
  });

  useEffect(() => {
    if (editedValues?.levels) {
    ['5','4','3','2','1'].forEach(level => {
      const hasDefaultValue = editedValues?.levels && editedValues.levels[level]?.product;
      if (hasDefaultValue) {
        setCheckboxEnabled(prev => ({ ...prev, [level]: true }));
      }
    });
  }
  }, [editedValues]);

  const handleKeyup = (level) => {
    const productValue = inputRefs.current[level]?.product?.value;
    if (productValue) {
      setCheckboxEnabled(prev => ({ ...prev, [level]: true }));
    } else {
      setCheckboxEnabled(prev => ({ ...prev, [level]: false }));
    }
  };


  useEffect(() => {
    console.log(inputRefs,'RefChange!!')
  }, [inputRefs]);
  

const toggleEditMode = () => {
  setEditMode(prevEditMode => !prevEditMode);
};

const updateFormData = async () => {
 
  const newFormData = { ...formData };

  // Iterate through each level and update the 'product' key with the value from the corresponding ref
  Object.keys(inputRefs.current).forEach((level) => {
    // Make sure to navigate through the 'current' property to get the actual DOM element
    const productValue = inputRefs.current[level].product.value;
    const labValue = productValue ? inputRefs.current[level].lab.checked : false;  
    const lockValue = productValue ? inputRefs.current[level].lock.checked : false;

    newFormData[level] = { 
      ...newFormData[level], 
      product: productValue,
      lab: labValue,  // Update this
      lock: lockValue  // Update this
    };
  });
  console.log(formData,'formData')

  // Update formData state
  setFormData(newFormData);

  const payload = Object.keys(newFormData).map(level => {
    const levelData = newFormData[level];
  
    return {
      zone: clickedZone.zone,
      column: clickedZone.col,
      row: clickedZone.row,
      mapid: clickedZone.mapid,
      level: parseInt(level),
      lab: levelData.lab,  // Use the lab value from formData
      lock: levelData.lock,  // Use the lock value from formData
      product: levelData.product,  // Use the product value from formData
    };
  });
  console.log(payload)
  try {
    const response = await fetch('http://127.0.0.1:8000/api/storage_info_bulk/', {  // Assume bulk endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  
    if (response.ok) {
      
      const updatedZoneDataArray = await response.json();
      console.log('Bulk update successful:', updatedZoneDataArray);
    
      const newZones = zones.map(zone => {
        const updatedDataForThisZone = updatedZoneDataArray.filter(data => data.mapid === zone.mapid);
    
        if (updatedDataForThisZone.length > 0) {
          const newLevels = { ...zone.levels };
          updatedDataForThisZone.forEach(data => {
            newLevels[data.level] = {
              product: data.product,
              lock: data.lock,
              lab: data.lab,
            };
          });
    
          return {
            ...zone,
            levels: newLevels
          };
        }
        return zone;
      });
    
      setZones(newZones);
      setCheckboxEnabled({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false
      });
      const firstRow = updatedZoneDataArray[0]?.row;
      const firstCol = updatedZoneDataArray[0]?.column;

      toast({
        title: 'Update Successfully',
        description: `Zone update completed. Column ${firstCol}, Row ${firstRow} is updated.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right'
      });
    
      const newClickedZone = newZones.find(zone => zone.mapid === clickedZone.mapid);
  if (newClickedZone) {
    setClickedZone(newClickedZone);
  }
      console.log(clickedZone,'clickedZone')

    } else {
      toast({
        title: "Update Failed",
        description: "Something went wrong. Please try again.",
        status: "error",  // Changed from 'success' to 'error'
        duration: 5000,
        isClosable: true,
        position: "bottom-right"
      });
      console.error('Failed to update');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
    };




const handleEditMode = async e => {
  e.preventDefault();
  
  if (editMode) {
    updateFormData();
  }
  else {
    setEditedValues(clickedZone);

  }
  
  toggleEditMode();
};




const getBackgroundColor = (zone) => {
  if (clickedZone === zone || hoveredZone === zone) {
    return 'rgba(211, 211, 211, 0.7)';
  }

  const highestLevelForZone = highestLevels[zone.mapid];

  if (highestLevelForZone === 5) {
    return '#eac5c5';
  }

  if (highestLevelForZone <= 4 && highestLevelForZone >= 1) {
    return 'rgb(234, 228, 197)';
  }

  return '#D3D3D3';
};


  

     //////////////////////////////////////////////////////////////////////////////////////////////////
     //////////////////////////////////////////////////////////////////////////////////////////////////



     //////////////////////////////////////////////////////////////////////////////////////////////////
     /////////////////////////////////////  First Mount   /////////////////////////////////////////////
     //////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    async function fetchDataAndUpdateZones() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/storage_info/');
        const fetchedData = await response.json();
        // console.log(fetchedData,'fetched')
        console.log(fetchedData,'response')
  
        const newZones = zones.map(zone => {
          const updatedDataForZone = fetchedData.filter(data => data.mapid === zone.mapid);
          const levels = {};
        

          for (let i = 1; i <= 5; i++) {
            // Find the latest record for the current level
            const latestRecordForLevel = updatedDataForZone.find(data => data.level === i);
        
            if (latestRecordForLevel) {
              levels[i] = {
                product: latestRecordForLevel.product,
                product_name: latestRecordForLevel.product_name,
                lock: latestRecordForLevel.product === null ? false : latestRecordForLevel.lock,
                lab: latestRecordForLevel.product === null ? false : latestRecordForLevel.lab
              };
            }
          }
        
          return {
            ...zone,
            levels,
          };
        });
        
        setZones(newZones);
        
        console.log(newZones,'newzones')
        


      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    fetchDataAndUpdateZones();
  }, []); 


     //////////////////////////////////////////////////////////////////////////////////////////////////
     //////////////////////////////////////////////////////////////////////////////////////////////////

     useEffect(() => {
      if (zones) {
        const highestLevelsPerMapId = {};
    
        zones.forEach(zone => {
          const { mapid, levels } = zone;
    
          // Initialize this to 0 for each new zone
          let highestLevelForThisMapId = 0; 
    
          // If there is already a recorded highest level for this mapid, use that as a starting point
          if (highestLevelsPerMapId.hasOwnProperty(mapid)) {
            highestLevelForThisMapId = highestLevelsPerMapId[mapid];
          }
    
          if (levels) {
            Object.keys(levels).forEach(level => {
              const product = levels[level].product;
              const levelInt = parseInt(level, 10);
    
              if (product && levelInt > highestLevelForThisMapId) {
                highestLevelForThisMapId = levelInt;
              }
            });
          }
    
          highestLevelsPerMapId[mapid] = highestLevelForThisMapId;
        });
    
        setHighestLevels(highestLevelsPerMapId);
        console.log(highestLevels) // Update React state here
      }
    }, [zones]);
    
    

  
       //////////////////////////////////////////////////////////////////////////////////////////////////
     //////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    
    <div>

    <div  style={{
      display: 'flex',

      padding: '10px',
    }}>


      
    
    <div className='column' style={{
       flex: '3',  // this makes the map take up 3 parts of space
        marginRight: '2rem',
        position: 'relative' // space between the map and newCard
    }}>
  <div
  style={{
    width: '580px',
    height: '1380px',
    overflow: 'auto',
    boxShadow: '10px 10px rgba(0, 0, 0, 0.8)',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: '10px',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    paddingTop: '0.5rem',
    backgroundImage: `url(${Map_a})` , // Replace with your image path
    backgroundSize: 'cover', // Adjust as needed
    backgroundPosition: 'center', // Adjust as needed
  }}
>
   
   <Heading size='md' style={{ padding:'1rem'}} > Warehouse 113 : Zone A </Heading> 
   <Divider></Divider>
   
      {zones.map(zone => (
        <div
          key={zone.mapid}
          style={{
            position: 'absolute',
            left: `${zone.x}px`,
            top: `${zone.y}px`,
            width: zone.width || '35px',
            height: zone.height || '60px',
            border: ( clickedZone && clickedZone.mapid === zone.mapid) ? 'solid black 1px' : 'none',
            backgroundColor : getBackgroundColor(zone),
            textAlign: 'center',
      // Add background color when hovered
          }}
          onMouseEnter={() => handleZoneHover(zone.mapid)}
          onMouseLeave={() => setHoveredZone('')}
          onClick={() => handleZoneClick(zone.mapid)}
        > <label>{highestLevels[zone.mapid]}</label>
        </div>
      ))}




    </div>
    </div>

    

    <div className='column' style={{
      
       flex: '4 1 0%',  // this makes the newCard take up 1 part of space
      //  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  
      
      //  borderRadius: '5px',
      //  padding: '20px',

    }}>
      <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'  style={{ position:'sticky',  top: '50px',}}>


   <Card maxW='md' style={{ position: 'sticky', top: '50px' }} boxShadow="10px 10px rgba(0, 0, 0, 0.8)" >
   <form >
     

      <CardBody>
        <VStack
          divider={<StackDivider borderColor='gray.200' />}
          spacing={4}
          align='stretch'
        >
          <Heading size='md'>Side View</Heading>
          
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
   

  {['5','4','3','2','1'].map(level => (
  <HStack key={level}>
    <FormLabel w='25%'> {`Level ${level}`} </FormLabel>
    {editMode ? (
      <Box w='100%'>
         <HStack>
         <Input
            size="sm"
            name={level}
            ref={el => (inputRefs.current[level] = { ...inputRefs.current[level], product_name: el })}
            defaultValue={editedValues?.levels && editedValues.levels[level]?.product_name || ""}
            onKeyUp={() => handleKeyup(level)}
          />
          <Select 
      size="sm"
      w="60%"
      // ...other attributes and handlers
    >
      {products.map((product, index) => (
        <option key={index} value={product.name}>
          {product.name}
        </option>
      ))}
    </Select>

          <Checkbox
            ref={el => (inputRefs.current[level] = { ...inputRefs.current[level], lab: el })}
            defaultChecked={editedValues?.levels && editedValues.levels[level]?.lab}
            isDisabled={!checkboxEnabled[level]}
          >
            Lab
          </Checkbox>

          <Checkbox
            ref={el => (inputRefs.current[level] = { ...inputRefs.current[level], lock: el })}
            defaultChecked={editedValues?.levels && editedValues.levels[level]?.lock}
            isDisabled={!checkboxEnabled[level]}
          >
            Lock
          </Checkbox>
      </HStack>
      </Box>

    ) : (
      <Box w='100%' >
        <HStack  >
        <Input
          w = '60%'
          size='sm'
          name={level}
          // ref={inputRefs[level]}
          value={(hoveredZone?.levels && hoveredZone.levels[level].product_name) || 
            (clickedZone?.levels && clickedZone.levels[level].product_name) || 
            ''}
            
           
          readOnly
        />
        
        {(hoveredZone?.levels?.[level]?.lock || clickedZone?.levels?.[level]?.lock) && 
    <Tag variant='solid' colorScheme='red'>lock</Tag>
  }

  {(hoveredZone?.levels?.[level]?.lab || clickedZone?.levels?.[level]?.lab) && 
    <Tag>lab</Tag>
  }
        </HStack>
      </Box>
    )}
  </HStack>
))}


          <Text style={{textAlign:'center'}}>Ground</Text>
        </VStack>
      </CardBody>
      <Divider />
      <CardFooter>
      {clickedZone ? (
  <ButtonGroup spacing='2'>
    <Button variant='solid' colorScheme='blue' onClick={handleEditMode} >
      {editMode ? 'Save' : 'Edit'}
    </Button>
    <Button variant='ghost' colorScheme='blue' onClick={handleCancelClick}>
      Cancel
    </Button>
  </ButtonGroup>
) : (
  <ButtonGroup spacing='2'>
    <Button variant='solid' colorScheme='blue' isDisabled>
      Edit
    </Button>
    <Button variant='ghost' colorScheme='blue' isDisabled>
      Cancel
    </Button>
  </ButtonGroup>
)}


        
      </CardFooter>
      </form>
    </Card>
</SimpleGrid>

</div>


    
    </div>


    </div>
  );
};

export default MapComponent_1;
