const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;

    try {
        const response = await fetch('https://api.printful.com/store/products', {
            headers: {
                'Authorization': `Bearer ${PRINTFUL_API_KEY}`
            }
        });

        const data = await response.json();

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch products from Printful' })
        };
    }
};
