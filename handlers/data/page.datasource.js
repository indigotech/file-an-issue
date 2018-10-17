module.exports = (() => {
    const request = url => {
      const nodeRequest = require('request');
      return new Promise((resolve, reject) => {
        nodeRequest(url, (error, response) => {
          if (error) {
            reject(error);
          }
          resolve(response);
        });
      });
    };
  
    const extractTitle = body => {
      const titleMatch = body.match(/<title.*>\n?(.*?)<\/title>/);
      if (titleMatch && titleMatch[1]) {
        return titleMatch[1];
      } else {
        return null;
      }
    };
    const extractDescription = body => {
      const descriptionMatch = body.match('<meta name="description" content="(.*)"');
      if (descriptionMatch && descriptionMatch[1]) {
        return descriptionMatch[1].split('"')[0];
      } else {
        return null;
      }
    };
  
    const extractPageInfo = response => {
      const body = response.body;
      if (body) {
        return {
          title: extractTitle(body),
          description: extractDescription(body),
        };
      } else {
        return {};
      }
    };
  
    const info = url => {
      return request(url).then(extractPageInfo);
    };
  
    return {
      info,
    };
  })();
  