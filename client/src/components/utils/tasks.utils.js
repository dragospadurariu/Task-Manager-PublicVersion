import axios from 'axios';
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const addTaskUtils = async (columnID, name) => {
  const body = JSON.stringify({ name });

  try {
    const res = await axios.post(`/task/column/${columnID}`, body, config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
