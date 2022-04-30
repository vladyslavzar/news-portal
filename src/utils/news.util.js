const _apiKey = '86093b2ae8ab4a84b5957f0c566ab1f3';
const proxyUrl = "https://thingproxy.freeboard.io/fetch/"

export const getHotTopic = async () => {
    const res = await fetch(`/v2/top-headlines?language=en&apiKey=${_apiKey}`,{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
  
      });

    if (!res.ok) {
        console.log(`Error, error status: ${res.status}`);
        return;
    }

    const data = await res.json();

    return data;
}

export const getTopicsInCategory = async (category, page = 1) => {
    const res = await fetch(`/v2/top-headlines?language=en&category=${category}&page=${page}&apiKey=${_apiKey}`, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
  
      });

    if (!res.ok) {
        console.log(`Error, error status: ${res.status}`);
        return;
    }

    const data = await res.json();

    return data;
}

export const getTopicsBySearch = async (request, page = 1) => {
    const res = await fetch(`/v2/everything?q=${request}&page=${page}&sortBy=publishedAt&apiKey=${_apiKey}`, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
  
      });

    if (!res.ok) {
        console.log(`Error, error status: ${res.status}`);
        return;
    }

    const data = await res.json();

    return data;
}

export const getTopicByTitle = async (request, page = 1) => {
    const res = await fetch(`/v2/everything?q=${request}&page=${page}&searchIn=title&sortBy=publishedAt&apiKey=${_apiKey}`, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
  
      });

    if (!res.ok) {
        console.log(`Error, error status: ${res.status}`);
        return;
    }

    const data = await res.json();

    return data;
}