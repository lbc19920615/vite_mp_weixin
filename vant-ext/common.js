function mapKeys(source, target, map) {
  Object.keys(map).forEach((key) => {
      if (source[key]) {
          target[map[key]] = source[key];
      }
  });
}

export function ZComponent(zOptions) {
  const options = {
    styleIsolation:'apply-shared'
  };
  mapKeys(vantOptions, options, {
    data: 'data',
    props: 'properties',
  })
  Component(options);
}