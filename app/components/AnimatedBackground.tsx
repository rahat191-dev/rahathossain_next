// app/page.tsx
'use client';

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function AnimatedBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x1e1e1e);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    mountRef.current.appendChild(renderer.domElement);

    // Orthographic Camera for full-screen coverage
    const camera = new THREE.OrthographicCamera(
      width / -2, width / 2,
      height / 2, height / -2,
      -1000, 1000
    );
    camera.position.z = 1;

    const scene = new THREE.Scene();

    const gridSize = 4;
    const backgroundLinesCount = 500;
    const maxAnimatedLines = 60;
    const animatedLines: AnimatedLine[] = [];

    type Point2D = { x: number; y: number };

    // Background lines
    const backgroundMaterial = new THREE.LineBasicMaterial({ color: 0x333333, linewidth: 1 });
    const backgroundLines: THREE.Line[] = [];
    const backgroundPaths: Point2D[][] = [];

    function createRandomPath(): Point2D[] {
      const path: Point2D[] = [];
      let x = Math.random() * width;
      let y = Math.random() * height;
      path.push({ x, y });
      const length = Math.random() * 50 + 20;
      let direction = Math.floor(Math.random() * 4);

      for (let i = 0; i < length; i++) {
        switch (direction) {
          case 0: x += gridSize; break;
          case 1: y += gridSize; break;
          case 2: x -= gridSize; break;
          case 3: y -= gridSize; break;
        }
        // Clamp to screen edges
        x = Math.min(Math.max(x, 0), width);
        y = Math.min(Math.max(y, 0), height);

        path.push({ x, y });
        if (Math.random() < 0.3) direction = Math.floor(Math.random() * 4);
      }
      return path;
    }

    function pathToVector3(path: Point2D[]): THREE.Vector3[] {
      return path.map(p => new THREE.Vector3(p.x - width / 2, p.y - height / 2, 0));
    }

    // Initialize background lines
    for (let i = 0; i < backgroundLinesCount; i++) {
      const path = createRandomPath();
      const points = pathToVector3(path);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, backgroundMaterial);
      scene.add(line);
      backgroundLines.push(line);
      backgroundPaths.push(path);
    }

    // Animated line class
    class AnimatedLine {
      path: Point2D[];
      lineMesh: THREE.Line;
      index = 0;
      speed: number;
      fading = false;
      opacity = 1;
      fadeStep: number;

      constructor(path: Point2D[]) {
        this.path = path;
        const geom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(path[0].x - width / 2, path[0].y - height / 2, 0)]);
        const material = new THREE.LineBasicMaterial({ color: 0xB7FF6F, transparent: true, opacity: 1 });
        this.lineMesh = new THREE.Line(geom, material);
        scene.add(this.lineMesh);
        this.speed = Math.random() * 2 + 1;
        this.fadeStep = 1 / (60 * 3); // 3 sec fade
      }

      update(): boolean {
        if (this.fading) {
          this.opacity -= this.fadeStep;
          (this.lineMesh.material as THREE.LineBasicMaterial).opacity = this.opacity;
          if (this.opacity <= 0) {
            scene.remove(this.lineMesh);
            return true;
          }
        } else {
          this.index += this.speed;
          if (this.index >= this.path.length) {
            this.index = this.path.length;
            this.fading = true;
          }
          const geom = new THREE.BufferGeometry().setFromPoints(pathToVector3(this.path.slice(0, Math.floor(this.index))));
          this.lineMesh.geometry.dispose();
          this.lineMesh.geometry = geom;
        }
        return false;
      }
    }

    function animate() {
      requestAnimationFrame(animate);

      // Spawn animated lines
      if (animatedLines.length < maxAnimatedLines && Math.random() < 0.2) {
        const randomPath = backgroundPaths[Math.floor(Math.random() * backgroundPaths.length)];
        animatedLines.push(new AnimatedLine(randomPath));
      }

      // Update animated lines
      for (let i = animatedLines.length - 1; i >= 0; i--) {
        const finished = animatedLines[i].update();
        if (finished) animatedLines.splice(i, 1);
      }

      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      renderer.setSize(width, height);

      camera.left = width / -2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = height / -2;
      camera.updateProjectionMatrix();

      backgroundLines.forEach(line => scene.remove(line));
      backgroundLines.length = 0;
      backgroundPaths.length = 0;
      for (let i = 0; i < backgroundLinesCount; i++) {
        const path = createRandomPath();
        const points = pathToVector3(path);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, backgroundMaterial);
        scene.add(line);
        backgroundLines.push(line);
        backgroundPaths.push(path);
      }
    });

    return () => {
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="w-full h-screen m-0 p-0 relative">
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
}
