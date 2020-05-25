import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { formatPrice } from '../../util/format';
import { MdArrowBack } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { ProductList, DescriptionProduct } from './styles';

export default function ProductInfo(props) {


  const [ productInfo, setProductInfo ] = useState([]);

    useEffect(() =>  {

      async function showProducts () {

       const id = props.match.params.id;

        const response = await api.get(`products/${id}`);

        if(response ) {

          setProductInfo({
                image: response.data.image,
                title: response.data.title,
                description: response.data.description,
                priceFormatted: formatPrice(response.data.price)
        });
     }
    }
    showProducts();
    // eslint-disable-next-line
  }, []);

    return (
      <ProductList>
            <li key={productInfo.id}>
            <Link to="/">
              <MdArrowBack
              className="button-back"
              color="rgba(2, 137, 133, 1)"
              size="35"
               />
          </Link>
            <img src={productInfo.image}
            alt={productInfo.title}
            />

          <strong>{productInfo.title}</strong>
          <DescriptionProduct>
            <p>{productInfo.description}</p>
          </DescriptionProduct>
            <span>{productInfo.priceFormatted}</span>

            </li>
      </ProductList>
    );
}
