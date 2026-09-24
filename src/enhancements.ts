import vertexSource from "./tide.vert.glsl";
import fragmentSource from "./tide.frag.glsl";

const section = document.getElementById("tide");
const canvas = document.getElementById(
  "tide-canvas",
) as HTMLCanvasElement | null;
const pauseButton = document.getElementById(
  "tide-pause",
) as HTMLButtonElement | null;
const modeButtons = Array.from(
  document.querySelectorAll<HTMLButtonElement>("[data-tide-mode]"),
);

if (section && canvas && pauseButton) {
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    powerPreference: "low-power",
  });

  if (gl) {
    try {
      startTide(gl, section, canvas, pauseButton, modeButtons);
    } catch (error) {
      console.warn("Tide effect unavailable:", error);
      section.classList.add("tide-fallback");
    }
  } else {
    section.classList.add("tide-fallback");
  }
}

initHeroParallax();

function initHeroParallax() {
  const hero = document.querySelector<HTMLElement>(".hero");
  const image = document.querySelector<HTMLElement>(".hero-image");
  if (
    !hero ||
    !image ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;

  let queued = false;
  window.addEventListener(
    "scroll",
    () => {
      if (queued || window.scrollY > hero.offsetHeight) return;
      queued = true;
      requestAnimationFrame(() => {
        image.style.setProperty(
          "--hero-drift",
          `${Math.max(-28, -window.scrollY * 0.07)}px`,
        );
        queued = false;
      });
    },
    { passive: true },
  );
}

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to create shader");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) || "Shader compilation failed";
    gl.deleteShader(shader);
    throw new Error(message);
  }
  return shader;
}

function startTide(
  gl: WebGLRenderingContext,
  section: HTMLElement,
  canvas: HTMLCanvasElement,
  pauseButton: HTMLButtonElement,
  modeButtons: HTMLButtonElement[],
) {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  if (!program) throw new Error("Unable to create shader program");
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) || "Shader linking failed");
  }

  const vertices = gl.createBuffer();
  if (!vertices) throw new Error("Unable to create canvas buffer");
  gl.bindBuffer(gl.ARRAY_BUFFER, vertices);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW,
  );
  gl.useProgram(program);
  const position = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  canvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    section.classList.add("tide-fallback");
    paused = true;
    syncAnimation();
  });

  const uniforms = {
    resolution: gl.getUniformLocation(program, "u_resolution"),
    pointer: gl.getUniformLocation(program, "u_pointer"),
    pulse: gl.getUniformLocation(program, "u_pulse"),
    time: gl.getUniformLocation(program, "u_time"),
    energy: gl.getUniformLocation(program, "u_energy"),
  };

  const motionPreference = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  let visible = false;
  let paused = false;
  let frame = 0;
  let lastFrame = 0;
  let time = 0;
  let energy = 0.3;
  let targetEnergy = 0.3;
  let pointer = { x: 0.75, y: 0.5 };
  let targetPointer = { ...pointer };
  let pulse = { x: -2, y: -2, started: -100 };

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    const scale = Math.min(window.devicePixelRatio || 1, 1.25);
    const width = Math.max(1, Math.round(bounds.width * scale));
    const height = Math.max(1, Math.round(bounds.height * scale));
    if (canvas.width === width && canvas.height === height) return;
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);
    draw();
  }

  function draw() {
    gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
    gl.uniform2f(uniforms.pointer, pointer.x, pointer.y);
    gl.uniform3f(
      uniforms.pulse,
      pulse.x,
      pulse.y,
      Math.max(0, time - pulse.started),
    );
    gl.uniform1f(uniforms.time, time);
    gl.uniform1f(uniforms.energy, energy);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  function tick(now: number) {
    frame = 0;
    if (!visible || paused || motionPreference.matches) return;
    if (now - lastFrame < 30) {
      frame = requestAnimationFrame(tick);
      return;
    }
    time += Math.min(now - lastFrame, 40) / 1000;
    lastFrame = now;
    energy += (targetEnergy - energy) * 0.045;
    pointer.x += (targetPointer.x - pointer.x) * 0.065;
    pointer.y += (targetPointer.y - pointer.y) * 0.065;
    draw();
    frame = requestAnimationFrame(tick);
  }

  function syncAnimation() {
    const shouldRun = visible && !paused && !motionPreference.matches;
    if (!shouldRun && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
    if (shouldRun && !frame) {
      lastFrame = performance.now();
      frame = requestAnimationFrame(tick);
    }
    if (!shouldRun) draw();
  }

  function updatePointer(event: PointerEvent) {
    const bounds = canvas.getBoundingClientRect();
    targetPointer = {
      x: Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width)),
      y: Math.min(
        1,
        Math.max(0, 1 - (event.clientY - bounds.top) / bounds.height),
      ),
    };
  }

  canvas.addEventListener("pointermove", updatePointer, { passive: true });
  canvas.addEventListener("pointerdown", (event) => {
    updatePointer(event);
    pointer = { ...targetPointer };
    pulse = { ...pointer, started: time };
    draw();
  });

  modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const active = button.dataset.tideMode;
      targetEnergy = active === "wild" ? 1 : 0.3;
      modeButtons.forEach((item) => {
        const selected = item.dataset.tideMode === active;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      if (motionPreference.matches || paused) {
        energy = targetEnergy;
        draw();
      }
    });
  });

  pauseButton.addEventListener("click", () => {
    paused = !paused;
    pauseButton.setAttribute("aria-pressed", String(paused));
    pauseButton.setAttribute(
      "aria-label",
      paused ? "Play tide animation" : "Pause tide animation",
    );
    pauseButton.title = paused ? "Play tide animation" : "Pause tide animation";
    const icon = pauseButton.querySelector("span");
    if (icon) icon.textContent = paused ? "▶" : "Ⅱ";
    syncAnimation();
  });

  new IntersectionObserver(
    (entries) => {
      visible = entries[0]?.isIntersecting ?? false;
      syncAnimation();
    },
    { threshold: 0.05 },
  ).observe(section);

  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(resize).observe(canvas);
  } else {
    window.addEventListener("resize", resize);
  }
  motionPreference.addEventListener("change", () => {
    pauseButton.hidden = motionPreference.matches;
    syncAnimation();
  });
  pauseButton.hidden = motionPreference.matches;
  resize();
}
