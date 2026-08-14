exports.handler = async function(event, context) {
    const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;

    if (!PRINTFUL_API_KEY) {
        console.error('Missing PRINTFUL_API_KEY environment variable.');
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: 'Missing PRINTFUL_API_KEY environment variable in Netlify.' })
        };
    }

    try {
        // Fetching store sync products from Printful API
        const response = await fetch('https://api.printful.com/store/products', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0'
            }
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Printful API Error Response:', data);
            return {
                statusCode: response.status,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: data.error?.message || 'Printful API returned an error' })
            };
        }

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error('Server error fetching from Printful:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: error.message })
        };
    }
};
