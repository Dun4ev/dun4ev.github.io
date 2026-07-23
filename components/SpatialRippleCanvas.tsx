import React, { useEffect, useRef } from 'react';

interface SpatialRippleCanvasProps {
  originX: number;
  originY: number;
  duration?: number;
  onComplete: () => void;
}

const VERTEX_SHADER = `
  attribute vec2 a_position;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform vec2 u_origin;
  uniform float u_progress;

  float crest(float distanceFromOrigin, float radius, float width) {
    float offset = abs(distanceFromOrigin - radius);
    return exp(-pow(offset / width, 2.0));
  }

  void main() {
    vec2 point = gl_FragCoord.xy - u_origin;
    float distanceFromOrigin = length(point);
    float angle = atan(point.y, point.x);
    float viewportScale = min(u_resolution.x, u_resolution.y);
    float eased = 1.0 - pow(1.0 - min(u_progress, 1.0), 3.0);
    float radius = eased * viewportScale * 1.35;

    float liquidOffset =
      sin(angle * 9.0 + u_progress * 8.0) * 5.0 +
      sin(angle * 17.0 - u_progress * 11.0) * 2.5;
    float warpedDistance = distanceFromOrigin + liquidOffset;

    float primary = crest(warpedDistance, radius, 8.0);
    float secondary = crest(warpedDistance, max(0.0, radius - 34.0), 11.0) * 0.62;
    float tertiary = crest(warpedDistance, max(0.0, radius - 72.0), 15.0) * 0.32;
    float lens = crest(warpedDistance, max(0.0, radius - 17.0), 28.0) * 0.18;
    float impact = exp(-distanceFromOrigin / 105.0) * (1.0 - smoothstep(0.0, 0.28, u_progress));
    float fade = 1.0 - smoothstep(0.72, 1.0, u_progress);

    vec3 deepWater = vec3(0.07, 0.55, 0.48);
    vec3 crestLight = vec3(0.68, 1.0, 0.92);
    vec3 color = mix(deepWater, crestLight, primary + impact * 0.8);
    float alpha = (primary * 0.72 + secondary * 0.42 + tertiary * 0.2 + lens + impact * 0.45) * fade;

    gl_FragColor = vec4(color, clamp(alpha, 0.0, 0.86));
  }
`;

const compileShader = (gl: WebGLRenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;

  gl.deleteShader(shader);
  return null;
};

export const SpatialRippleCanvas: React.FC<SpatialRippleCanvasProps> = ({
  originX,
  originY,
  duration = 980,
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      depth: false,
      premultipliedAlpha: false,
    });

    if (!gl) {
      onComplete();
      return undefined;
    }

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram();

    if (!vertexShader || !fragmentShader || !program) {
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
      if (program) gl.deleteProgram(program);
      onComplete();
      return undefined;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      onComplete();
      return undefined;
    }

    const positionBuffer = gl.createBuffer();
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const originLocation = gl.getUniformLocation(program, 'u_origin');
    const progressLocation = gl.getUniformLocation(program, 'u_progress');
    let animationFrame = 0;
    let startedAt = 0;
    let pixelRatio = 1;

    if (!positionBuffer || positionLocation < 0) {
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      onComplete();
      return undefined;
    }

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const resize = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * pixelRatio);
      canvas.height = Math.round(window.innerHeight * pixelRatio);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const render = (timestamp: number) => {
      if (!startedAt) startedAt = timestamp;
      const progress = Math.min((timestamp - startedAt) / duration, 1);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform2f(originLocation, originX * pixelRatio, (window.innerHeight - originY) * pixelRatio);
      gl.uniform1f(progressLocation, progress);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(render);
      } else {
        onComplete();
      }
    };

    resize();
    window.addEventListener('resize', resize);
    animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationFrame);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [duration, onComplete, originX, originY]);

  return <canvas ref={canvasRef} className="spatial-demo__liquid-ripple" aria-hidden="true" />;
};
