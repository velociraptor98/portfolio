// Raymarched metaballs — a glossy teal "liquid metal" mass that morphs over time.
// Fullscreen fragment shader: marches an SDF built from a smooth-min union of
// moving spheres, then shades with diffuse + specular + fresnel and a soft halo.
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uBackground;
uniform vec3 uColorA; // deep teal (shadow side)
uniform vec3 uColorB; // bright teal (lit side / rim)
uniform vec2 uOffset; // shifts the blob within the frame
uniform float uScroll; // parallax drift driven by page scroll

varying vec2 vUv;

// Polynomial smooth minimum — merges SDFs into gooey blends.
float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float sdSphere(vec3 p, vec3 c, float r) {
  return length(p - c) - r;
}

// Scene SDF: four orbiting metaballs blended together.
float map(vec3 p) {
  float t = uTime;
  vec3 c0 = vec3(sin(t * 0.70) * 0.9, cos(t * 0.50) * 0.7, sin(t * 0.30) * 0.6);
  vec3 c1 = vec3(cos(t * 0.40) * 1.1, sin(t * 0.60) * 0.8, cos(t * 0.50) * 0.5);
  vec3 c2 = vec3(sin(t * 0.60 + 1.0) * 0.8, cos(t * 0.70 + 2.0) * 0.9, sin(t * 0.40) * 0.7);
  vec3 c3 = vec3(cos(t * 0.30 + 2.0) * 0.7, sin(t * 0.45 + 1.0) * 0.6, cos(t * 0.60) * 0.8);

  float k = 0.7;
  float d = sdSphere(p, c0, 0.90);
  d = smin(d, sdSphere(p, c1, 0.80), k);
  d = smin(d, sdSphere(p, c2, 0.70), k);
  d = smin(d, sdSphere(p, c3, 0.85), k);
  return d;
}

vec3 calcNormal(vec3 p) {
  vec2 e = vec2(0.0012, 0.0);
  return normalize(vec3(
    map(p + e.xyy) - map(p - e.xyy),
    map(p + e.yxy) - map(p - e.yxy),
    map(p + e.yyx) - map(p - e.yyx)
  ));
}

void main() {
  // Aspect-correct, centered coordinates with a compositional offset.
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  uv += uOffset;
  // Drift the blob down as the page scrolls, for a parallax feel.
  uv.y += uScroll;

  vec3 ro = vec3(0.0, 0.0, 5.2);
  vec3 rd = normalize(vec3(uv, -1.6));

  float t = 0.0;
  float glow = 0.0;
  bool hit = false;

  for (int i = 0; i < 56; i++) {
    vec3 p = ro + rd * t;
    float d = map(p);
    // Accumulate a soft proximity halo even on rays that miss the surface.
    glow += 0.018 / (1.0 + d * d * 8.0);
    if (d < 0.0015) { hit = true; break; }
    if (t > 11.0) break;
    t += d * 0.9;
  }

  vec3 col = uBackground;

  if (hit) {
    vec3 p = ro + rd * t;
    vec3 n = calcNormal(p);
    vec3 lightDir = normalize(vec3(0.55, 0.7, 0.8));

    float diff = clamp(dot(n, lightDir), 0.0, 1.0);
    float spec = pow(clamp(dot(reflect(-lightDir, n), -rd), 0.0, 1.0), 36.0);
    float fres = pow(1.0 - clamp(dot(n, -rd), 0.0, 1.0), 3.0);

    vec3 base = mix(uColorA, uColorB, diff * diff);
    col = base;
    col += spec * vec3(0.95);        // crisp specular highlight
    col += fres * uColorB * 0.7;     // teal rim light
  }

  // Teal aura blended over the background.
  col += glow * uColorB * 0.5;

  gl_FragColor = vec4(col, 1.0);
}
