import {useState} from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

import backgroundImage from '../public/assets/img/bg.jpg';

function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type","application/json");

    var raw = JSON.stringify({
      "username" : inputs.username,
      "password" : inputs.password,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/api/token/", requestOptions)
    .then(response => response.json())
    .then(result =>{
      if (result.message === 'ok'){
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'You have successfully logged in.',
        }).then(() => {
          // Redirect to the map route
          history.push('/map'); // Replace '/map' with your actual route
        })

      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Login failed',
          text: result.detail,
        });
      }
      console.log(result)})
    .catch(error => console.log('error', error))

    console.log(inputs);
    
  }

  return (
    <section className="ftco-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-5">
            <h2 className="heading-section">Warehouse Management System</h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="login-wrap p-0">
              <h3 className="mb-4 text-center">Have an account?</h3>
              <form onSubmit={handleSubmit} className="signin-form">
                <div className="form-group">
                <input 
                className="form-control"
        type="text" 
        name="username" 
        value={inputs.username || ""} 
        onChange={handleChange}
        required
      />
                </div>
                <div className="form-group">
                <input 
                className="form-control"
          type="password" 
          name="password" 
          value={inputs.password || ""} 
          onChange={handleChange}
          required
          checked
        />
                  <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>
                </div>
                <div className="form-group">
                  <button type="submit" className="form-control btn btn-primary submit px-3">Sign In</button>
                </div>
                <div className="form-group d-md-flex">
                  <div className="w-50">
                    <label className="checkbox-wrap checkbox-primary">Remember Me
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="w-50 text-md-right">
                    <a href="#" style={{ color: '#fff' }}>Forgot Password</a>
                  </div>
                </div>
              </form>

           



              <p className="w-100 text-center">&mdash; Or Sign In With &mdash;</p>
              <div className="social d-flex text-center">
                <a href="#" className="px-2 py-2 mr-md-1 rounded"><span className="ion-logo-facebook mr-2"></span> Facebook</a>
                <a href="#" className="px-2 py-2 ml-md-1 rounded"><span className="ion-logo-twitter mr-2"></span> Twitter</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  

  )
}

export default Login;