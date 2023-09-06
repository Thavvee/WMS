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
import Swal from 'sweetalert2';
import { Grid,GridItem} from '@chakra-ui/react'
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
import  {zone_113a, colname_113a} from './zones/113/zone_113a.js'
import { useRecoilState } from 'recoil';


const Map_test = () => {


  ///// product table //////
  const setProductList = useSetRecoilState(productListState);
  const products = useRecoilValue(fetchProductList);
  /////////////////////////

  const toast = useToast();
  const [zone_v, setZone_v] = useState(colname_113a);
  //// zone attr /////
  const [hoveredZone, setHoveredZone] = useState('');
  const [multiclickedZone, setmultiClickedZone] = useState([]);
  const [clickedZone, setClickedZone] = useState('');
  const [editMode, setEditMode] = useState(false);
  ////////////////////
  const [showAlternateCard, setShowAlternateCard] = useState(false);

  ///// data init /////
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
  const [zones, setZones] = useRecoilState(zone_113a);
  
  const inputRefs = useRef({
    1: { product: null, lock: null, lab: null },
    2: { product: null, lock: null, lab: null },
    3: { product: null, lock: null, lab: null },
    4: { product: null, lock: null, lab: null },
    5: { product: null, lock: null, lab: null }
  });
  

  const [checkboxEnabled, setCheckboxEnabled] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
  });

 //////////////////



 ///////////// zones attr ///////////////
  const handleZoneHover = (zoneId) => {
    const hoveredZone = zones.find(item => item.mapid === zoneId);
    if (!clickedZone) {
      setHoveredZone(hoveredZone);
    }

  };

  const handleZoneClick = (zoneId) => {
    if (zoneId === null) {
      setClickedZone(null);
      return;
    }
  
    const clickedZone = zones.find(item => item.mapid === zoneId);
    console.log('click', zoneId, clickedZone);
    
    // ถ้า clickedZone ที่ใหม่นั้นเหมือนกับ clickedZone ที่เก่า, ยกเลิกการเลือก

      setClickedZone(clickedZone);
      const isAlreadyClicked = multiclickedZone.some(zone => zone.mapid === zoneId);

      if (isAlreadyClicked) {
        // ถ้าถูกคลิกแล้ว ลบจาก array
        setmultiClickedZone(prevClickedZones => prevClickedZones.filter(zone => zone.mapid !== zoneId));
      } else {
        // ถ้ายังไม่ถูกคลิก ให้เพิ่มเข้าไปใน array
        setmultiClickedZone(prevClickedZones => [...prevClickedZones, clickedZone.mapid]);
      }

  
    setHoveredZone(null);
  };
  
  useEffect(() => {
    console.log(multiclickedZone,'multiZone')
    if (multiclickedZone.length > 1) {
      setShowAlternateCard(true);
    }
    else {
      setShowAlternateCard(false);
    }
    console.log(showAlternateCard,'window')
  }, [multiclickedZone]);

  const handleCancelClick = () => {
    setClickedZone(null);
    setHoveredZone(null);
    setEditMode(false);
    setEditedValues({});
    setShowAlternateCard(false);
    setmultiClickedZone([]);
  };

////////////////////////////////////////



   //////////////////////////////////////////////////////////////////////////////////////////////////
   /////////////////////////////////////   Handle Submit Form   /////////////////////////////////////
   //////////////////////////////////////////////////////////////////////////////////////////////////


//////// สำหรับตั้งค่า checkbox ที่มาจากการ fetch //////////////
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
////////////////////////////////////



///////// checkbox  สำหรับการพิมพ์ใหม่ /////////////////

const handleKeyup = (level) => {
    const productValue = inputRefs.current[level]?.product?.value;
    if (productValue) {
      setCheckboxEnabled(prev => ({ ...prev, [level]: true }));
    } else {
      setCheckboxEnabled(prev => ({ ...prev, [level]: false }));
    }
  };
/////////////////////////////

  
/////////// จัดการหน้า edit ///////////
const toggleEditMode = () => {
  setEditMode(prevEditMode => !prevEditMode);
};
///////////////////////
function getProductIdByName(productName) {
  // Check if productName is blank
  if (!productName) {
    return null;
  }

  // Find the product based on its name
  const product = products.find(item => item.name === productName);

  // Check if the product was found
  if (product) {
    return product['id'];
  } else {
    return "INVALID_PRODUCT_NAME"
  }
}


////////////// HANDLE SUBMIT ////////////////////////////// HANDLE SUBMIT ////////////////////////////// HANDLE SUBMIT ////////////////////////////// HANDLE SUBMIT ////////////////
////////////// HANDLE SUBMIT ////////////////////////////// HANDLE SUBMIT ////////////////////////////// HANDLE SUBMIT ////////////////////////////// HANDLE SUBMIT ////////////////


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
    const productId = getProductIdByName(levelData.product);
  
    return {
      zone: clickedZone.zone,
      column: clickedZone.col,
      row: clickedZone.row,
      mapid: clickedZone.mapid,
      level: parseInt(level),
      lab: levelData.lab,  // Use the lab value from formData
      lock: levelData.lock,  // Use the lock value from formData
      product: productId,  // Use the product value from formData
    };
  });
  const invalidProductNames = payload.some(item => item.product === "INVALID_PRODUCT_NAME");
  if (invalidProductNames) {
    Swal.fire({
      icon: 'error',
      title: 'Update Failed',
      text: 'Invalid product names detected. Update cancelled.',
    });
    return false; // ส่งค่า false กลับไปยัง handleEditMode
  }
  
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
              product_name: data.product_name,
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
  return true;
    };




const handleEditMode = async e => {
  e.preventDefault();
  
  let updateSuccessful = true;  // ตั้งค่าเริ่มต้นเป็น true
  
  if (editMode) {
    updateSuccessful = await updateFormData();  // รับค่าที่ส่งกลับ
  } else {
    setEditedValues(clickedZone);
  }
  
  if (updateSuccessful) {  // เทียบเท่ากับ true
    toggleEditMode(); // สลับ editMode ถ้า update สำเร็จ
  }
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


     const [isLoading, setIsLoading] = useState(true);

     //////////////////////////////////////////////////////////////////////////////////////////////////
     /////////////////////////////////////  First Mount   /////////////////////////////////////////////
     //////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    async function fetchDataAndUpdateZones() {
      setIsLoading(true);
      try {
         setProductList(products);
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
      setIsLoading(false);
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
    
    
    const lastAddedMapId = multiclickedZone.length > 0 ? multiclickedZone[multiclickedZone.length - 1].mapid : null;
  
       //////////////////////////////////////////////////////////////////////////////////////////////////
     //////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    
    <div>
        <Box mb='2' height='auto'>
      <Heading size='md' style={{ padding: '1rem' }}>Warehouse 113 </Heading>
      <Divider />
    </Box>
       <Grid
  h='55rem'
  templateRows='repeat(2, 1fr)'
  templateColumns='repeat(5, 1fr)'
  gap={4}
>



<GridItem rowSpan={2} colSpan={4}>  

{isLoading ? (
        <div>Loading...</div>
      ) : (

          <Box style={{ height: '90%', overflow: 'auto' }}>
            <div
              style={{
                width: '2080px',
                height: '2080px',
                position: 'relative',
                boxShadow: '10px 10px rgba(0, 0, 0, 0.8)',
                backgroundColor: 'white',
                borderRadius: '10px',
                paddingLeft: '2rem',
                paddingRight: '2rem',
                paddingTop: '0.5rem',
              }}
            >
              {zones.map((zone) => (
                <div
                  key={zone.mapid}
                  style={{
                    position: 'absolute',
                    left: `${zone.x}px`,
                    top: `${zone.y}px`,
                    width: zone.width || '35px',
                    height: zone.height || '60px',
                    border: (clickedZone && clickedZone.mapid === zone.mapid || multiclickedZone.includes(zone.mapid)) ? 'solid black 1px' : 'none',
                    backgroundColor: getBackgroundColor(zone),
                    textAlign: 'center',
                  }}
                  onMouseEnter={() => handleZoneHover(zone.mapid)}
                  onMouseLeave={() => setHoveredZone('')}
                  onClick={() => handleZoneClick(zone.mapid)}
                >
                  <label>{highestLevels[zone.mapid]}</label>
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
            </div>
          </Box>

      )}
  

                  </GridItem>
    
                  <GridItem colSpan={1} rowSpan={1} bg='white' overflow='auto'>

      <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'  style={{ position:'sticky',  top: '50px',}}>


   <Card maxW='md' style={{ position: 'sticky', top: '50px' }} boxShadow="10px 10px rgba(0, 0, 0, 0.8)" >
   <form >
     

      <CardBody>

      {showAlternateCard ? (
       <h1> hello </h1>
      ) : ( 
        <VStack
        divider={<StackDivider borderColor='gray.200' />}
        spacing={1}
        align='stretch'
      >
        <Heading size='md' textAlign='center'>Side View</Heading>
        
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
  <Text fontSize='md' w='20%'> {`L.${level}`} </Text>
  {editMode ? (
    <Box w='100%'>
       <HStack>
       <Input
       list="products"
          size="sm"
          name={level}
          ref={el => (inputRefs.current[level].product = el)}
          defaultValue={editedValues?.levels && editedValues.levels[level]?.product_name || ""}
          onKeyUp={() => handleKeyup(level)}
          autocomplete="off"
        />
         <datalist id="products">
{products.map((product) => (
  <option key={product.id} value={product.name} />
))}
</datalist>

        <Checkbox
          ref={el => (inputRefs.current[level].lab = el)}
          defaultChecked={editedValues?.levels && editedValues.levels[level]?.lab}
          isDisabled={!checkboxEnabled[level]}
        >
          Lab
        </Checkbox>

        <Checkbox
          ref={el => (inputRefs.current[level].lock = el)}
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
w='60%'
size='sm'
name={level}
value={
  (hoveredZone?.levels?.[level]?.product_name) || 
  (clickedZone?.levels?.[level]?.product_name) || 
  ''
}
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

      )}
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



</GridItem>
<GridItem rowSpan={1} colSpan={1} bg = 'tomato' h='80%'></GridItem>
    


    </Grid>
    </div>
  );
};

export default Map_test;
