// Fullscreen triangle/quad pass-through. Positions on the PlaneGeometry(2,2)
// already span clip space, so we write them straight to gl_Position.
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
