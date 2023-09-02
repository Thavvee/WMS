import React from 'react';
import { Heading,Stack } from '@chakra-ui/react'

function PageNotFound() {
    return (
      <div style={{textAlign:'center'}}>
        <Stack spacing={8}>
  <Heading as='h1' size='4xl'>
    404 Page not found !
  </Heading>
  <Heading as='h2' size='3xl'>
   404 Page not found !
  </Heading>
  <Heading as='h2' size='2xl'>
 404 Page not found !
  </Heading>
  <Heading as='h2' size='xl'>
  404 Page not found !
  </Heading>
  <Heading as='h3' size='lg'>
   404 Page not found !
  </Heading>
  <Heading as='h4' size='md'>
   404 Page not found !
  </Heading>
  <Heading as='h5' size='sm'>
    404 Page not found !
  </Heading>
  <Heading as='h6' size='xs'>
    404 Page not found !
  </Heading>
</Stack>
      </div>
    );
  }

export default PageNotFound