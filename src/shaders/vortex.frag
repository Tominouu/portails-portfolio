// vortex.frag
precision mediump float;
uniform float uTime;
uniform float uIntensity;
uniform vec3 uColor;
varying vec2 vUv;

// Simple pseudo-noise
float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123); }
float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.,0.));
  float c = hash(i + vec2(0.,1.));
  float d = hash(i + vec2(1.,1.));
  vec2 u = f*f*(3.0-2.0*f);
  return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
}

void main(){
  vec2 uv = vUv - 0.5;
  float r = length(uv);
  float angle = atan(uv.y, uv.x);
  float t = uTime * 0.6;
  // swirl
  float swirl = sin(r * 10.0 - t * 2.0) * 0.2 * uIntensity;
  angle += swirl;
  vec2 newUv = vec2(cos(angle), sin(angle)) * r + 0.5;

  // noise based glow
  float n = noise(newUv * 12.0 + t * 0.3);
  float glow = smoothstep(0.6, 0.15, r) * (0.5 + n * 0.5);

  vec3 col = mix(vec3(0.01), uColor, glow);
  // rim
  float rim = smoothstep(0.4, 0.35, r);
  col += vec3(0.8,0.2,1.0) * rim * 0.15;

  gl_FragColor = vec4(col, clamp(glow, 0.0, 1.0));
}
