export const getProducts = async () => {
  try {
    const response = await fetch("http://localhost:3001/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

export const getMyProducts = async (id: any) => {
  try {
    const response = await fetch("http://localhost:3001/products/user/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

export const addProduct = async (productData: any) => {
  try {
    const response = await fetch("http://localhost:3001/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData), 
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

export const deleteProducts = async (ids: number[]) => {
  try {
    const response = await fetch("http://localhost:3001/products", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids }),
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

export const updateProduct = async (id: number, productData: any) => {
  try {
    const response = await fetch(`http://localhost:3001/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData), 
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
