const axios = require('axios');
const tldjs = require('tldjs')

module.exports = (domain) => {
  let domainObj = tldjs.parse(domain)
  if (domain && domainObj.isValid && domainObj.domain) {
    domain = domainObj.domain
    const request_url = `https://crt.sh/?q=%25.${domain}&output=json`
    axios.defaults.headers.common["User-Agent"] = getRandomUserAgent()
    return axios.get(request_url)
      .then((res) => {
           if(res && res.data && Array.isArray(res.data)){
              return res.data
           }else{
            return Promise.reject(new Error("Unexpeced response from the server"))
           }
            
      })
      .catch((error) => {
        return Promise.reject(new Error("Error while processing request"))
      })


  } else {
    return Promise.reject(new Error("Invalid domain name"))
  }
}

getRandomUserAgent = () => {
  const userAgents = ["Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
    "Mozilla/5.0 (Windows NT 5.1; rv:33.0) Gecko/20100101 Firefox/33.0",
    "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko"
  ];

  return userAgents[Math.floor(Math.random() * userAgents.length)]

}