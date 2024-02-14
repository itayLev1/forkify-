//& Lesson: Helpers and Configuration files
//~ this file holds functions that we use all over the project.

import { TIMEOUT_SEC } from "./config.js";

const timeout = function (s = TIMEOUT_SEC) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};


export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(uploadData),
      })
      : fetch(url);


    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;

  } catch (err) {
    throw err // this will propagate the err to the calling function loadRecipe()
    // console.log(`getJSON Error 😎: ${err}`);
  }
}

/*
export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;

  } catch (err) {
    throw err // this will propagate the err to the calling function loadRecipe()
    // console.log(`getJSON Error 😎: ${err}`);
  }
}
*/
/*
export const sendJSON = async function (url, uploadData) {
  try {
    // when no instructions are sent with the fetch function the default behavior is to use a GET method, when we need to post using the fetch function we send in the second parameter an instructions object. 
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(uploadData),
    });

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;

  } catch (err) {
    throw err // this will propagate the err to the calling function loadRecipe()
    // console.log(`getJSON Error 😎: ${err}`);
  }
}
*/