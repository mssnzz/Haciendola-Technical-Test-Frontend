
export async function loginUser(username: string, password: string) {
  const response = await fetch("http://localhost:3001/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    return { error: data.error };
  }

  return { data };
}

export const profile = async (token: any) => {
  try {
    const response = await fetch("http://localhost:3001/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
    });

    if (!response.ok) {
      return {
        error: true,
        message: "Network response was not ok",
        status: response.status,
      };
    }

    const data = await response.json();
    return { error: false, data };
  } catch (error: any) {
    return { error: true, message: error.message };
  }
};
export async function register(username: string, password: string) {
  const response = await fetch("http://localhost:3001/users/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    return { error: data.error };
  }

  return { data };
}
export async function resetPassword(username: any, newPassword: any) {
  const response = await fetch("http://localhost:3001/users/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, newPassword }),
  });

  const data = await response.json();

  if (!response.ok) {
    return { error: data.error };
  }

  return { data };
}
