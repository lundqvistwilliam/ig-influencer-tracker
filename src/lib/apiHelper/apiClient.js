/*
export async function get(url, onSuccess, onError) {
  try {
    const response = await fetch(url);

    const result = await response.json();

    if (response.ok && !result.error) {
      onSuccess(result);
    } else {
      onError(result.error || 'No result');
    }
  } catch (err) {
    onError(err);
  }
}
  */
export async function get(url, onSuccess, onError) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer ' + await getToken(), 
    };

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.error) {
      onError(result.error || 'No result');
    } else {
      onSuccess(result);
    }
  } catch (err) {
    onError(err.message || 'Something went wrong');
  }
}


export async function post(url, data, onSuccess, onError) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok && !result.error) {
      onSuccess(result);
    } else {
      onError(result.error || 'No result');
    }
  } catch (err) {
    onError(err);
  }
}

export async function _del(url, onSuccess, onError) {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + await getToken(), 
      }
    });

    const result = response.status !== 204 ? await response.json() : null;

    if (response.ok) {
      onSuccess(result);
    } else {
      onError(result?.error || `Delete failed with status: ${response.status}`);
    }
  } catch (err) {
    onError(err.message || 'Something went wrong during delete request');
  }
}

