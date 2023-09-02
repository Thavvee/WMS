import React, { useState ,useEffect, useRef } from 'react';

import { Card, CardHeader, CardBody, CardFooter,Text,Heading,Stack,StackDivider,Box,Divider,ButtonGroup,Button,Image} from '@chakra-ui/react'
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



const MapComponent_1 = () => {


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
   <div style={{  width: '580px', height: '1380px', overflow: 'auto', boxShadow: '10px 10px rgba(0, 0, 0, 0.8)',backgroundColor: 'white' ,justifyContent:'center', borderRadius:'10px',paddingLeft:'2rem',paddingRight:'2rem',paddingTop:'0.5rem'}}> {/* Adjust width and height as needed */}
   

    </div>
    </div>

    

    <div className='column' style={{
      
       flex: '4 1 0%',  // this makes the newCard take up 1 part of space
      //  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  
      
      //  borderRadius: '5px',
      //  padding: '20px',

    }}>
      

</div>


    
    </div>


    </div>
  );
};

export default MapComponent_1;
