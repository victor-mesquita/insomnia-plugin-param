const dateFns = require('date-fns');

function getTypeFormat(typeFormat) {
  const [type, format] = typeFormat.split('/');
  return [type, format || ''];
}

function getHtmlInputType(typeFormat) {
  const [type] = getTypeFormat(typeFormat);
  if (typeFormat === 'string/password') return 'password';
  if (type === 'integer') return 'number';
  if (type === 'timestamp') return 'datetime-local';
  if (type === 'color') return 'color';
  return 'text'
}

function formatInteger(value, format) {
  const integer = parseInt(value);
  return isNaN(integer) ? '0' : integer.toString();
}

function formatTimestamp(value, format) {
  try {
    const date = dateFns.parseISO(value);
    if (format === 'unix-ms') return dateFns.format(date, 'T');
    if (format === 'iso-8601') return dateFns.formatISO(date);
    return dateFns.format(date, 't');
  } catch (e) {
    return '0';
  }
}

function formatValue(value, typeFormat) {
  const [type, format] = getTypeFormat(typeFormat);
  if (type === 'timestamp') return formatTimestamp(value, format);
  if (type === 'integer') return formatInteger(value, format);
  return value;
}

function extractParamComponents(spec) {
  let name = 'Parameter', description = '';
  const regex = /^\s*(:?\s*[^:]+)(?::(.+))?$/;
  const matches = spec.match(regex);
  if (matches) {
    name = matches[1];
    description = matches[2] || '';
  }
  return [name.trim(), description.trim()];
}

module.exports = {
  getTypeFormat,
  getHtmlInputType,
  formatInteger,
  formatTimestamp,
  formatValue,
  extractParamComponents,
};
