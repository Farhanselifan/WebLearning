
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../services/api';

const UserRegistrationForm = ({ onUserCreated }) => {
  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    age: Yup.number()
      .min(18, 'Age must be at least 18')
      .max(100, 'Age must be less than 100')
      .required('Age is required'),
    city: Yup.string()
      .min(2, 'City must be at least 2 characters')
      .required('City is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    terms: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
  });

  // Initial form values
  const initialValues = {
    name: '',
    email: '',
    age: '',
    city: '',
    password: '',
    confirmPassword: '',
    terms: false
  };

  // Form submission handler
  const handleSubmit = async (values, { setSubmitting, setStatus, resetForm }) => {
    try {
      setStatus(null);
      
      // Remove confirmPassword and terms from submission data
      const { confirmPassword, terms, ...userData } = values;
      
      const response = await api.post('/users', userData);
      
      setStatus({ type: 'success', message: 'User registered successfully!' });
      resetForm();
      
      if (onUserCreated) {
        onUserCreated(response.data);
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Registration failed' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>User Registration Form</h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status, errors, touched }) => (
          <Form>
            {/* Status Messages */}
            {status && (
              <div style={{ 
                padding: '10px', 
                margin: '10px 0',
                backgroundColor: status.type === 'success' ? '#d4edda' : '#f8d7da',
                color: status.type === 'success' ? '#155724' : '#721c24',
                border: `1px solid ${status.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
                borderRadius: '4px'
              }}>
                {status.message}
              </div>
            )}

            {/* Name Field */}
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="name">Name:</label>
              <Field
                type="text"
                id="name"
                name="name"
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  marginTop: '5px',
                  border: errors.name && touched.name ? '1px solid red' : '1px solid #ccc'
                }}
              />
              <ErrorMessage name="name" component="div" style={{ color: 'red', fontSize: '14px' }} />
            </div>

            {/* Email Field */}
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                id="email"
                name="email"
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  marginTop: '5px',
                  border: errors.email && touched.email ? '1px solid red' : '1px solid #ccc'
                }}
              />
              <ErrorMessage name="email" component="div" style={{ color: 'red', fontSize: '14px' }} />
            </div>

            {/* Age Field */}
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="age">Age:</label>
              <Field
                type="number"
                id="age"
                name="age"
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  marginTop: '5px',
                  border: errors.age && touched.age ? '1px solid red' : '1px solid #ccc'
                }}
              />
              <ErrorMessage name="age" component="div" style={{ color: 'red', fontSize: '14px' }} />
            </div>

            {/* City Field */}
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="city">City:</label>
              <Field
                type="text"
                id="city"
                name="city"
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  marginTop: '5px',
                  border: errors.city && touched.city ? '1px solid red' : '1px solid #ccc'
                }}
              />
              <ErrorMessage name="city" component="div" style={{ color: 'red', fontSize: '14px' }} />
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                id="password"
                name="password"
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  marginTop: '5px',
                  border: errors.password && touched.password ? '1px solid red' : '1px solid #ccc'
                }}
              />
              <ErrorMessage name="password" component="div" style={{ color: 'red', fontSize: '14px' }} />
            </div>

            {/* Confirm Password Field */}
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  marginTop: '5px',
                  border: errors.confirmPassword && touched.confirmPassword ? '1px solid red' : '1px solid #ccc'
                }}
              />
              <ErrorMessage name="confirmPassword" component="div" style={{ color: 'red', fontSize: '14px' }} />
            </div>

            {/* Terms Checkbox */}
            <div style={{ marginBottom: '15px' }}>
              <label>
                <Field type="checkbox" name="terms" style={{ marginRight: '8px' }} />
                I agree to the terms and conditions
              </label>
              <ErrorMessage name="terms" component="div" style={{ color: 'red', fontSize: '14px' }} />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: isSubmitting ? '#ccc' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserRegistrationForm;