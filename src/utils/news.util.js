
const proxyUrl = "https://wonderful-blancmange-79f0ea.netlify.app/.netlify/functions/api/"

export const getHotTopic = async () => {
    const res = await fetch(`${proxyUrl}/cors/getHotTopic`,{
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
    const res = await fetch(`${proxyUrl}/cors/getTopicsInCategory/category/${category}/page/${page}`, {
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
    const res = await fetch(`${proxyUrl}/cors/getTopicsBySearch/request/${request}/page/${page}`, {
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
    const res = await fetch(`${proxyUrl}/cors/getTopicByTitle/request/${request}/page/${page}`, {
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