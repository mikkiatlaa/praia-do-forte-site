"use strict";
(() => {
  // src/tide.vert.glsl
  var tide_vert_default = "attribute vec2 a_position;\nvarying vec2 v_uv;\n\nvoid main() {\n  v_uv = a_position * 0.5 + 0.5;\n  gl_Position = vec4(a_position, 0.0, 1.0);\n}\n";

  // src/tide.frag.glsl
  var tide_frag_default = "precision highp float;\n\nuniform vec2 u_resolution;\nuniform vec2 u_pointer;\nuniform vec3 u_pulse;\nuniform float u_time;\nuniform float u_energy;\nvarying vec2 v_uv;\n\nfloat hash(vec2 p) {\n  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);\n}\n\nfloat noise(vec2 p) {\n  vec2 cell = floor(p);\n  vec2 edge = fract(p);\n  edge = edge * edge * (3.0 - 2.0 * edge);\n  return mix(\n    mix(hash(cell), hash(cell + vec2(1.0, 0.0)), edge.x),\n    mix(hash(cell + vec2(0.0, 1.0)), hash(cell + vec2(1.0, 1.0)), edge.x),\n    edge.y\n  );\n}\n\nvoid main() {\n  vec2 uv = v_uv;\n  float aspect = u_resolution.x / max(u_resolution.y, 1.0);\n  vec2 point = vec2(uv.x * aspect, uv.y);\n  vec2 cursor = vec2(u_pointer.x * aspect, u_pointer.y);\n  float time = u_time * (0.16 + u_energy * 0.19);\n\n  float broad = noise(vec2(uv.x * 3.3, uv.y * 2.0) + vec2(time, -time * 0.3));\n  float fine = noise(vec2(uv.x * 9.0, uv.y * 5.0) - vec2(time * 0.7, time));\n  float drift = sin(uv.x * 8.5 - time * 3.0 + broad * 3.0) * 0.035;\n  float waterline = uv.y + drift + (broad - 0.5) * 0.18 + (fine - 0.5) * 0.035;\n\n  vec3 jungle = vec3(0.0, 0.18, 0.17);\n  vec3 ocean = vec3(0.0, 0.36, 0.39);\n  vec3 teal = vec3(0.23, 0.68, 0.65);\n  vec3 sand = vec3(0.92, 0.82, 0.61);\n  vec3 color = mix(jungle, ocean, smoothstep(0.03, 0.92, waterline));\n  color = mix(color, teal, smoothstep(0.38, 0.91, waterline) * 0.42);\n\n  float contours = sin((waterline + broad * 0.035) * (32.0 + u_energy * 17.0));\n  float foam = pow(max(contours, 0.0), 17.0) * (0.11 + u_energy * 0.11);\n  color += sand * foam;\n\n  float distanceToPointer = length(point - cursor);\n  float current = sin(distanceToPointer * 25.0 - u_time * 1.5);\n  color += teal * current * exp(-distanceToPointer * 4.2) * 0.08;\n\n  float pulseAge = u_pulse.z;\n  float pulseDistance = length(point - vec2(u_pulse.x * aspect, u_pulse.y));\n  float ring = exp(-pow((pulseDistance - pulseAge * 0.45) * 35.0, 2.0));\n  color += sand * ring * max(0.0, 1.0 - pulseAge) * 0.38;\n\n  float sunlight = smoothstep(0.78, 0.98, uv.x) * smoothstep(0.25, 0.8, uv.y);\n  color = mix(color, sand, sunlight * 0.12);\n  gl_FragColor = vec4(color, 1.0);\n}\n";

  // src/enhancements.ts
  var section = document.getElementById("tide");
  var canvas = document.getElementById(
    "tide-canvas"
  );
  var pauseButton = document.getElementById(
    "tide-pause"
  );
  var modeButtons = Array.from(
    document.querySelectorAll("[data-tide-mode]")
  );
  if (section && canvas && pauseButton) {
    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "low-power"
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
    const hero = document.querySelector(".hero");
    const image = document.querySelector(".hero-image");
    if (!hero || !image || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
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
            `${Math.max(-28, -window.scrollY * 0.07)}px`
          );
          queued = false;
        });
      },
      { passive: true }
    );
  }
  function compileShader(gl, type, source) {
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
  function startTide(gl, section2, canvas2, pauseButton2, modeButtons2) {
    const vertex = compileShader(gl, gl.VERTEX_SHADER, tide_vert_default);
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, tide_frag_default);
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
      gl.STATIC_DRAW
    );
    gl.useProgram(program);
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    canvas2.addEventListener("webglcontextlost", (event) => {
      event.preventDefault();
      section2.classList.add("tide-fallback");
      paused = true;
      syncAnimation();
    });
    const uniforms = {
      resolution: gl.getUniformLocation(program, "u_resolution"),
      pointer: gl.getUniformLocation(program, "u_pointer"),
      pulse: gl.getUniformLocation(program, "u_pulse"),
      time: gl.getUniformLocation(program, "u_time"),
      energy: gl.getUniformLocation(program, "u_energy")
    };
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
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
      const bounds = canvas2.getBoundingClientRect();
      const scale = Math.min(window.devicePixelRatio || 1, 1.25);
      const width = Math.max(1, Math.round(bounds.width * scale));
      const height = Math.max(1, Math.round(bounds.height * scale));
      if (canvas2.width === width && canvas2.height === height) return;
      canvas2.width = width;
      canvas2.height = height;
      gl.viewport(0, 0, width, height);
      draw();
    }
    function draw() {
      gl.uniform2f(uniforms.resolution, canvas2.width, canvas2.height);
      gl.uniform2f(uniforms.pointer, pointer.x, pointer.y);
      gl.uniform3f(
        uniforms.pulse,
        pulse.x,
        pulse.y,
        Math.max(0, time - pulse.started)
      );
      gl.uniform1f(uniforms.time, time);
      gl.uniform1f(uniforms.energy, energy);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    function tick(now) {
      frame = 0;
      if (!visible || paused || motionPreference.matches) return;
      if (now - lastFrame < 30) {
        frame = requestAnimationFrame(tick);
        return;
      }
      time += Math.min(now - lastFrame, 40) / 1e3;
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
    function updatePointer(event) {
      const bounds = canvas2.getBoundingClientRect();
      targetPointer = {
        x: Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width)),
        y: Math.min(
          1,
          Math.max(0, 1 - (event.clientY - bounds.top) / bounds.height)
        )
      };
    }
    canvas2.addEventListener("pointermove", updatePointer, { passive: true });
    canvas2.addEventListener("pointerdown", (event) => {
      updatePointer(event);
      pointer = { ...targetPointer };
      pulse = { ...pointer, started: time };
      draw();
    });
    modeButtons2.forEach((button) => {
      button.addEventListener("click", () => {
        const active = button.dataset.tideMode;
        targetEnergy = active === "wild" ? 1 : 0.3;
        modeButtons2.forEach((item) => {
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
    pauseButton2.addEventListener("click", () => {
      paused = !paused;
      pauseButton2.setAttribute("aria-pressed", String(paused));
      pauseButton2.setAttribute(
        "aria-label",
        paused ? "Play tide animation" : "Pause tide animation"
      );
      pauseButton2.title = paused ? "Play tide animation" : "Pause tide animation";
      const icon = pauseButton2.querySelector("span");
      if (icon) icon.textContent = paused ? "\u25B6" : "\u2161";
      syncAnimation();
    });
    new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
        syncAnimation();
      },
      { threshold: 0.05 }
    ).observe(section2);
    if (typeof ResizeObserver !== "undefined") {
      new ResizeObserver(resize).observe(canvas2);
    } else {
      window.addEventListener("resize", resize);
    }
    motionPreference.addEventListener("change", () => {
      pauseButton2.hidden = motionPreference.matches;
      syncAnimation();
    });
    pauseButton2.hidden = motionPreference.matches;
    resize();
  }
})();
