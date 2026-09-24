precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_pointer;
uniform vec3 u_pulse;
uniform float u_time;
uniform float u_energy;
varying vec2 v_uv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 cell = floor(p);
  vec2 edge = fract(p);
  edge = edge * edge * (3.0 - 2.0 * edge);
  return mix(
    mix(hash(cell), hash(cell + vec2(1.0, 0.0)), edge.x),
    mix(hash(cell + vec2(0.0, 1.0)), hash(cell + vec2(1.0, 1.0)), edge.x),
    edge.y
  );
}

void main() {
  vec2 uv = v_uv;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 point = vec2(uv.x * aspect, uv.y);
  vec2 cursor = vec2(u_pointer.x * aspect, u_pointer.y);
  float time = u_time * (0.16 + u_energy * 0.19);

  float broad = noise(vec2(uv.x * 3.3, uv.y * 2.0) + vec2(time, -time * 0.3));
  float fine = noise(vec2(uv.x * 9.0, uv.y * 5.0) - vec2(time * 0.7, time));
  float drift = sin(uv.x * 8.5 - time * 3.0 + broad * 3.0) * 0.035;
  float waterline = uv.y + drift + (broad - 0.5) * 0.18 + (fine - 0.5) * 0.035;

  vec3 jungle = vec3(0.0, 0.18, 0.17);
  vec3 ocean = vec3(0.0, 0.36, 0.39);
  vec3 teal = vec3(0.23, 0.68, 0.65);
  vec3 sand = vec3(0.92, 0.82, 0.61);
  vec3 color = mix(jungle, ocean, smoothstep(0.03, 0.92, waterline));
  color = mix(color, teal, smoothstep(0.38, 0.91, waterline) * 0.42);

  float contours = sin((waterline + broad * 0.035) * (32.0 + u_energy * 17.0));
  float foam = pow(max(contours, 0.0), 17.0) * (0.11 + u_energy * 0.11);
  color += sand * foam;

  float distanceToPointer = length(point - cursor);
  float current = sin(distanceToPointer * 25.0 - u_time * 1.5);
  color += teal * current * exp(-distanceToPointer * 4.2) * 0.08;

  float pulseAge = u_pulse.z;
  float pulseDistance = length(point - vec2(u_pulse.x * aspect, u_pulse.y));
  float ring = exp(-pow((pulseDistance - pulseAge * 0.45) * 35.0, 2.0));
  color += sand * ring * max(0.0, 1.0 - pulseAge) * 0.38;

  float sunlight = smoothstep(0.78, 0.98, uv.x) * smoothstep(0.25, 0.8, uv.y);
  color = mix(color, sand, sunlight * 0.12);
  gl_FragColor = vec4(color, 1.0);
}
