import { defineParameterType } from '@cucumber/cucumber';

defineParameterType({
  name: 'contains',
  regexp: /contains|does not contain/,
  transformer: (s) => s === 'contains',
});

defineParameterType({
  name: 'displayed',
  regexp: /is displayed|is not displayed/,
  transformer: (s) => s === 'is displayed',
});

defineParameterType({
  name: 'equals',
  regexp: /equals|does not equal/,
  transformer: (s) => s === 'equals',
});

defineParameterType({
  name: 'exists',
  regexp: /exists|is absent/,
  transformer: (s) => s === 'exists',
});

defineParameterType({
  name: 'includes',
  regexp: /includes|does not include/,
  transformer: (s) => s === 'includes',
});

defineParameterType({
  name: 'empty',
  regexp: /is empty|is not empty/,
  transformer: (s) => s === 'is empty',
});

defineParameterType({
  name: 'checked',
  regexp: /is checked|is unchecked|are checked|are unchecked/,
  transformer: (s) => s === 'is checked' || s === 'are checked',
});

defineParameterType({
  name: 'selected',
  regexp: /is selected|is not selected|are selected|are not selected/,
  transformer: (s) => s === 'is selected' || s === 'are selected',
});

defineParameterType({
  name: 'check',
  regexp: /check|uncheck/,
  transformer: (s) => s === 'check',
});

defineParameterType({
  name: 'array',
  regexp: /\[(.+)\]/,
  transformer: (s) => {
    return s.split(', ');
  },
});

defineParameterType({
  name: 'key_get',
  regexp: /"(\$.+\$)"/,
  transformer: (s) => {
    return globalThis.scenarioContext.get(s);
  },
});

defineParameterType({
  name: 'feature_key_get',
  regexp: /"(@.+@)"/,
  transformer: (s) => {
    return globalThis.featureContext.get(s);
  },
});

defineParameterType({
  name: 'key_set',
  regexp: /"(\$.+\$)"/,
  transformer: (s) => {
    return s;
  },
});

defineParameterType({
  name: 'feature_key_set',
  regexp: /"(@.+@)"/,
  transformer: (s) => {
    return s;
  },
});

defineParameterType({
  name: 'str',
  regexp: /"([^$@]+)"/,
  transformer: (s) => {
    return s;
  },
});

defineParameterType({
  name: 'str_or_key',
  regexp: /"([^"]+)"/,
  transformer: (s) => {
    return globalThis.scenarioContext.has(s)
      ? (globalThis.scenarioContext.get(s) as string)
      : globalThis.featureContext.has(s)
      ? (globalThis.featureContext.get(s) as string)
      : s;
  },
});
