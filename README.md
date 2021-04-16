# Project Overview

This project evaluates a news article with Natural Language Processing.
By submitting a valid URL of a news web page OR a text, a request is sent to MeaningCloud API, evaluates news on the page, and gives back feedback about the news polarity and confidence.

## Architecture

### **test** Folder

Contains some tests for the src/js files.

### dist Folder

Contains the build files of the src files for porduction.

### src Folder

Have two folders of client and server.
client has js files to handle the form, styles written in sass, views has a one index.html file.
Server has index.js that start the express server, and mockAPI.js that has the keys of MeaningCloud API.

## Configs

There are two webpack config files for development and production.
The production build script runs successfully and generates a dist folder.
The development build script runs successfully and start a dev server.

## API

The app makes a successful call to the api on form submission to get the key, then it use the key and the URL to send a request to the MeaningCloud API.
Response is presented in the view.

## Offline Functionality

The project has set up service workers in webpack.

## Testing

Project has Jest installed, there is an npm script to run Jest, and the tests all pass.
Every src/js file has its own test.

## Interactions

The page built is very simple.
A single field form used to validate the input URL using regex, and prsenent feedback of the URL page content as the status of the request, polarity ( posistive or negative ), and confidence ( percentage ).

## Deploying

Deployed in Heroku.
https://evaluate-news-nlp-wepback.herokuapp.com/
