# Food Decision Making Machine - Server

Server component for the FDMM webapp, see [here](https://github.com/soda3x/food-decision-making-machine) for the client component.

## Usage

create a `.env` file with the following environment variables:

```properties
PORT = <portnumber>
CHOICES_URL = <url-to-choices-txt>
CHOICES_WOOLIES_URL = <url-to-woolies-choices-txt>
CORS_URL = <url-where-the-client-will-be-served-incl-port-if-needed>
CORS_URL_LOCAL = <url-to-dev-client-probably-localhost-plus-port>
```

`npm i` then run with `npm run start`
