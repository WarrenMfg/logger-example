# Logger Example

Simulate throwing an error and it gets logged to an errors file as a JSON object.

Click "Get errors" button to get a descending list of errors with the time, message, and call stack for each log. Useful for an app health dashboard.

## Errors

![Errors](readme-images/errors.png)

## Analytics

Simulate a user interaction you want to track and it gets logged to an analytics file as a JSON object.

Click "Get analytics" button to get a descending list of analytics with the time and analytics for each log. Useful for data analysis.

![Analytics](readme-images/analytics.png)

# How to run locally

- After cloning, install npm packages

  - `npm install`

- Use parcel-bundler to watch for frontend changes

  - `npm run watch`

- Use nodemon to watch for backend changes

  - `npm run startDev`
