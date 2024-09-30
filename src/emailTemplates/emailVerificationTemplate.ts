const emailVerificationTemplate = `
    <body>
        <p>Hi,</p>

        <p>You're almost done setting up your Gamma account.</p>
        <p>Click the button below to verify your email address.</p>

        <a href="{{link}}">Verify your email address</a>

        <small>If you didn’t ask to verify this email address, you can ignore this email.</small>

        <p>Regards,</p>
        <p>{{support.team}}</p>
        <p>{{support.email}}</p>
    </body>
`

export default emailVerificationTemplate;