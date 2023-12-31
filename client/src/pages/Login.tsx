import {
  Link,
  Form,
  redirect,
  useNavigation,
  useActionData,
} from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import {FormRow, Logo} from '../components';
import customFetch from '../utils/customFetch';
import {toast} from 'react-toastify';

// interface MyErrorType {
//   msg: string;
//   // code: number;
// }

export const action = async ({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // const errors = {msg: ''};
  // if (data.password.length < 3) {
  //   errors.msg = 'password too short';
  //   return errors;
  // }
  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login successful');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    // errors.msg = error?.response?.data?.msg;
    return error;
  }
};

const Login = () => {
  // const errors = useActionData();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Login </h4>
        {/* {errors?.messsage  && <p style={{color: 'red'}}>{errors.msg}</p>} */}
        <FormRow type='email' name='email' defaultValue='' />
        <FormRow type='password' name='password' defaultValue='' />

        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'submitting' : 'submit'}
        </button>
        <button type='button' className='btn btn-block'>
          Explore the app
        </button>
        <p>
          Not a member yet ?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
