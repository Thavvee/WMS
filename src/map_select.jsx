import React, { useState ,useEffect, useRef } from 'react';
import { Badge, Wrap,WrapItem,Flex, Card, CardHeader, CardBody, CardFooter,Text,Heading,Stack,StackDivider,Box,Divider,ButtonGroup,Button,Image} from '@chakra-ui/react'
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
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { Grid,GridItem} from '@chakra-ui/react'
import { IoMdCheckmark } from "react-icons/io";
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
import Map_a from '../public/assets/img/map_w113.png';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { productListState, productSelectedState, zoneSelectedState } from './Atoms';
import { fetchProductList } from './Selectors';
import  {zone_113a, colname_113a} from './zones/113/zone_113a.js'
import { useRecoilState } from 'recoil';

const Map_select = () => {


  ///// product table //////
  const setProductList = useSetRecoilState(productListState);
  const products = useRecoilValue(fetchProductList);
  /////////////////////////
  const [productSelected, setProductSelected] = useRecoilState(productSelectedState);
  const [zoneSelected, setZoneSelected] = useRecoilState(zoneSelectedState);
  const toast = useToast();
  const [zone_v, setZone_v] = useState(colname_113a);
  //// zone attr /////
  const [hoveredZone, setHoveredZone] = useState('');
  const [multiclickedZone, setmultiClickedZone] = useState([]);
  const [clickedZone, setClickedZone] = useState('');
  const [tagClicked,setTagClicked] = useState('');
  const [editMode, setEditMode] = useState(false);
  ////////////////////
  const [showAlternateCard, setShowAlternateCard] = useState(false);

  ///// data init /////
  const initialLevelState = {
    product: '',
    lock: false,
    lab: false,
  };
  const [multizoneState, setmultizoneState] = useState({
    productInput: "",
    isLabChecked: false,
    isLockChecked: false,
    isDisabled: true
  });

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
 const [isDisabled, setIsDisabled] = useState(true);

 useEffect(() => {
  if (productSelected) {
    setmultizoneState(prevState => ({
      ...prevState,
      productInput: productSelected.id // or productSelected.id if you just want the ID
    }));
  }
}, [productSelected]);

const handleKeyUp = (e) => {
  const newProductInput = e.target.value;
  const isInputEmpty = newProductInput === '';

  setmultizoneState({
    ...multizoneState,
    productInput: newProductInput,
    isDisabled: isInputEmpty,
    isLabChecked: isInputEmpty ? false : multizoneState.isLabChecked,
    isLockChecked: isInputEmpty ? false : multizoneState.isLockChecked
  });
};


const toggleLabChecked = () => {
  setmultizoneState({
    ...multizoneState,
    isLabChecked: !multizoneState.isLabChecked
  });
};

const toggleLockChecked = () => {
  setmultizoneState({
    ...multizoneState,
    isLockChecked: !multizoneState.isLockChecked
  });
};

 ///////////// zones attr ///////////////
  const handleZoneHover = (zoneId) => {
    const hoveredZone = zones.find(item => item.mapid === zoneId);
   
      setHoveredZone(hoveredZone);


  };
  const handleTagClose = (zoneToRemove) => {
    setmultiClickedZone(prevClickedZones => {
      const newZones = prevClickedZones.filter(zone => zone !== zoneToRemove);
      return newZones;
    });
  };

  
  useEffect(() => {
    // ทำงานเมื่อ multiclickedZone ถูกอัปเดต
    if (multiclickedZone.length === 1) {
      const singleZoneId = multiclickedZone[0].toString();
      const singleClickedZone = zones.find(item => item.mapid === singleZoneId);
      setClickedZone(singleClickedZone);
    } else if (multiclickedZone.length < 1) {
      setClickedZone(null);
    } else {
      setClickedZone(clickedZone);
    }
  }, [multiclickedZone, zones, clickedZone]);

  useEffect(() =>{
    console.log(tagClicked)
  },[tagClicked] )
  
  const handleTagClick = (zoneId) => {
    const tagclicked = zones.find(item => item.mapid === zoneId);
    setTagClicked(tagclicked)
  
  }
  const handleZoneClick = (zoneId) => {
    if (zoneId === null) {
      setClickedZone(null);
      return;
    }
    console.log(zoneId)
    const zone_mapid = parseInt(zoneId);
    const clickedZone = zones.find(item => item.mapid === zoneId);
    
    // ตรวจสอบว่า clickedZone เป็นโซนเดียวกับที่ถูกคลิกก่อนหน้านี้หรือไม่


    const isAlreadyClicked = multiclickedZone.some(zone => zone === zone_mapid.toString());
    
    if (isAlreadyClicked) {
      setmultiClickedZone(prevClickedZones => {
        const newZones = prevClickedZones.filter(zone => zone !== zone_mapid.toString());
        return newZones;
      });
    } else {
      setmultiClickedZone(prevClickedZones => [...prevClickedZones, zone_mapid.toString()]);
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
    setTagClicked(null)
    setmultizoneState({
      productInput: "",
      isLabChecked: false,
      isLockChecked: false,
      isDisabled: true
    });
    
  };

  const handleTagCancel = () => {
    setTagClicked(null)
  }

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


const createpayloadmultizone = (zones_filter,defaultLevels) => {
    return zones_filter.flatMap(zone => {
      return Object.keys(defaultLevels).map(level => {
        const levels_data = defaultLevels[level];
        const productId = getProductIdByName(levels_data.product);
        return {
          zone: zone.zone,
          column: zone.col,
          row: zone.row,
          mapid: zone.mapid,
          level: parseInt(level),
          lab: levels_data.lab,
          lock: levels_data.lock,
          product: productId,
        };
      });
    });
    
};


const createpayloadsinglezone = (newFormdata) => {
  return Object.keys(newFormdata).map(level => {
    const { product,lab,lock} = newFormdata[level];
    const productID = getProductIdByName(product);
    return {
      zone: clickedZone.zone,
      column: clickedZone.col,
      row: clickedZone.row,
      mapid: clickedZone.mapid,
      level: parseInt(level),
      lab,
      lock,
      product: productID,
    };
  });

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

useEffect(() =>{
  console.log(zoneSelected,'zoneSelected')
},[zoneSelected])

const updateFormData = async () => {
  let payload
  if (showAlternateCard) {
      const zones_filter = zones.filter(zone => multiclickedZone.includes(zone.mapid));
      const defaultLevels = {
        1: { product: multizoneState.productInput, lab: multizoneState.isLabChecked, lock: multizoneState.isLockChecked },
        2: { product: multizoneState.productInput, lab: multizoneState.isLabChecked, lock: multizoneState.isLockChecked },
        3: { product: multizoneState.productInput, lab: multizoneState.isLabChecked, lock: multizoneState.isLockChecked },
        4: { product: multizoneState.productInput, lab: multizoneState.isLabChecked, lock: multizoneState.isLockChecked },
        5: { product: multizoneState.productInput, lab: multizoneState.isLabChecked, lock: multizoneState.isLockChecked },

        // ...
      };
        payload = createpayloadmultizone(zones_filter,defaultLevels)
        setZoneSelected(payload)
       
    } 

  else {
      const newFormData = { ...formData };

      Object.keys(inputRefs.current).forEach((level) => {
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

  // Update formData state
          payload = createpayloadsinglezone(newFormData)
    }
    /////////////////////////

    const invalidProducts = payload.filter(item => item.product === "INVALID_PRODUCT_NAME");

    if (invalidProducts.length > 0) {
      const invalidProductNames = invalidProducts.map(item => item.product).join(', ');
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: `Invalid product names detected: ${invalidProductNames}. Update cancelled.`,
      });
      return false; // ส่งค่า false กลับไปยัง handleEditMode
    }
  try {
    const response = await fetch('http://127.0.0.1:8000/api/storage_info_bulk/', {
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
      setmultizoneState({
        productInput: "",
        isLabChecked: false,
        isLockChecked: false,
        isDisabled: true
      });
      const firstRow = updatedZoneDataArray[0]?.row;
      const firstCol = updatedZoneDataArray[0]?.column;

      toast({
        title: 'Update Successfully',
        description: `Zone update completed. W113 is updated.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right'
      });
      return true;

    } 
    // จัดการกับ response ตามที่คุณต้องการ
    // ...

  } catch (error) {
    console.error('An error occurred:', error);
  }
};




const handleEditMode = async e => {
  e.preventDefault();
  
  let updateSuccessful = true;  // ตั้งค่าเริ่มต้นเป็น true
  
  if (editMode) {
    updateSuccessful = await updateFormData();


      // รับค่าที่ส่งกลับ
  } else {
    setEditedValues(clickedZone);
  }
  
  if (updateSuccessful) {  // เทียบเท่ากับ true
    toggleEditMode(); // สลับ editMode ถ้า update สำเร็จ
  }
};




const getBackgroundColor = (zone) => {
  if ( hoveredZone === zone) {
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
       <Grid
  h='50rem'
  templateRows='repeat(2, 1fr)'
  templateColumns='repeat(5, 1fr)'
  gap={4}
>



<GridItem rowSpan={2} colSpan={3}>  


{isLoading ? (
        <Skeleton height="100%" />
      ) : (

          <Box p='5' maxW='100%' style={{ height: '100%', overflow: 'auto' }} bg='white'>
            <Heading >Warehouse 113 </Heading>
<Divider m='2' />
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
                backgroundImage: `url(${Map_a})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
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
                    border: multiclickedZone.includes(zone.mapid) ? 'solid black 1px' : 'none',
                    backgroundColor: getBackgroundColor(zone),
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                  }}
                  onMouseEnter={() => handleZoneHover(zone.mapid)}
                  onMouseLeave={() => setHoveredZone('')}
                  onClick={() => handleZoneClick(zone.mapid)}
                >
                  <label>{highestLevels[zone.mapid]}</label>
                  {multiclickedZone.includes(zone.mapid) && (
                  <IoMdCheckmark />)}
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
    
                  <GridItem colSpan={2} rowSpan={1} bg='white' >


        

   <Card  overflow='auto'>
   <form >
     <CardHeader>
      <Heading size='lg' > Edit </Heading>
     </CardHeader>

      <CardBody  >

 
         <VStack
         
         spacing={2}
         align='stretch'
       >
         <Heading size='md'>Multiplezone</Heading>
         <Divider color={'gray'}/>
 
  
        <Box>
        <Text fontSize='md' > Mapid</Text>
        <Box p='4' w='100%' minH='10rem' border='1px solid lightgray' borderRadius={5}>
        <SimpleGrid columns={5} spacing={1} >
  {multiclickedZone.map((zone, index) => (
    <Box >
    <Tag
      size='sm'
      borderRadius='full'
      variant='solid'
      colorScheme='green'
      key={index}
      onClick={() => handleTagClick(zone)}
       // ถ้าคุณต้องการเพิ่ม spacing ระหว่างบรรทัด
    >
      <TagLabel>{zone}</TagLabel>
      <TagCloseButton onClick={() => handleTagClose(zone)} />
    </Tag>
    </Box>
  ))}
</SimpleGrid>
</Box>
</Box>

    <Box>
       {productSelected ? (
        <>
        <Box p='1'm='auto'>
              <Text fontSize='md' > Product</Text>
              <Input
  list="products"
  size='sm'
  value={productSelected.id}
  readOnly
/>

<HStack spacing={5}>
<Checkbox  onChange={toggleLabChecked}>
  Lab
</Checkbox>

<Checkbox  onChange={toggleLockChecked}>
  Lock
</Checkbox>

</HStack>
</Box>

             </>
              
       ): (
      
        <span>โปรดเลือกชนิดสินค้า</span>

  
       )}
     
     </Box>
       
          </VStack>




      </CardBody>
      <Divider />
      <CardFooter>
     
     {productSelected ? (
  <ButtonGroup spacing='2'>
    <Button variant='solid' colorScheme='blue' onClick={handleEditMode} >
      {editMode ? 'Save' : 'Edit'}
    </Button>
    <Button variant='ghost' colorScheme='blue' onClick={handleCancelClick}>
      Cancel
    </Button>
  </ButtonGroup> ) : (

<ButtonGroup spacing='2'>

</ButtonGroup>

  )}



        
      </CardFooter>
      </form>
    </Card>




</GridItem>
<GridItem rowSpan={1} colSpan={2} bg = 'white' >

<VStack
        divider={<StackDivider borderColor='gray.200' />}
        spacing={1}
        align='stretch'
      >
        <Heading size='sm' >Side View</Heading>
        
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
<HStack key={level} textAlign='center' >
  <Text fontSize='md' w='20%'> {`Level ${level}`} </Text>
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
  (tagClicked?.levels?.[level]?.product_name) || 
  ''
}
readOnly
/>
  <Checkbox name={level} defaultChecked isDisabled={!tagClicked}> </Checkbox>
      
      {(hoveredZone?.levels?.[level]?.lock || tagClicked?.levels?.[level]?.lock) && 
  <Badge colorScheme='red'>lock</Badge>
}

{(hoveredZone?.levels?.[level]?.lab || tagClicked?.levels?.[level]?.lab) && 
  <Badge variant='outline' colorScheme='green' >lab</Badge>
}
      </HStack>
    </Box>
  )}
</HStack>
))}


        <Text style={{textAlign:'center'}}>Ground</Text>
     
        <ButtonGroup spacing='2'>
    <Button variant='solid' colorScheme='blue' onClick={handleEditMode} >
      Save
    </Button>
    <Button variant='ghost' colorScheme='blue' onClick={handleTagCancel}>
      Cancel
    </Button>
  </ButtonGroup>
      </VStack>

</GridItem>
    


    </Grid>
    </div>
  );
};

export default Map_select;
