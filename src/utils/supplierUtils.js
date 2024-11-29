/**
 * Formats a list of suppliers into an array of options for the Select component.
 * @param {Array} data - Array of item objects.
 * @param {String} valueKey - The key in the supplier object to use as the value.
 * @param {String} labelKey - The key in the supplier object to use as the label.
 * @returns {Array} Formatted options for the Select component.
 */
export const formatOptions = (data, valueKey, labelKey) => {
  if (!Array.isArray(data)) return [];
  return data.map((item) => ({
    value: item[valueKey],
    label: item[labelKey],
  }));
};
