import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import axiosExample from '../services/axios';


const validationSchema = Yup.object({
  name: Yup.string()
    .min(6, 'Name must be at least 6 characters')
    .required('Name is required'),
  city: Yup.string()
    .required('city is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  age: Yup.number()
    .required('Age is required')
});

interface users {
    name : string;
    email : string;
    age : string;
    city : string;
}

const UserRegister = () => {
    const [users, setUsers] = useState<users[]>([]);
    const [loading,setLoading]= useState(false);

    useEffect(() => {
        fetchUsers();
      }, []);

    const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosExample.get('/users');
      setUsers(response.data);
    } catch (error) {
      alert('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  // POST - Create new user
  const handleSubmit = async (values: users, actions: any) => {
    try {
      const response = await axiosExample.post('/users', values);
      setUsers(prev=>[...prev, response.data]);
      actions.resetForm();
    } catch (error) {
      alert('Failed to create user');
    }
  };
    

    return (
        <div className="">
            <div className="">
                <h1 className="bg-blue-400 rounded-2xl w-full p-3 shadow-2xl shadow-blue-200
                font-mono text-white flex justify-center text-3xl">FORM AND TABLE </h1>
            </div>
            <div className=' flex justify-center p-10 rounded'>
               <div className="bg-white p-6 w-12/12 rounded">
                    <div className="max-w-6xl mx-auto mt-10 px-4">
                    <div className="overflow-x-auto bg-white rounded-2xl shadow-xl ring-1 ring-gray-200">
                        <table className="min-w-full text-sm text-gray-700">
                        <thead className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 uppercase text-xs tracking-wider">
                            <tr>
                            <th className="px-6 py-4 text-left">#</th>
                            <th className="px-6 py-4 text-left">Name</th>
                            <th className="px-6 py-4 text-left">Age</th>
                            <th className="px-6 py-4 text-left">Email</th>
                            <th className="px-6 py-4 text-left">City</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500 italic">
                                No users yet.
                                </td>
                            </tr>
                            ) : (
                            users.map((user, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-all duration-200">
                                <td className="px-6 py-4 font-medium text-gray-900 text-center">{index + 1}</td>
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4 text-center">{user.age}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.city}</td>
                                </tr>
                            ))
                            )}
                        </tbody>
                        </table>
                    </div>
                    </div>
               </div>
            </div>
           <div className=" p-10 rounded flex justify-center">
                <Formik
                    initialValues={{name: '', email:'', age:'', city:''}}
                    validationSchema={(validationSchema)}
                    onSubmit={handleSubmit}
                >
                    <Form className="">
                        <Field id='name' type="name" name="name" 
                        className="mt-1 border rounded border-gray-300
                        p-1 flex justify-center m-3 bg-white" placeholder="Nama" /> 
                        <ErrorMessage name="name"/>

                        <Field id='email' type="email" name="email" 
                        className="mt-1 border rounded border-gray-300
                        p-1 flex justify-center m-3 bg-white" placeholder="Email " /> 
                        <ErrorMessage name="email"/>

                        <Field id='age' type="age" name="age" 
                        className="mt-1 border rounded border-gray-300
                        p-1 flex justify-center m-3 bg-white" placeholder="Age" /> 
                        <ErrorMessage name="age"/>

                        <Field id='city' type="city" name="city" 
                        className="mt-1 border rounded border-gray-300
                        p-1 flex justify-center m-3 bg-white" placeholder="City" /> 
                        <ErrorMessage name="city"/>

                        <button type="submit" className=" border p-2 rounded-2xl
                        border-white flex justify-center relative left-16 m-1.5 text-white font-bold bg-red-400 ">Submit</button>
                    </Form >
                </Formik>
            </div>
        </div>
    );

};

export default UserRegister;