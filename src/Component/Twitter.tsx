import React, {useState} from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import TwitApi from "../services/twitter";
import { useEffect } from 'react';

interface twit {
    text : string;
}   

const validationTweet = Yup.object({
    text : Yup.string()
    .max(50, "text max 50 caracter")
    .required('text must be under 50 caracter')
})


const Twitter = () => {
    const [twit, setTwit] = useState<twit[]>([]);
    const [loading,setLoading]= useState(false);

     useEffect(() => {
        fetchUsers();
      }, []);

    const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await TwitApi.get('/Text');
      setTwit(response.data);
    } catch (error) {
      alert('Failed to fetch users');
    } finally {
      setLoading(false);
    }
    }



    const handleSubmit = async (values: twit, actions: any) => {
    try{
        const response = await TwitApi.post ('/Text', values);
        setTwit(prev=>[...prev, response.data]);
        actions.resetForm();
        } catch (error) {
        alert('Failed to create Tweet');
    }
    };

    return (
        <div>
            <div className="pt-6">
                <h1 className="bg-black text-white flex justify-center p-3 
                text-3xl font-extralight"> TWITTER</h1>
            </div>
            <div className="bg-white rounded-2xl shadow-gray-500 border border-gray-100
            shadow-2xl m-3.5">
                <h1 className="p-5 flex justify-center text-2xl
                font-mono">Tweet form </h1>
                <Formik
                    initialValues={{text: '' }}
                    validationSchema={validationTweet}
                    onSubmit={handleSubmit}

                >
                    <Form className="relative p-4 pb-16 w-full mx-auto rounded">
                        <Field
                            id="text"
                            type="text"
                            name="text"
                            placeholder="Tweet here"
                            className="border border-gray-400 rounded w-full p-2"
                        />
                        <ErrorMessage name="text" component="div"></ErrorMessage>
                        <button
                            type="submit"
                            className="absolute bottom-4 right-4 bg-blue-600 px-4 py-2 text-white font-bold rounded shadow"
                        >
                            Post
                        </button>
                    </Form>
                 </Formik>
            </div>
            {twit.map((text , index) =>
                <div className="bg-white rounded-2xl shadow-gray-500 border border-gray-100
                    shadow-2xl m-3.5"> 
                    <h1 className="p-5 flex justify-center text-2xl
                    font-mono">tweet {index+1}</h1>
                    <div className="relative p-4 pb-16 w-full mx-auto rounded"> 
                        <h1 className="border border-gray-200 
                            rounded w-full p-2 font-mono ">{text.text}</h1>
                        <button className="absolute bottom-4 right-4 bg-blue-600 px-4 py-2 text-white font-bold rounded shadow">Edit</button>
                        <button className="absolute bottom-4 right-22 bg-blue-600 px-4 py-2 text-white font-bold rounded shadow">Delete</button>
                    </div>  
                </div>
            )}
            
        </div>
    );
}


export default Twitter;