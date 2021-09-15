# Scan QR Code
This repository contains frontend `React.js` app and code for `AWS Lambda`. 

## Available Scripts for frontend
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 
So, in the frontend directory (`./frontend`), you can run default CRA scripts (`npm start` , `npm test`, `npm run build`).

### Generating React Function Component

For generating React components you can use `genRC.js` script from the frontend dir.
It will create directory which contains:
- `.tsx` file with basic FC component template
- `.spec.tsx` file with basic test file template
- (optional) empty `.module.scss` file, wouldn't create by default

For created dir would be called `git add` command.

Default target directory is `./src/features/`.

Default script call is `node genRC.js <ComponentName>`
or you can call it form `package.json` with npm `npm run gc -- <ComponentName>`.

#### Receiving params:
- -s - Create empty `.module.scss` and add import of this file into component
- -t - Include `useTranslation` hook into component
- -p - Include empty interface for component props
- -u - Create component in `./src/utils/components/` instead of `./src/features/`

Base templates of created files are located in `genRC.js`.

### Deploy web app

Project use `surge.sh` (free plan) for deploy and host frontend.
For build and deploy use `npm run deploy` command.
It will additionally copy `index.html` as `200.html` inside `build` folder.
It is needed for [correct routing by surge.sh service](https://surge.sh/help/adding-a-200-page-for-client-side-routing).

## AWS Lambdas

Lambdas service is based on `serverless` template `aws-nodejs-typescript` and has own [README.md](./aws-lambda/link-preview-service/README.md).
At the moment it has the only lambda function.
