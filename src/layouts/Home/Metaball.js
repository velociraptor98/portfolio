import { useTheme } from 'components/ThemeProvider';
import { Transition } from 'components/Transition';
import { useReducedMotion, useSpring } from 'framer-motion';
import { useInViewport, useWindowSize } from 'hooks';
import { useEffect, useRef } from 'react';
import {
  Camera,
  Color,
  Mesh,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from 'three';
import { rgbToThreeColor } from 'utils/style';
import { cleanRenderer, cleanScene } from 'utils/three';
import styles from './Metaball.module.css';
import fragmentShader from './metaballFragment.glsl';
import vertexShader from './metaballVertex.glsl';

// Teal palette for the glossy "liquid metal" mass.
const colorDeep = new Color(0.02, 0.16, 0.18);
const colorBright = new Color(0.16, 0.9, 0.8);

export const Metaball = props => {
  const theme = useTheme();
  const { rgbBackground } = theme;
  const start = useRef(Date.now());
  const canvasRef = useRef();
  const renderer = useRef();
  const camera = useRef();
  const scene = useRef();
  const material = useRef();
  const mesh = useRef();
  const uniforms = useRef();
  const reduceMotion = useReducedMotion();
  const isInViewport = useInViewport(canvasRef);
  const windowSize = useWindowSize();
  const scroll = useSpring(0, { stiffness: 40, damping: 18, mass: 1 });

  useEffect(() => {
    const { innerWidth, innerHeight } = window;

    renderer.current = new WebGLRenderer({
      canvas: canvasRef.current,
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.current.setSize(innerWidth, innerHeight);
    renderer.current.setPixelRatio(1);

    camera.current = new Camera();
    scene.current = new Scene();

    uniforms.current = {
      uTime: { value: 0 },
      uResolution: { value: new Vector2(innerWidth, innerHeight) },
      uBackground: { value: new Color(...rgbToThreeColor(rgbBackground)) },
      uColorA: { value: colorDeep },
      uColorB: { value: colorBright },
      // Push the blob toward the right so it sits beside the hero text.
      uOffset: { value: new Vector2(-0.62, -0.05) },
      uScroll: { value: 0 },
    };

    material.current = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: uniforms.current,
      depthTest: false,
      depthWrite: false,
    });

    mesh.current = new Mesh(new PlaneGeometry(2, 2), material.current);
    scene.current.add(mesh.current);

    return () => {
      cleanScene(scene.current);
      cleanRenderer(renderer.current);
    };
    // Set up once; the background tint is synced separately below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the background tint in sync with the active theme.
  useEffect(() => {
    if (!uniforms.current) return;
    uniforms.current.uBackground.value.setRGB(...rgbToThreeColor(rgbBackground));
  }, [rgbBackground]);

  useEffect(() => {
    const { width, height } = windowSize;

    renderer.current.setSize(width, height);
    uniforms.current.uResolution.value.set(width, height);

    // Tighten the composition on smaller screens.
    uniforms.current.uOffset.value.set(width <= 696 ? 0.0 : -0.62, -0.05);

    if (reduceMotion) {
      renderer.current.render(scene.current, camera.current);
    }
  }, [reduceMotion, windowSize]);

  // Feed page scroll into a spring for smooth parallax drift.
  useEffect(() => {
    const handleScroll = () => scroll.set(window.scrollY);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scroll]);

  // When the animation loop isn't running, still react to scroll with a render.
  useEffect(() => {
    const update = value => {
      if (!uniforms.current) return;
      uniforms.current.uScroll.value = (value / window.innerHeight) * 0.32;
      if (reduceMotion || !isInViewport) {
        renderer.current.render(scene.current, camera.current);
      }
    };
    update(scroll.get());
    return scroll.onChange(update);
  }, [scroll, reduceMotion, isInViewport]);

  useEffect(() => {
    let animation;

    const animate = () => {
      animation = requestAnimationFrame(animate);
      uniforms.current.uTime.value = 0.0006 * (Date.now() - start.current);
      uniforms.current.uScroll.value = (scroll.get() / window.innerHeight) * 0.32;
      renderer.current.render(scene.current, camera.current);
    };

    if (!reduceMotion && isInViewport) {
      animate();
    } else {
      renderer.current.render(scene.current, camera.current);
    }

    return () => {
      cancelAnimationFrame(animation);
    };
  }, [isInViewport, reduceMotion, scroll]);

  return (
    <Transition in timeout={2000}>
      {visible => (
        <canvas
          aria-hidden
          className={styles.canvas}
          data-visible={visible}
          ref={canvasRef}
          {...props}
        />
      )}
    </Transition>
  );
};
