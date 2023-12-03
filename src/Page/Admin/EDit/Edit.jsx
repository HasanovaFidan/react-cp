
import React, { useContext, useEffect, useState } from 'react';
import { Formik, useFormik } from 'formik';
import axios from 'axios';
import { useParams } from 'react-router';

const Edit = () => {
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [data, setData] = useState([]);
    useEffect(() => {
      axios.get(`https://northwind.vercel.app/api/products/${id}`).then((res) => {
        setData(res.data);
        setLoading(false);
      });
    }, []);
    const formik = useFormik({
      initialValues: {
        name: "",
        unitPrice: "",
      },
      onSubmit: (values) => {
        axios
          .put(`https://northwind.vercel.app/api/products/${data.id}`, {
            ...values,
          })
          .then((res) => {
          
            console.log(res);
          });
      },
    });
    return (
      <>
          <form className="edit_product_form" onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </div>
            <div>
              <label htmlFor="unitPrice">Price:</label>
              <input
                id="unitPrice"
                name="unitPrice"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.unitPrice}
              />
            </div>
  
            <button type="submit">Submit</button>
          </form>
      </>
    );
  };
  
  export default Edit;
