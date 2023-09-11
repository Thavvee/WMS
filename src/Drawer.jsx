import React, { useState } from 'react';
import {
  Input,
  Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    TableContainer,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,  
  } from '@chakra-ui/react'

  function DrawerExample({ isOpen, onClose, btnRef, handleProductSelect })  {


    return (
      <Drawer size={'lg'} isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Job List</DrawerHeader>
          <DrawerBody>
          <TableContainer >
    <Table variant='simple'>
      <TableCaption>Imperial to metric conversion factors</TableCaption>
      <Thead>
        <Tr>
          <Th>Product info</Th>
          <Th>from</Th>
          <Th >to</Th>
          <Th isNumeric>Pallet</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Product1</Td>
          <Td>XXX</Td>
          <Td >HS7</Td>
          <Td isNumeric> 40</Td>
          <Td><Button onClick={() => handleProductSelect({ id: 'Product1', from: 'XXX', to: 'HS7', pallet: 40 })}>
      Select Product
    </Button>
    </Td>
        </Tr>
        <Tr >
        <Td>ZCA123000008xxx</Td>
          <Td>XXX</Td>
          <Td >HS8</Td>
          <Td isNumeric> 40</Td>
          <Td><Button onClick={() => handleProductSelect({ id: 'ZCA123000008xxx', from: 'XXX', to: 'HS7', pallet: 40 })}>
      Select Product
    </Button>
    </Td>
          
        </Tr>
        <Tr>
        <Td>ZCA123000008xxx</Td>
          <Td>XXX</Td>
          <Td >HS9</Td>
          <Td isNumeric>  40</Td>
          <Td><Button onClick={() => handleProductSelect({ id: 'ZCA123000008xxx', from: 'XXX', to: 'HS7', pallet: 40 })}>
      Select Product
    </Button>
    </Td>
        </Tr>
        <Tr>
        <Td>ZCA123000008xxx</Td>
          <Td>XXX</Td>
          <Td >HS9</Td>
          <Td isNumeric>  40</Td>
          <Td><Button onClick={() => handleProductSelect({ id: 'ZCA123000008xxx', from: 'XXX', to: 'HS7', pallet: 40 })}>
      Select Product
    </Button>
    </Td>
        </Tr>
        <Tr>
        <Td>ZCA123000008xxx</Td>
          <Td>XXX</Td>
          <Td >HS9</Td>
          <Td isNumeric>  40</Td>
          <Td><Button onClick={() => handleProductSelect({ id: 'ZCA123000008xxx', from: 'XXX', to: 'HS7', pallet: 40 })}>
      Select Product
    </Button>
    </Td>
        </Tr>
        <Tr>
        <Td>ZCA123000008xxx</Td>
          <Td>XXX</Td>
          <Td >HS9</Td>
          <Td isNumeric>  40</Td>
          <Td><Button onClick={() => handleProductSelect({ id: 'ZCA123000008xxx', from: 'XXX', to: 'HS7', pallet: 40 })}>
      Select Product
    </Button>
    </Td>
        </Tr>
      </Tbody>
      
    </Table>
  </TableContainer>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
  
export default DrawerExample;  