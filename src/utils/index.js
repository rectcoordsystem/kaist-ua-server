const parseJSON = (jsonString, fallback = {}) => {
  if (typeof jsonString === 'object') {
    return jsonString;
  }

  try {
    return JSON.parse(jsonString);
  } catch (err) {
    console.error(jsonString);
    console.error(err.message);
    return fallback;
  }
};

module.exports = { parseJSON };
