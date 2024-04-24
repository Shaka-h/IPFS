import { create } from 'ipfs-http-client';
import express from 'express';

const router = express.Router();

// Connect to the IPFS API
const ipfs = create('/ip4/127.0.0.1/tcp/5001');

// Example metadata
const metadata = {
    name: 'My NFT',
    description: 'This is an example NFT',
    image: 'https://example.com/image.jpg',
    attributes: [
        {
            trait_type: 'Color',
            value: 'Blue',
        },
    ],
};

async function addMetadata(metadata) {
    try {
        // Add metadata to IPFS 
        const { cid } = await ipfs.add(JSON.stringify(metadata));

        console.log('Metadata added to IPFS with CID:', cid.toString());
        return cid.toString();
    } catch (error) {
        console.error('Error adding metadata to IPFS:', error);
        throw error;
    }
}

router.post('/createCollection', async (req, res) => {
    try {
        // Call the addMetadata function with the metadata object
        const cid = await addMetadata(metadata);
        console.log('Metadata added successfully with CID:', cid);
        res.status(200).json({ cid });
    } catch (error) {
        console.error('Failed to add metadata:', error);
        res.status(500).json({ error: 'Failed to add metadata' });
    }
});

export default router;
