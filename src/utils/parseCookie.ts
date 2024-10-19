const parseCookie = (str: string) =>
  str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc: {[k: string]: any}, v) => {
      if (v[0] && v[1]) {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      }
      return acc;
    }, {});

export default parseCookie;