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

// You can define `put` and `delete` similarly
