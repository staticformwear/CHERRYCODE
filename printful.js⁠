const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const token = process.env.PRINTFUL_API_TOKEN;
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  // 1. Fetch products from Printful
  if (event.httpMethod === 'GET') {
    try {
      const response = await fetch('https://api.printful.com/store/products', { headers });
      const data = await response.json();
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
  }

  // 2. Submit an order to Printful
  if (event.httpMethod === 'POST') {
    try {
      const orderData = JSON.parse(event.body);
      const response = await fetch('https://api.printful.com/orders', {
        method: 'POST',
        headers,
        body: JSON.stringify(orderData)
      });
      const data = await response.json();
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
  }

  return { statusCode: 405, body: 'Method Not Allowed' };
};
