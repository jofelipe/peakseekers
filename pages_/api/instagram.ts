import { validate } from 'uuid';
import { NextApiRequest, NextApiResponse } from "next";
import { getScreenshot } from "../../services/instagram/chromium";
import getInstagramTemplate from '../../services/instagram/template';


const isDev = !process.env.AWS_REGION;

export default async function (request: NextApiRequest, response: NextApiResponse) {
    try {

        const title = String(request.query.title);
        let username = String(request.query.username);
        const imageUrl = String(request.query.imageUrl).replace('/', '%2F');
        const mountainName = String(request.query.mountainName);
        const mountainElevation = String(request.query.mountainElevation);

        if(title === '' || username === '' || imageUrl === '' || mountainName === '' || mountainElevation === '') {
            throw new Error('Missing required fields.')
        }

        if(validate(username)) {
            username === '';
        }

        // return response.json({ title, username, imageUrl, mountainName, mountainElevation });

        const html = getInstagramTemplate(title, username, imageUrl, mountainName, mountainElevation);        

        const file = await getScreenshot(html, isDev);

        response.setHeader('Content-Type', 'image/png');
        response.setHeader('Cache-Control', 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000');

        return response.end(file);

    } catch(err) {
        console.error(err);

        response.status(500).send('Internal server error :-(')
    }
}