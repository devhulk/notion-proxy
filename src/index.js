/**
 * Example someHost is set up to take in a JSON request
 * Replace url with the host you wish to send requests to
 * @param {string} someHost the host to send the request to
 * @param {string} url the URL to send the request to
 *
 */

/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 * @param {Response} response
 */
const someHost = `https://api.notion.com/v1/databases/00732120edcc4cda8582388699d541b6/query`;
const url = someHost; 


async function parsePages(pages) {
    let filtered = [];
    pages.forEach(async page => {
        let obj = {id: page.id};
        filtered.push(obj)
    })

    return filtered;

}


async function gatherResponse(response) {
    const db_json = await response.json();
    const pages = await parsePages(db_json.results);
    return JSON.stringify(pages);
}

async function handleRequest() {
  let token = await YouAutoDev.get('NOTION_TOKEN')
  const init = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Notion-Version': '2022-06-28',
      'content-type': 'application/json;charset=UTF-8',
      'Authorization': "Bearer " + token,
    },
  };
  const response = await fetch(url, init)
  const results = await gatherResponse(response)
  return new Response(results, init);
}

addEventListener('fetch', event => {
  return event.respondWith(handleRequest());
});

addEventListener('fetch', event => {
  console.log(`Received new request: ${event.request.url}`);
  event.respondWith(handleEvent(event));
});
