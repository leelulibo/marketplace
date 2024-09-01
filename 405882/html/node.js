// server.js (Node.js with Express)

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/api/register', async (req, res) => {
    const { name, email } = req.body;

    try {
        // Replace with your Chenosis API credentials and setup
        const response = await axios.post('https://preprod.api.chenosis.io/impressions-signature/workflow/CreateSignatureWorkflow/{signatureworkflowid}/CreateSignatureWorkflow/{signatureworkflowid}', {
            // Example payload; adjust according to Chenosis API documentation
            subject: 'Please sign this document to confirm your registration',
            documents: [
                {
                    base64: 'BASE64_ENCODED_DOCUMENT',
                    name: 'Registration Confirmation',
                    file_extension: 'pdf',
                    document_id: '1'
                }
            ],
            recipients: {
                signers: [
                    {
                        email: email,
                        name: name,
                        recipient_id: '1',
                        tabs: {
                            sign_here_tabs: [
                                {
                                    x_position: '100',
                                    y_position: '100',
                                    document_id: '1',
                                    page_number: '1'
                                }
                            ]
                        }
                    }
                ]
            },
            status: 'sent'
        }, {
            headers: {
                'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
                'Content-Type': 'application/json'
            }
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Error:', error);
        res.json({ success: false });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
