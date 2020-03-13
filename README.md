# Marvel Front End API

This is a simple react.js project showcasing how I work with an external API. Fetching data and rendering it on screen.

## Installation

Use the package manager [yarn](https://yarnpkg.com/) to install this project.
If there are a node_modules or yarn.lock files, delete both before running the following commands in your terminal.

```bash
yarn install

yarn start
```

## Usage

You can alter the quantity of characters the API is fetching in the /services/axios/index.js file.
You just need to change the value in limit to your desired amount of marvel characters.

```javascript
export const getCharacters = offset => {
  const o = offset || "0";
  return axios
    .get(`${API_URL}characters`, {
      params: {
        ts: ts,
        apikey: publicKey,
        hash: hash,
        offset: o,
        limit: "40"
      }
    })
    .then(response => {
      const data = response.data.data;
      return data;
    })
    .catch(err => err);
};
```
