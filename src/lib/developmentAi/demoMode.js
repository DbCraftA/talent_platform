export function isDevelopmentDemoEnabled(env) {
  return env?.DEV === true && env?.VITE_DEV_AI_DEMO === 'true'
}
