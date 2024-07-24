// import './postRecipe.css'
// import React, { useState, useEffect } from 'react';
// import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { useUser } from '../../Context/Context';


// function Post() {
//     const user = useUser();
//     // console.log(user.user.data.id)
//     const[categories, setCategories] = useState([]);
//     useEffect(() => {
//         const fetchCategories = async() => {
//             try{
//                 const response = await axios.get(`http://localhost:5000/api/getAllCategories`);
//                 console.log(response.data);
//                 setCategories(response.data.result)
//             }catch(error){
//                 console.error("Error Fetching Categories", error)
//             }
//         }
//         fetchCategories();
//     }, [])

//     const initialValues = {
//         title : '',
//         video_url : '',
//         ingredients : [''],
//         category_id : ''
//     };

//     const validationSchema = Yup.object({
//         title : Yup.string().required("Title is required"),
//         video_url : Yup.string().url("Invalid URL format").required("url is required"),
//         ingredients : Yup.array().of(Yup.string().required("ingredients are required")),
//         category_id : Yup.string().required("category is required")
//     });

//     const onSubmit = async(values, { setSubmitting }) => {
//         const payload = {
//             ...values,
//             user_id : user.user.data.id
//         }
//         try{
//             const response = await axios.post(`http://localhost:5000/api/recipe`, payload, {withCredentials : true});
//             if (response.data.success){
//                 alert("Recipee Created Successfully");
//             }
//             else{
//                 alert("Unauthorized!")

//             }
//         }catch(error){
//             console.error("Error Uploading Recipee", error)
//         }finally{
//             setSubmitting(false);
//         }
//     };
//     return (
//         <>
//     <div className="recipe-form-container">
//       <h2>Upload a Recipe</h2>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={onSubmit}
//       >
//         {({ values, isSubmitting }) => (
//           <Form>
//             <div className="form-control">
//               <label htmlFor="title">Title</label>
//               <Field type="text" id="title" name="title" />
//               <ErrorMessage name="title" component="div" className="error" />
//             </div>

//             <div className="form-control">
//               <label htmlFor="video_url">Video URL</label>
//               <Field type="text" id="video_url" name="video_url" />
//               <ErrorMessage name="video_url" component="div" className="error" />
//             </div>

//             <div className="form-control">
//               <label>Ingredients</label>
//               <FieldArray name="ingredients">
//                 {({ push, remove }) => (
//                   <div>
//                     {values.ingredients.map((ingredient, index) => (
//                       <div key={index}>
//                         <Field name={`ingredients[${index}]`} />
//                         <button type="button" onClick={() => remove(index)}> - </button>
//                         {index === values.ingredients.length - 1 && (
//                           <button type="button" onClick={() => push('')}> + </button>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </FieldArray>
//               <ErrorMessage name="ingredients" component="div" className="error" />
//             </div>

//             <div className="form-control">
//               <label htmlFor="category_id">Category</label>
//               <Field as="select" id="category_id" name="category_id">
//                 <option value="">Select a category</option>
//                 {categories.map((category) => (
//                   <option key={category.id} value={category.id}>{category.name}</option>
//                 ))}
//               </Field>
//               <ErrorMessage name="category_id" component="div" className="error" />
//             </div>

//             <button type="submit" disabled={isSubmitting}>Submit</button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//         </>
//     )
// }
// export default Post;

import './postRecipe.css';
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useUser } from '../../Context/Context';

function Post() {
  const user = useUser();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/getAllCategories`);
        setCategories(response.data.result);
      } catch (error) {
        console.error("Error Fetching Categories", error);
      }
    };
    fetchCategories();
  }, []);

  const initialValues = {
    title: '',
    video_url: '',
    ingredients: '',
    category_id: ''
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    video_url: Yup.string().url("Invalid URL format").required("URL is required"),
    ingredients: Yup.string().required("Ingredients are required"),
    category_id: Yup.string().required("Category is required")
  });

  const onSubmit = async (values, { setSubmitting }) => {
    const payload = {
      ...values,
      ingredients: values.ingredients.split(',').map(ingredient => ingredient.trim()),
      user_id: user.user.data.id
    };

    try {
      const response = await axios.post(`http://localhost:5000/api/recipe`, payload, { withCredentials: true });
      if (response.data.success) {
        alert("Recipe Created Successfully");
      } else {
        alert("Unauthorized!");
      }
    } catch (error) {
      console.error("Error Uploading Recipe", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="recipe-form-container">
      <h2>Upload a Recipe</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <Field type="text" id="title" name="title" />
              <ErrorMessage name="title" component="div" className="error" />
            </div>

            <div className="form-control">
              <label htmlFor="video_url">Video URL</label>
              <Field type="text" id="video_url" name="video_url" placeholder="URL Format:  https://www.youtube.com/watch?v=YT8oN4U7Vm8"/>
              <ErrorMessage name="video_url" component="div" className="error" />
            </div>

            <div className="form-control">
              <label htmlFor="ingredients">Ingredients</label>
              <Field type="text" id="ingredients" name="ingredients" placeholder="Enter ingredients, separated by commas" />
              <ErrorMessage name="ingredients" component="div" className="error" />
            </div>

            <div className="form-control">
              <label htmlFor="category_id">Category</label>
              <Field as="select" id="category_id" name="category_id">
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </Field>
              <ErrorMessage name="category_id" component="div" className="error" />
            </div>

            <button type="submit" disabled={isSubmitting}>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Post;
