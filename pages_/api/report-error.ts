const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

export default (request, response) => {
    const { name, email, source, pageUrl, description } = request.body;

    if (name === '' || email === '' || description === '') {
        throw new Error('Missing required fields.');
    }

    const oauth2Client = new OAuth2(
        process.env.OAUTH2_CLIENT_ID,
        process.env.OAUTH2_CLIENT_SECRET,
        'https://developers.google.com/oauthplayground'
    );

    oauth2Client.setCredentials({
        refresh_token: process.env.OAUTH2_REFRESH_TOKEN,
    });
    const accessToken = oauth2Client.getAccessToken();

    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'hi@peakseekers.app',
            clientId: process.env.OAUTH2_CLIENT_ID,
            clientSecret: process.env.OAUTH2_CLIENT_SECRET,
            refreshToken: process.env.OAUTH2_REFRESH_TOKEN,
            accessToken: accessToken,
            tls: {
                rejectUnauthorized: false,
            },
        },
    });

    const mailOptions = {
        from: email,
        to: 'hi@peakseekers.app',
        subject: `Peakseekers - Error reported ${source}`,
        generateTextFromHTML: true,
        html: `<h3>Error reported at Peakseekers ${source && `(${source})`}</h3>
        <ul style="padding: 0">
            ${pageUrl && `<li><b>Page: </b>${pageUrl}</li>`}
            <li><b>Description: </b>${description}</li>
            <li><b>User: </b>${name} (${email})</li>
        </ul>`,
    };

    smtpTransport.sendMail(mailOptions, (err, data) => {
        if (err) {
            response.send('error' + JSON.stringify(err));
        } else {
            response.send('Error reported.');
        }
        smtpTransport.close();
    });
};
