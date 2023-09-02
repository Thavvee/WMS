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
import Map_a from '../public/assets/img/113a.png';
// const ZoneModal_1 = ({ zone, onClose, onUpdateInfo }) => {

//   const [state, setState] = useState({ 
//     warehouse: zone.warehouse, 
//     zone: zone.zone, 
//     col: zone.col, 
//     x: zone.row, 
//     y: '', 
//     type: '' 
//   });

  
//   const handleChange = e => {
//     setState({ ...state, [e.target.name]: e.target.value });
//   };
  

//   const handleSubmit = e => {
//     e.preventDefault();
//     fetch('http://127.0.0.1:8000/api/storage/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(state),
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);

//       onClose();
//       // handle success
//     })
//     .catch(error => {
//       console.log(error);
//       // handle error
//     });
//   };
  

//   return (
//     <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.30)', padding: '20px' }}>
//       {zone.name}
//       <div className="form-group d-md-flex">
//         <form onSubmit={handleSubmit}>
//       <label>Warehouse: <input required className='form-control' type='text' name="warehouse" value={zone.warehouse} onChange={handleChange}/></label>
//       <label>Zone:<input required className='form-control' type='text' name="zone" value={zone.zone} onChange={handleChange}/> </label>
//       <input required className='form-control' type='text' name="column" value={zone.col} onChange={handleChange}/> 
//       <input required className='form-control' type='text' name="x" value={zone.row} onChange={handleChange}/> 
//       <input required className='form-control' type='text' name="y" value={state.y} onChange={handleChange}/> 
//       <input required className='form-control' type='text' name="type" value={state.type} onChange={handleChange}/>
//           {/* <textarea
//             style={{ width: '20rem', height: '10rem', margin: '20px' }}
//             name="info"
//             value={formData.info}
//             onChange={handleFormChange}
//           /> */}
//           <button type="submit" className="form-control btn btn-primary submit ">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

const MapComponent_1 = () => {
  const [hoveredZone, setHoveredZone] = useState('');
  const [clickedZone, setClickedZone] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState({});
  const [data, setData] = useState({});


  const [product, setProduct] = useState({});

  
  const [zones, setZones] = useState([



    {  x: 50, y: 100,col:'55',row:'1',warehouse: '113',zone:'A',mapid:'551',highestL:'0'},
    {  x: 90, y: 100,col:'55',row:'2',warehouse: '113',zone:'A',mapid:'552',highestL:'0'},
    {  x: 130, y: 100,col:'55',row:'3',warehouse: '113',zone:'A',mapid:'553',highestL:'0'},
    {  x: 170, y: 100,col:'55',row:'4',warehouse: '113',zone:'A',mapid:'554',highestL:'0'},
    {  x: 210, y: 100,col:'55',row:'5',warehouse: '113',zone:'A',mapid:'555',highestL:'0'},
    {  x: 250, y: 100,col:'55',row:'6',warehouse: '113',zone:'A',mapid:'556',highestL:'0'},


    {  x: 50, y: 170,col:'56',row:'1',warehouse: '113',zone:'A',mapid:'561',highestL:'0'},
    {  x: 90, y: 170,col:'56',row:'2', name: 'Zone 8', info: 'Information about Zone B',warehouse: '113',zone:'A',mapid:'562',highestL:'0' },
    {  x: 130, y: 170,col:'56',row:'3', name: 'Zone 9', info: 'Information about Zone C' ,warehouse: '113',zone:'A',mapid:'563',highestL:'0'},
    {  x: 170, y: 170,col:'56',row:'4', name: 'Zone 10', info: 'Information about Zone D',warehouse: '113',zone:'A',mapid:'564',highestL:'0' },
    {  x: 210, y: 170,col:'56',row:'5', name: 'Zone 11', info: 'Information about Zone E',warehouse: '113',zone:'A',mapid:'565',highestL:'0' },
    {  x: 250, y: 170,col:'56',row:'6', name: 'Zone 12', info: 'Information about Zone F',warehouse: '113',zone:'A',mapid:'566',highestL:'0' },
    {  x: 290, y: 170,col:'56',row:'7', name: 'Zone 13', info: 'Information about Zone G',warehouse: '113',zone:'A',mapid:'567',highestL:'0' },
    // {  x: 290, y: 170,col:'56',row:'7', name: 'Zone 13', info: 'Information about Zone G',warehouse: '113',zone:'A',mapid:'568',highestL:'0' },

    {  x: 50, y: 240,col:'57',row:'1', name: 'Zone A', info: 'Information about Zone A' ,warehouse: '113',zone:'A',mapid:'571',highestL:'0' },
    {  x: 90, y: 240,col:'57',row:'2', name: 'Zone B', info: 'Information about Zone B' ,warehouse: '113',zone:'A',mapid:'572',highestL:'0' },
    {  x: 130, y: 240,col:'57',row:'3', name: 'Zone C', info: 'Information about Zone C' ,warehouse: '113',zone:'A',mapid:'573',highestL:'0' },
    {  x: 170, y: 240,col:'57',row:'4', name: 'Zone D', info: 'Information about Zone D' ,warehouse: '113',zone:'A',mapid:'574',highestL:'0' },
    {  x: 210, y: 240,col:'57',row:'5', name: 'Zone E', info: 'Information about Zone E' ,warehouse: '113',zone:'A',mapid:'575',highestL:'0' },
    {  x: 250, y: 240,col:'57',row:'6', name: 'Zone F', info: 'Information about Zone F' ,warehouse: '113',zone:'A',mapid:'576',highestL:'0' },
    {  x: 290, y: 240,col:'57',row:'7', name: 'Zone G', info: 'Information about Zone G' ,warehouse: '113',zone:'A',mapid:'577',highestL:'0' },
    {  x: 330, y: 240,col:'57',row:'8', name: 'Zone H', info: 'Information about Zone H' ,warehouse: '113',zone:'A',mapid:'578',highestL:'0' },

    {  x: 50, y: 310,col:'58',row:'1', name: 'Zone A', info: 'Information about Zone A' ,warehouse: '113',zone:'A',mapid:'581',highestL:'0' },
    {  x: 90, y: 310,col:'58',row:'2', name: 'Zone B', info: 'Information about Zone B' ,warehouse: '113',zone:'A',mapid:'582',highestL:'0' },
    {  x: 130, y: 310,col:'58',row:'3', name: 'Zone C', info: 'Information about Zone C' ,warehouse: '113',zone:'A',mapid:'583',highestL:'0' },
    {  x: 170, y: 310,col:'58',row:'4', name: 'Zone D', info: 'Information about Zone D' ,warehouse: '113',zone:'A',mapid:'584',highestL:'0' },
    {  x: 210, y: 310,col:'58',row:'5', name: 'Zone E', info: 'Information about Zone E' ,warehouse: '113',zone:'A',mapid:'585',highestL:'0' },
    {  x: 250, y: 310,col:'58',row:'6', name: 'Zone F', info: 'Information about Zone F' ,warehouse: '113',zone:'A',mapid:'586',highestL:'0' },
    {  x: 290, y: 310,col:'58',row:'7', name: 'Zone G', info: 'Information about Zone G' ,warehouse: '113',zone:'A',mapid:'587',highestL:'0' },
    {  x: 330, y: 310,col:'58',row:'8', name: 'Zone H', info: 'Information about Zone H' ,warehouse: '113',zone:'A',mapid:'588',highestL:'0' },
    {  x: 370, y: 310,col:'58',row:'9', name: 'Zone H', info: 'Information about Zone H' ,warehouse: '113',zone:'A',mapid:'589',highestL:'0' },

    {  x: 50, y: 380,col:'59',row:'1', name: 'Zone A', info: 'Information about Zone A' ,warehouse: '113',zone:'A',mapid:'591',highestL:'0' },
    {  x: 90, y: 380,col:'59',row:'2', name: 'Zone B', info: 'Information about Zone B' ,warehouse: '113',zone:'A',mapid:'592',highestL:'0' },
    {  x: 130, y: 380,col:'59',row:'3', name: 'Zone C', info: 'Information about Zone C' ,warehouse: '113',zone:'A',mapid:'593',highestL:'0' },
    {  x: 170, y: 380,col:'59',row:'4', name: 'Zone D', info: 'Information about Zone D' ,warehouse: '113',zone:'A',mapid:'594',highestL:'0' },
    {  x: 210, y: 380,col:'59',row:'5', name: 'Zone E', info: 'Information about Zone E' ,warehouse: '113',zone:'A',mapid:'595',highestL:'0' },
    {  x: 250, y: 380,col:'59',row:'6', name: 'Zone F', info: 'Information about Zone F' ,warehouse: '113',zone:'A',mapid:'596',highestL:'0' },
    {  x: 290, y: 380,col:'59',row:'7', name: 'Zone G', info: 'Information about Zone G' ,warehouse: '113',zone:'A',mapid:'597',highestL:'0' },
    {  x: 330, y: 380,col:'59',row:'8', name: 'Zone H', info: 'Information about Zone H' ,warehouse: '113',zone:'A',mapid:'598',highestL:'0' },
    {  x: 370, y: 380,col:'59',row:'9', name: 'Zone H', info: 'Information about Zone H' ,warehouse: '113',zone:'A',mapid:'599',highestL:'0' },


    {  x: 50, y: 450,col:'60',row:'1', name: 'Zone A', info: 'Information about Zone A' ,warehouse: '113',zone:'A',mapid:'601',highestL:'0' },
    {  x: 90, y: 450,col:'60',row:'2', name: 'Zone B', info: 'Information about Zone B' ,warehouse: '113',zone:'A',mapid:'602',highestL:'0' },
    {  x: 130, y: 450,col:'60',row:'3', name: 'Zone C', info: 'Information about Zone C' ,warehouse: '113',zone:'A',mapid:'603',highestL:'0' },
    {  x: 170, y: 450,col:'60',row:'4', name: 'Zone D', info: 'Information about Zone D' ,warehouse: '113',zone:'A',mapid:'604',highestL:'0' },
    {  x: 210, y: 450,col:'60',row:'5', name: 'Zone E', info: 'Information about Zone E' ,warehouse: '113',zone:'A',mapid:'605',highestL:'0' },
    {  x: 250, y: 450,col:'60',row:'6', name: 'Zone F', info: 'Information about Zone F' ,warehouse: '113',zone:'A',mapid:'606',highestL:'0' },
    {  x: 290, y: 450,col:'60',row:'7', name: 'Zone G', info: 'Information about Zone G' ,warehouse: '113',zone:'A',mapid:'607',highestL:'0' },
    {  x: 330, y: 450,col:'60',row:'8', name: 'Zone H', info: 'Information about Zone H' ,warehouse: '113',zone:'A',mapid:'608',highestL:'0' },
    {  x: 370, y: 450,col:'60',row:'9', name: 'Zone H', info: 'Information about Zone H' ,warehouse: '113',zone:'A',mapid:'609',highestL:'0' },

    {  x: 50, y: 520,col:'61',row:'1', name: 'Zone A', info: 'Information about Zone A' ,warehouse: '113',zone:'A',mapid:'611',highestL:'0'},
    {  x: 90, y: 520,col:'61',row:'2', name: 'Zone B', info: 'Information about Zone B' ,warehouse: '113',zone:'A',mapid:'612',highestL:'0'},
    {  x: 130, y: 520,col:'61',row:'3', name: 'Zone C', info: 'Information about Zone C' ,warehouse: '113',zone:'A',mapid:'613',highestL:'0'},
    {  x: 170, y: 520,col:'61',row:'4', name: 'Zone D', info: 'Information about Zone D' ,warehouse: '113',zone:'A',mapid:'614',highestL:'0'},
    {  x: 210, y: 520,col:'61',row:'5', name: 'Zone E', info: 'Information about Zone E' ,warehouse: '113',zone:'A',mapid:'615',highestL:'0'},
    {  x: 250, y: 520,col:'61',row:'6', name: 'Zone F', info: 'Information about Zone F' ,warehouse: '113',zone:'A',mapid:'616',highestL:'0'},
    {  x: 290, y: 520,col:'61',row:'7', name: 'Zone G', info: 'Information about Zone G' ,warehouse: '113',zone:'A',mapid:'617',highestL:'0'},
    {  x: 330, y: 520,col:'61',row:'8', name: 'Zone H', info: 'Information about Zone H' ,warehouse: '113',zone:'A',mapid:'618',highestL:'0'},
    {  x: 370, y: 520,col:'61',row:'9', name: 'Zone H', info: 'Information about Zone H' ,warehouse: '113',zone:'A',mapid:'619',highestL:'0'},

    
    {  x: 50, y: 590,col:'62',row:'1',warehouse: '113',zone:'A',mapid:'621',highestL:'0'},
    {  x: 90, y: 590,col:'62',row:'2',warehouse: '113',zone:'A',mapid:'622',highestL:'0'},
    {  x: 130, y: 590,col:'62',row:'3',warehouse: '113',zone:'A',mapid:'623',highestL:'0'},
    {  x: 170, y: 590,col:'62',row:'4',warehouse: '113',zone:'A',mapid:'624',highestL:'0'},
    {  x: 210, y: 590,col:'62',row:'5',warehouse: '113',zone:'A',mapid:'625',highestL:'0'},
    {  x: 250, y: 590,col:'62',row:'6',warehouse: '113',zone:'A',mapid:'626',highestL:'0'},
    {  x: 290, y: 590,col:'62',row:'7',warehouse: '113',zone:'A',mapid:'627',highestL:'0'},
    {  x: 330, y: 590,col:'62',row:'8',warehouse: '113',zone:'A',mapid:'628',highestL:'0'},
    {  x: 370, y: 590,col:'62',row:'9',warehouse: '113',zone:'A',mapid:'629',highestL:'0'},

    {  x: 50, y: 660,col:'63',row:'1',warehouse: '113',zone:'A',mapid:'631',highestL:'0'},
    {  x: 90, y: 660,col:'63',row:'2',warehouse: '113',zone:'A',mapid:'632',highestL:'0'},
    {  x: 130, y: 660,col:'63',row:'3',warehouse: '113',zone:'A',mapid:'633',highestL:'0'},
    {  x: 170, y: 660,col:'63',row:'4',warehouse: '113',zone:'A',mapid:'634',highestL:'0'},
    {  x: 210, y: 660,col:'63',row:'5',warehouse: '113',zone:'A',mapid:'635',highestL:'0'},
    {  x: 250, y: 660,col:'63',row:'6',warehouse: '113',zone:'A',mapid:'636',highestL:'0'},
    {  x: 290, y: 660,col:'63',row:'7',warehouse: '113',zone:'A',mapid:'637',highestL:'0'},
    {  x: 330, y: 660,col:'63',row:'8',warehouse: '113',zone:'A',mapid:'638',highestL:'0'},
    {  x: 370, y: 660,col:'63',row:'9',warehouse: '113',zone:'A',mapid:'639',highestL:'0'},





    {  x: 50, y: 730,col:'64',row:'1', name: 'Zone A', info: 'Information about Zone A' ,warehouse: '113',zone:'A',mapid:'641',highestL:'0'},
    {  x: 90, y: 730,col:'64',row:'2', name: 'Zone B', info: 'Information about Zone B' ,warehouse: '113',zone:'A',mapid:'642',highestL:'0'},
    {  x: 130, y: 730,col:'64',row:'3', name: 'Zone C', info: 'Information about Zone C' ,warehouse: '113',zone:'A',mapid:'643',highestL:'0'},
    {  x: 170, y: 730,col:'64',row:'4', name: 'Zone D', info: 'Information about Zone D' ,warehouse: '113',zone:'A',mapid:'644',highestL:'0'},
    {  x: 210, y: 730,col:'64',row:'5', name: 'Zone E', info: 'Information about Zone E' ,warehouse: '113',zone:'A',mapid:'645',highestL:'0'},
    {  x: 250, y: 730,col:'64',row:'6', name: 'Zone F', info: 'Information about Zone F' ,warehouse: '113',zone:'A',mapid:'646',highestL:'0'},
    {  x: 290, y: 730,col:'64',row:'7', name: 'Zone G', info: 'Information about Zone G' ,warehouse: '113',zone:'A',mapid:'647',highestL:'0'},
    {  x: 330, y: 730,col:'64',row:'8', name: 'Zone H', info: 'Information about Zone H' ,warehouse: '113',zone:'A',mapid:'648',highestL:'0'},
    {  x: 370, y: 730,col:'64',row:'9', name: 'Zone H', info: 'Information about Zone H' ,warehouse: '113',zone:'A',mapid:'649',highestL:'0'},

    {  x: 50, y: 800,col:'65',row:'1', name: 'Zone A', info: 'Information about Zone A' ,warehouse: '113',zone:'A',mapid:'651',highestL:'0'},
    {  x: 90, y: 800,col:'65',row:'2', name: 'Zone B', info: 'Information about Zone B' ,warehouse: '113',zone:'A',mapid:'652',highestL:'0'},
    {  x: 130, y: 800,col:'65',row:'3', name: 'Zone C', info: 'Information about Zone C' ,warehouse: '113',zone:'A',mapid:'653',highestL:'0'},
    {  x: 170, y: 800,col:'65',row:'4', name: 'Zone D', info: 'Information about Zone D' ,warehouse: '113',zone:'A',mapid:'654',highestL:'0'},
    {  x: 210, y: 800,col:'65',row:'5', name: 'Zone E', info: 'Information about Zone E' ,warehouse: '113',zone:'A',mapid:'655',highestL:'0'},
    {  x: 250, y: 800,col:'65',row:'6', name: 'Zone F', info: 'Information about Zone F' ,warehouse: '113',zone:'A',mapid:'656',highestL:'0'},
    {  x: 290, y: 800,col:'65',row:'7', name: 'Zone G', info: 'Information about Zone G' ,warehouse: '113',zone:'A',mapid:'657',highestL:'0'},
    {  x: 330, y: 800,col:'65',row:'8', name: 'Zone H', info: 'Information about Zone H' ,warehouse: '113',zone:'A',mapid:'658',highestL:'0'},
    {  x: 370, y: 800,col:'65',row:'9', name: 'Zone H', info: 'Information about Zone H' ,warehouse: '113',zone:'A',mapid:'659',highestL:'0'},

    {  x: 50, y: 870,col:'66',row:'1', name: 'Zone A', info: 'Information about Zone A' ,warehouse: '113',zone:'A',mapid:'661',highestL:'0'},
    {  x: 90, y: 870,col:'66',row:'2', name: 'Zone B', info: 'Information about Zone B' ,warehouse: '113',zone:'A',mapid:'662',highestL:'0'},
    {  x: 130, y: 870,col:'66',row:'3', name: 'Zone C', info: 'Information about Zone C' ,warehouse: '113',zone:'A',mapid:'663',highestL:'0'},
    {  x: 170, y: 870,col:'66',row:'4', name: 'Zone D', info: 'Information about Zone D' ,warehouse: '113',zone:'A',mapid:'664',highestL:'0'},
    {  x: 210, y: 870,col:'66',row:'5', name: 'Zone E', info: 'Information about Zone E' ,warehouse: '113',zone:'A',mapid:'665',highestL:'0'},
    {  x: 250, y: 870,col:'66',row:'6', name: 'Zone F', info: 'Information about Zone F' ,warehouse: '113',zone:'A',mapid:'666',highestL:'0'},
    {  x: 290, y: 870,col:'66',row:'7', name: 'Zone G', info: 'Information about Zone G' ,warehouse: '113',zone:'A',mapid:'667',highestL:'0'},
    {  x: 330, y: 870,col:'66',row:'8', name: 'Zone H', info: 'Information about Zone H' ,warehouse: '113',zone:'A',mapid:'668',highestL:'0'},
    {  x: 370, y: 870,col:'66',row:'9', name: 'Zone H', info: 'Information about Zone H' ,warehouse: '113',zone:'A',mapid:'669',highestL:'0'},



    { x: 50, y: 940,col:'67',row:'1',warehouse: '113',zone:'A',mapid:'671',highestL:'0'},
    { x: 90, y: 940,col:'67',row:'2',warehouse: '113',zone:'A',mapid:'672',highestL:'0'},
    { x: 130, y: 940,col:'67',row:'3',warehouse: '113',zone:'A',mapid:'673',highestL:'0'},
    { x: 170, y: 940,col:'67',row:'4',warehouse: '113',zone:'A',mapid:'674',highestL:'0'},
    { x: 210, y: 940,col:'67',row:'5',warehouse: '113',zone:'A',mapid:'675',highestL:'0'},
    { x: 250, y: 940,col:'67',row:'6',warehouse: '113',zone:'A',mapid:'676',highestL:'0'},
    { x: 290, y: 940,col:'67',row:'7',warehouse: '113',zone:'A',mapid:'677',highestL:'0'},
    { x: 330, y: 940,col:'67',row:'8',warehouse: '113',zone:'A',mapid:'678',highestL:'0'},
    { x: 370, y: 940,col:'67',row:'9',warehouse: '113',zone:'A',mapid:'679',highestL:'0'},



    { x: 50, y: 1010,col:'68',row:'1',warehouse: '113',zone:'A',mapid:'681',highestL:'0'},
    { x: 90, y: 1010,col:'68',row:'2',warehouse: '113',zone:'A',mapid:'682',highestL:'0'},
    { x: 130, y: 1010,col:'68',row:'3',warehouse: '113',zone:'A',mapid:'683',highestL:'0'},
    { x: 170, y: 1010,col:'68',row:'4',warehouse: '113',zone:'A',mapid:'684',highestL:'0'},
    { x: 210, y: 1010,col:'68',row:'5',warehouse: '113',zone:'A',mapid:'685',highestL:'0'},
    { x: 250, y: 1010,col:'68',row:'6',warehouse: '113',zone:'A',mapid:'686',highestL:'0'},
    { x: 290, y: 1010,col:'68',row:'7',warehouse: '113',zone:'A',mapid:'687',highestL:'0'},
    { x: 330, y: 1010,col:'68',row:'8',warehouse: '113',zone:'A',mapid:'688',highestL:'0'},
    { x: 370, y: 1010,col:'68',row:'9',warehouse: '113',zone:'A',mapid:'689',highestL:'0'},



    { x: 60, y: 1085,col:'72',row:'1',warehouse: '113',zone:'A',mapid:'721',highestL:'0',width:'60px',height:'35px'},
    { x: 60, y: 1130,col:'72',row:'2',warehouse: '113',zone:'A',mapid:'722',highestL:'0',width:'60px',height:'35px'},
    { x: 60, y: 1175,col:'72',row:'3',warehouse: '113',zone:'A',mapid:'723',highestL:'0',width:'60px',height:'35px'},



    { x: 140, y: 1085,col:'71',row:'1',warehouse: '113',zone:'A',mapid:'711',highestL:'0',width:'60px',height:'35px'},
    { x: 140, y: 1130,col:'71',row:'2',warehouse: '113',zone:'A',mapid:'712',highestL:'0',width:'60px',height:'35px'},
    { x: 140, y: 1175,col:'71',row:'3',warehouse: '113',zone:'A',mapid:'713',highestL:'0',width:'60px',height:'35px'},



    { x: 220, y: 1085,col:'70',row:'1',warehouse: '113',zone:'A',mapid:'701',highestL:'0',width:'60px',height:'35px'},
    { x: 220, y: 1130,col:'70',row:'2',warehouse: '113',zone:'A',mapid:'702',highestL:'0',width:'60px',height:'35px'},
    { x: 220, y: 1175,col:'70',row:'3',warehouse: '113',zone:'A',mapid:'703',highestL:'0',width:'60px',height:'35px'},



    { x: 300, y: 1085,col:'69',row:'1',warehouse: '113',zone:'A',mapid:'691',highestL:'0',width:'60px',height:'35px'},
    { x: 300, y: 1130,col:'69',row:'2',warehouse: '113',zone:'A',mapid:'692',highestL:'0',width:'60px',height:'35px'},
    { x: 300, y: 1175,col:'69',row:'3',warehouse: '113',zone:'A',mapid:'693',highestL:'0',width:'60px',height:'35px'},


    // ... add more zone data
  ]);

  // const [zone_wood, setZone_wood] = useState([
  //   { id: 1, x: 220, y: 340, name: 'Zone AA', info: 'Information about Zone A', warehouse: '113', zone: 'a',  col:'55' , row:'1'},
  //   { id: 2, x: 260, y: 340, name: 'Zone BB', info: 'Information about Zone B', warehouse: '113', zone: 'a',  col:'55' , row:'2'},
  //   { id: 3, x: 300, y: 340, name: 'Zone CC', info: 'Information about Zone C', warehouse: '113', zone: 'a', col:'55' , row:'3'},
  //   { id: 4, x: 340, y: 340, name: 'Zone DD', info: 'Information about Zone D', warehouse: '113', zone: 'a', col:'55' , row:'4'},
  //   { id: 5, x: 380, y: 340, name: 'Zone EE', info: 'Information about Zone E', warehouse: '113', zone: 'a', col:'55' , row:'5'},
  //   { id: 6, x: 420, y: 340, name: 'Zone FF', info: 'Information about Zone F', warehouse: '113', zone: 'a', col:'55' , row:'6'},

   

  //   { id: 54, x: 220, y: 830,col:'62', name: 'Zone AAA', info: 'Information about Zone A' },
  //   { id: 55, x: 260, y: 830,col:'62', name: 'Zone BBB', info: 'Information about Zone B' },
  //   { id: 56, x: 300, y: 830,col:'62', name: 'Zone CCC', info: 'Information about Zone C' },
  //   { id: 57, x: 340, y: 830,col:'62', name: 'Zone DDD', info: 'Information about Zone D' },
  //   { id: 58, x: 380, y: 830,col:'62', name: 'Zone EEE', info: 'Information about Zone E' },
  //   { id: 59, x: 420, y: 830,col:'62', name: 'Zone FFF', info: 'Information about Zone F' },
  //   { id: 60, x: 460, y: 830,col:'62', name: 'Zone GGG', info: 'Information about Zone G' },
  //   { id: 61, x: 500, y: 830,col:'62', name: 'Zone HHH', info: 'Information about Zone H' },

  //   { id: 62, x: 220, y: 900,col:'63', name: 'Zone AAAA', info: 'Information about Zone A' },
  //   { id: 63, x: 260, y: 900,col:'63', name: 'Zone BBBB', info: 'Information about Zone B' },
  //   { id: 64, x: 300, y: 900,col:'63', name: 'Zone CCCC', info: 'Information about Zone C' },
  //   { id: 65, x: 340, y: 900,col:'63', name: 'Zone DDDD', info: 'Information about Zone D' },
  //   { id: 66, x: 380, y: 900,col:'63', name: 'Zone EEEE', info: 'Information about Zone E' },
  //   { id: 67, x: 420, y: 900,col:'63', name: 'Zone FFFF', info: 'Information about Zone F' },
  //   { id: 68, x: 460, y: 900,col:'63', name: 'Zone GGGG', info: 'Information about Zone G' },
  //   { id: 69, x: 500, y: 900,col:'63', name: 'Zone HHHH', info: 'Information about Zone H' },

    

  //   { id: 102, x: 220, y: 1180,col:'67', name: 'Zone AAAAA', info: 'Information about Zone A' },
  //   { id: 103, x: 260, y: 1180,col:'67', name: 'Zone BBBBB', info: 'Information about Zone B' },
  //   { id: 104, x: 300, y: 1180,col:'67', name: 'Zone CCCCC', info: 'Information about Zone C' },
  //   { id: 105, x: 340, y: 1180,col:'67', name: 'Zone DDDDD', info: 'Information about Zone D' },
  //   { id: 106, x: 380, y: 1180,col:'67', name: 'Zone EEEEE', info: 'Information about Zone E' },
  //   { id: 107, x: 420, y: 1180,col:'67', name: 'Zone FFFFF', info: 'Information about Zone F' },
  //   { id: 108, x: 460, y: 1180,col:'67', name: 'Zone GGGGG', info: 'Information about Zone G' },
  //   { id: 109, x: 500, y: 1180,col:'67', name: 'Zone HHHHH', info: 'Information about Zone H' },


  //   // ... add more zone data
  // ]);
  // const [zone_v, setZone_v] = useState([
  //   { id: 110, x: 220, y: 1280,col:'68' , name: 'Zone AA', info: 'Information about Zone A' },
  //   { id: 111, x: 300, y: 1280,col:'68' , name: 'Zone BB', info: 'Information about Zone B' },
  //   { id: 112, x: 380, y: 1280,col:'68' , name: 'Zone CC', info: 'Information about Zone C' },
  //   { id: 113, x: 460, y: 1280,col:'68' , name: 'Zone DD', info: 'Information about Zone D' },

  //   { id: 114, x: 220, y: 1320,col:'68' , name: 'Zone AA', info: 'Information about Zone A' },
  //   { id: 115, x: 300, y: 1320,col:'68' , name: 'Zone BB', info: 'Information about Zone B' },
  //   { id: 116, x: 380, y: 1320,col:'68' , name: 'Zone CC', info: 'Information about Zone C' },
  //   { id: 117, x: 460, y: 1320,col:'68' , name: 'Zone DD', info: 'Information about Zone D' },

  //   { id: 118, x: 220, y: 1360,col:'68' , name: 'Zone AA', info: 'Information about Zone A' },
  //   { id: 119, x: 300, y: 1360,col:'68' , name: 'Zone BB', info: 'Information about Zone B' },
  //   { id: 120, x: 380, y: 1360,col:'68' , name: 'Zone CC', info: 'Information about Zone C' },
  //   { id: 121, x: 460, y: 1360,col:'68' , name: 'Zone DD', info: 'Information about Zone D' },


   

    

    

  //   // ... add more zone data
  // ]);

  const [inputValue, setInputValue] = useState('');


  const [zone_v, setZone_v] = useState([
    
    {  x: 480, y: 100, col:'55' , mapid:'1' },
    {  x: 480, y: 170, col:'56' , mapid:'2'},
    {  x: 480, y: 240, col:'57' , mapid:'3'},
    {  x: 480, y: 310, col:'58' , mapid:'4'},
    {  x: 480, y: 380, col:'59' , mapid:'5'},
    {  x: 480, y: 450, col:'60' , mapid:'6'},
    {  x: 480, y: 520, col:'61' , mapid:'7'},
    {  x: 480, y: 590, col:'62' , mapid:'8'},
    {  x: 480, y: 660, col:'63' , mapid:'9'},
    {  x: 480, y: 730,col:'64' , mapid:'10'},
    {  x: 480, y: 800,col:'65' , mapid:'11'},
    {  x: 480, y: 870,col:'66' , mapid:'12'},
    {  x: 480, y: 940,col:'67' , mapid:'13'},
    {  x: 480, y: 1010,col:'68' , mapid:'14'},
    {  x: 300, y: 1250,col:'69' , mapid:'15',width:'60px',height:'35px'},
    {  x: 220, y: 1250,col:'70' , mapid:'16',width:'60px',height:'35px'},
    {  x: 140, y: 1250,col:'71' , mapid:'17',width:'60px',height:'35px'},
    {  x: 60, y: 1250,col:'72' , mapid:'18',width:'60px',height:'35px'},


   

    

    

    // ... add more zone data
  ]);


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
    console.log('click',zoneId,clickedZone);
    setClickedZone(clickedZone);
    setHoveredZone(null);

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

  const toast = useToast();


  



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
  
  
      
      // setClickedZone(null);
    
      
      // Assuming you want to save changes when exiting edit mode
      // setClickedZone(prev => {
      //   if (prev) {
      //     return {
      //       ...prev,
      //       level: {
      //         ...prev.level,
      //         ...editedValues,
      //       }
      //     };
      //   }
      //   return prev;
      // });







  // const handleSubmit = e => {
  //   e.preventDefault();
  //   fetch('http://127.0.0.1:8000/api/storage/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(state),
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data);

  //     onClose();
  //     // handle success
  //   })
  //   .catch(error => {
  //     console.log(error);
  //     // handle error
  //   });
  // };


  
  const patternUrl = "../public/assets/img/wood.png";

  
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
   // <- If you want to run it only once when the component mounts

//    useEffect(() => {
//     console.log(zones, 'updated zones');
// }, [zones]);

useEffect(() => {
  console.log('zone change');
  
  
}, [zones]);



  
  

  
  const inputRefs = {
    l1: useRef(null),
    l2: useRef(null),
    l3: useRef(null),
    l4: useRef(null),
    l5: useRef(null),
  };

  
  
  


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
    if (clickedZone === zone || hoveredZone === zone) {
        return 'rgba(211, 211, 211, 0.7)';
    }
    
    if (zone.highestL === '5') {
        return '#eac5c5'; 
    }

    if (zone.highestL === '4'|| zone.highestL === '3' || zone.highestL === '2' || zone.highestL === '1'  ) {
      return 'rgb(234 228 197)'; 
  }
 
    
    return '#D3D3D3';
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
            
            textAlign: 'center',
            backgroundColor: getBackgroundColor(zone), // Add background color when hovered
          }}
          onMouseEnter={() => handleZoneHover(zone.mapid)}
          onMouseLeave={() => setHoveredZone('')}
          onClick={() => handleZoneClick(zone.mapid)}
        > <label>{zone && zone.highestL}</label>
        </div>
      ))}





{zone_v.map(zone => (
  <div  key={zone.mapid}
  style={{
    position: 'absolute',
    left: `${zone.x}px`,
    top: `${zone.y}px`,
    width: zone.width||'35px',
    height: zone.height||'60px',
   //  border: 'solid black 1px',
   display: 'flex',              // Added this
   justifyContent: 'center',     // This will now work to horizontally center the content
   alignItems: 'center',
   //  backgroundColor: getBackgroundColor(zone), // Add background color when hovered
  }}>
         <Tag variant='solid' colorScheme='teal'
         
       > {zone.col}
       </Tag>
       </div>
      ))}

{/* 
{zone_wood.map(zone => (
  
        <div
          key={zone.mapid}
          style={{
            position: 'absolute',
            left: `${zone.x}px`,
            top: `${zone.y}px`,
            width: '35px',
            height: '60px',
             border: 'solid black 1px',
            backgroundSize: '600%',
            backgroundColor: hoveredZone === zone ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
            backgroundImage: `url(${patternUrl})`,
            backgroundRepeat: 'repeat',  // Add background color when hovered
            boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.2)',
          }}
          onMouseEnter={() => handleZoneHover_wood(zone.mapid)}
          onMouseLeave={() => setHoveredZone('')}
          onClick={() => handleZoneClick_wood(zone.mapid)}
        >
        </div>
      ))} */}
 

      {/* {hoveredZone && (
        <div
          style={{
            position: 'fixed',
            left: `${hoveredZone.x + 50}px`,
            top: `${hoveredZone.y}px`,
            backgroundColor: 'rgba(0, 0, 0, 0.80)',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '3px',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.8)',
            zIndex: 1,
          }}
        >
          <p>{hoveredZone.name}</p>
          <p>{hoveredZone.info}</p>
        </div>
      )} */}

      {/* {clickedZone && (
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
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.8)',
            zIndex: 9999,
          }}
        >
          <ZoneModal_1
            zone={clickedZone}
            onClose={handleCloseModal}
            onUpdateInfo={(newInfo) => handleUpdateInfo(clickedZone.mapid, newInfo)}
          />
        </div>
      )} */}
    </div>
    </div>

    

    <div className='column' style={{
      
       flex: '4 1 0%',  // this makes the newCard take up 1 part of space
      //  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  
      
      //  borderRadius: '5px',
      //  padding: '20px',

    }}>
      <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'  style={{ position:'sticky',  top: '50px',}}>

{/* <Card maxW='md' style={{ position:'sticky',  top: '50px',}}>
  <CardBody>
    <Image
      src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>Zone</Heading>
      <FormControl>
    
  <FormLabel>Column</FormLabel>
  <Input type='text' value={hoveredZone && hoveredZone.col||clickedZone && clickedZone.col || '-'} readOnly/>

  <FormLabel>Row</FormLabel>
  <Input type='text' value={hoveredZone && hoveredZone.row||clickedZone && clickedZone.row || '-'} readOnly/>


</FormControl>
    
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    {/* <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue'>
        Submit
      </Button>
      <Button variant='ghost' colorScheme='blue'> 
        Add to cart
      </Button>
    </ButtonGroup> 
  </CardFooter>
</Card> */}

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
   

          {['l5', 'l4', 'l3', 'l2', 'l1'].map(level => (
          
   
                      <HStack key={level} >
                      <FormLabel w='25%'> {getCustomLabel(level)} </FormLabel>
                      {editMode ? (
                      <>
                       <Box w='100%'  bg={getDisplayValue(level) !== '-' || editedValues[level] ? '#319795' : 'gray.200'} borderRadius={'10px'}>
                      <Input
                        size='sm'
                        // value={formp[level]}
                        name={level}
                        ref={inputRefs[level]}
                        // onChange={handleChange}
                        defaultValue={editedValues[level]}
                        color={'white'}
                        onKeyUp={(e) => handleKeyUp(level, e)} // ส่ง level และ event ไปกับ event handler
                        bg={inputBgColors[level] } // ใช้สีพื้นหลังจาก state โดยใช้ key ที่เป็น level
                      />
                        </Box>

                      </>
                      ) : (
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
                        value={hoveredZone && hoveredZone[level]|| clickedZone && clickedZone[level]|| editedValues[level] || '' }
                        color={'white'}
                        readOnly
                       // ใช้สีพื้นหลังจาก state โดยใช้ key ที่เป็น level
                      />


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
