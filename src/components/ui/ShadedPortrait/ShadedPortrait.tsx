/**
 * ShadedPortrait: WebGL canvas component rendering a tactile Risograph duotone shader for author portraits.
 * Communicates with: ShadedPortrait.module.css, asymmetricRadius.ts, and tokens.css.
 */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { getAsymmetricRadius, RadiusTier } from '@/utils/asymmetricRadius';
import styles from './ShadedPortrait.module.css';

export interface ShadedPortraitProps {
  imageSrc?: string;
  alt?: string;
  className?: string;
  seed?: string;
  radiusTier?: RadiusTier;
  captionTitle?: string;
  specBadge?: string;
}

const VERTEX_SHADER_SOURCE = `
attribute vec2 a_position;
attribute vec2 a_texCoord;
varying vec2 v_texCoord;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texCoord = a_texCoord;
}
`;

const FRAGMENT_SHADER_SOURCE = `
precision mediump float;
uniform sampler2D u_image;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_hover;
varying vec2 v_texCoord;

const vec3 COLOR_INK = vec3(0.259, 0.349, 0.361);
const vec3 COLOR_TERRACOTTA = vec3(0.859, 0.592, 0.498);
const vec3 COLOR_AQUA = vec3(0.502, 0.816, 0.859);
const vec3 COLOR_PAPER = vec3(0.980, 0.973, 0.953);

float random(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = v_texCoord;
  vec2 shift = vec2(0.0035, -0.0025) * u_hover;

  float r = texture2D(u_image, uv + shift).r;
  float g = texture2D(u_image, uv).g;
  float b = texture2D(u_image, uv - shift).b;

  float lum = dot(vec3(r, g, b), vec3(0.299, 0.587, 0.114));
  lum = smoothstep(0.10, 0.90, lum);

  float grain = (random(uv * u_resolution + fract(u_time * 0.08)) - 0.5) * 0.055;
  float ditheredLum = clamp(lum + grain, 0.0, 1.0);

  vec3 finalColor;
  if (ditheredLum < 0.36) {
    float t = ditheredLum / 0.36;
    finalColor = mix(COLOR_INK, COLOR_TERRACOTTA, t);
  } else if (ditheredLum < 0.70) {
    float t = (ditheredLum - 0.36) / 0.34;
    finalColor = mix(COLOR_TERRACOTTA, COLOR_AQUA, t);
  } else {
    float t = (ditheredLum - 0.70) / 0.30;
    finalColor = mix(COLOR_AQUA, COLOR_PAPER, t);
  }

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

const resolveAssetUrl = (pathStr: string): string => {
  if (pathStr.startsWith('http://') || pathStr.startsWith('https://') || pathStr.startsWith('data:')) {
    return pathStr;
  }
  const cleanBase = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const cleanPath = pathStr.startsWith('/') ? pathStr.slice(1) : pathStr;
  return `${cleanBase}${cleanPath}`;
};

export const ShadedPortrait: React.FC<ShadedPortraitProps> = ({
  imageSrc = 'images/author-portrait.jpg',
  alt = 'GhostBat101 System Architect Portrait',
  className = '',
  seed = 'ghostbat-portrait-plate',
  radiusTier = 'large',
  captionTitle = 'CREATOR // SPECIMEN 01',
  specBadge = 'RISO // 4-INK',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoverCapable, setIsHoverCapable] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const computedRadius = getAsymmetricRadius(seed, radiusTier);
  const resolvedSrc = resolveAssetUrl(imageSrc);

  const handleMouseEnter = useCallback(() => {
    if (isHoverCapable && !prefersReducedMotion) {
      setIsHovered(true);
    }
  }, [isHoverCapable, prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    if (isHoverCapable) {
      setIsHovered(false);
    }
  }, [isHoverCapable]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    setIsHoverCapable(hoverQuery.matches);
    setPrefersReducedMotion(motionQuery.matches);

    const onHoverChange = (e: MediaQueryListEvent) => setIsHoverCapable(e.matches);
    const onMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);

    hoverQuery.addEventListener('change', onHoverChange);
    motionQuery.addEventListener('change', onMotionChange);

    return () => {
      hoverQuery.removeEventListener('change', onHoverChange);
      motionQuery.removeEventListener('change', onMotionChange);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertexShader) return;
    gl.shaderSource(vertexShader, VERTEX_SHADER_SOURCE);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragmentShader) return;
    gl.shaderSource(fragmentShader, FRAGMENT_SHADER_SOURCE);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        0.0, 1.0,
        1.0, 1.0,
        0.0, 0.0,
        0.0, 0.0,
        1.0, 1.0,
        1.0, 0.0,
      ]),
      gl.STATIC_DRAW
    );

    const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
    gl.enableVertexAttribArray(texCoordLocation);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const hoverLocation = gl.getUniformLocation(program, 'u_hover');

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([66, 89, 92, 255])
    );

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = resolvedSrc;

    let imageLoaded = false;
    img.onload = () => {
      imageLoaded = true;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      draw();
    };

    let animationFrameId: number;
    let startTime = performance.now();
    let currentHover = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const displayWidth = Math.floor(rect.width * dpr);
      const displayHeight = Math.floor(rect.height * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
        gl.uniform2f(resolutionLocation, displayWidth, displayHeight);
      }
    };

    const draw = () => {
      if (!imageLoaded) return;
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = (time: number) => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      resize();

      const elapsed = (time - startTime) * 0.001;
      const targetHover = isHovered ? 1.0 : 0.0;
      currentHover += (targetHover - currentHover) * 0.12;

      gl.uniform1f(timeLocation, prefersReducedMotion ? 0.0 : elapsed);
      gl.uniform1f(hoverLocation, currentHover);

      draw();

      if (!prefersReducedMotion || Math.abs(targetHover - currentHover) > 0.01) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      gl.deleteTexture(texture);
      gl.deleteBuffer(positionBuffer);
      gl.deleteBuffer(texCoordBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [resolvedSrc, isVisible, isHovered, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`${styles.portraitCard} ${className}`}
      style={{ borderRadius: computedRadius }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-hovered={isHovered}
    >
      <div className={styles.portraitHeader}>
        <span className={styles.portraitTitle}>{captionTitle}</span>
        <span className={styles.portraitBadge}>{specBadge}</span>
      </div>

      <div className={styles.canvasWrapper}>
        <canvas
          ref={canvasRef}
          className={styles.portraitCanvas}
          aria-label={alt}
          role="img"
        />
        {!prefersReducedMotion && (
          <div className={styles.statusPill}>
            <span
              className={`${styles.liveIndicator} ${
                isHovered ? styles.liveIndicatorActive : ''
              }`}
            />
            <span>{isHovered ? 'PLATE SHIFT' : 'RISO SHADER'}</span>
          </div>
        )}
      </div>

      <div className={styles.portraitFooter}>
        <span className={styles.footerKicker}>GHOSTBAT101 // DHAKA, BD</span>
        <span className={styles.footerSpecs}>494x618 // 0 BLUR</span>
      </div>
    </div>
  );
};
