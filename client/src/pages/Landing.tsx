import styled from 'styled-components';
import Wrapper from '../assets/wrappers/LandingPage';
// import main from '../assets/images/main.svg';
import mainn from '../assets/images/mainn.svg';
import logo from '../assets/images/logo.svg';
import {Link} from 'react-router-dom';
import {Logo} from '../components';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            job <span style={{color: '#3333CC'}}>tracking </span> app
          </h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid
            facere exercitationem perspiciatis laudantium officia quam, facilis
            quae at velit similique. Unde, iure cupiditate nemo provident vero
            explicabo sunt repellat error minus distinctio
          </p>
          <Link to='/register' className='btn register-link'>
            Register
          </Link>
          <Link to='/login' className='btn'>
            Login/Demo User
          </Link>
        </div>
        <img src={mainn} alt='job hunt ' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
