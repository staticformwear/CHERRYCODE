exports.handler = async function(event, context) {
    const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;

    if (!PRINTFUL_API_KEY) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Missing PRINTFUL_API_KEY environment variable in Netlify.' })
        };
    }

    try {
        // Fetching store sync products from Printful
        const response = await fetch('https://api.printful.com/store/products', {
            headers: {
                'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
                'Content-Type': 'application/json',
                // If you have a specific Printful store ID, you can uncomment and add it below:
                // 'X-PF-Store-Id': 'YOUR_STORE_ID_HERE'
            }
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                statusCode: response.status,
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
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
