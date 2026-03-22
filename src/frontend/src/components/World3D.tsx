import { Html, Sky } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CloudRain, Gauge, Map as MapIcon, Zap } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { usePortfolioStore, visitedProjects } from "../store/usePortfolioStore";
import { ConfettiEffect } from "./ConfettiEffect";
import { ProjectModal, WORLD_PROJECTS } from "./ProjectModal";
import type { Project3D } from "./ProjectModal";

// --- Module-level mutable world state (no React re-renders) ---
const worldRef = {
  scooterX: 0,
  scooterZ: 0,
  scooterRotY: 0,
  speed: 0,
};

// ===================== TERRAIN =====================
function Terrain() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[120, 120, 1, 1]} />
        <meshLambertMaterial color="#1a4a1a" />
      </mesh>
      {/* Road paths */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[4, 80]} />
        <meshLambertMaterial color="#2a2a2a" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0, 0.01, -10]}>
        <planeGeometry args={[4, 80]} />
        <meshLambertMaterial color="#2a2a2a" />
      </mesh>
      {/* Road markings */}
      {[-30, -20, -10, 0, 10, 20, 30].map((z) => (
        <mesh
          key={`rm-z${z}`}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.02, z]}
        >
          <planeGeometry args={[0.3, 3]} />
          <meshLambertMaterial color="#888" />
        </mesh>
      ))}
      {/* Low-poly hills */}
      {(
        [
          [-40, 0, -35],
          [40, 0, -40],
          [-45, 0, 20],
          [45, 0, 25],
          [-30, 0, -50],
          [30, 0, -50],
        ] as [number, number, number][]
      ).map(([x, , z], i) => (
        <mesh key={`hill-${x}-${z}`} position={[x, 0, z]} castShadow>
          <coneGeometry args={[8, 5, 4]} />
          <meshLambertMaterial color={i % 2 === 0 ? "#1e5e1e" : "#256325"} />
        </mesh>
      ))}
      {/* Trees */}
      {(
        [
          [8, 0, 5],
          [-8, 0, 5],
          [12, 0, -5],
          [-12, 0, -5],
          [6, 0, 15],
          [-6, 0, 15],
          [10, 0, -20],
          [-10, 0, -20],
          [25, 0, 0],
          [-25, 0, 0],
          [20, 0, -15],
          [-20, 0, -15],
        ] as [number, number, number][]
      ).map(([x, , z]) => (
        <group key={`tree-${x}-${z}`} position={[x, 0, z]}>
          <mesh position={[0, 1.2, 0]}>
            <coneGeometry args={[0.8, 2.5, 5]} />
            <meshLambertMaterial color="#2d7a2d" />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.15, 0.2, 0.8, 6]} />
            <meshLambertMaterial color="#5c3a1e" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ===================== SCOOTER =====================
interface ScooterProps {
  onProjectNear: (id: string | null) => void;
  onEasterEgg: (id: string) => void;
  onConfetti: () => void;
  resetSignal: React.MutableRefObject<number>;
  onSpeedChange: (s: number) => void;
}

function Scooter({
  onProjectNear,
  onEasterEgg,
  onConfetti,
  resetSignal,
  onSpeedChange,
}: ScooterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const keys = useRef<Record<string, boolean>>({});
  const velocity = useRef(0);
  const rotY = useRef(0);
  const lastResetSignal = useRef(0);
  const prevNearby = useRef<string | null>(null);
  const collectedEggs = useRef<Set<string>>(new Set());
  const visitedBuildings = useRef<Set<string>>(new Set());
  const frameCounter = useRef(0);

  const { incrementBoost, unlockAchievement } = usePortfolioStore.getState();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      keys.current[e.code] = true;
    };
    const up = (e: KeyboardEvent) => {
      keys.current[e.code] = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const k = keys.current;

    // Reset
    if (resetSignal.current !== lastResetSignal.current) {
      lastResetSignal.current = resetSignal.current;
      groupRef.current.position.set(0, 0.35, 0);
      velocity.current = 0;
      rotY.current = 0;
    }

    // Input
    const boosting = k.Space ?? false;
    const braking = (k.ShiftLeft ?? false) || (k.ShiftRight ?? false);
    const boostMult = boosting ? 2.2 : 1.0;
    const brakeMult = braking ? 0.3 : 1.0;

    // Acceleration
    if ((k.KeyW ?? false) || (k.ArrowUp ?? false)) {
      velocity.current = Math.min(
        velocity.current + 12 * delta * brakeMult,
        10 * boostMult,
      );
    } else if ((k.KeyS ?? false) || (k.ArrowDown ?? false)) {
      velocity.current = Math.max(velocity.current - 10 * delta, -5);
    } else {
      velocity.current *= 0.88 ** (delta * 60) * brakeMult;
      if (Math.abs(velocity.current) < 0.01) velocity.current = 0;
    }

    // Track boost
    if (boosting && Math.abs(velocity.current) > 1) {
      frameCounter.current++;
      if (frameCounter.current % 90 === 0) {
        incrementBoost();
      }
    }

    // Steering
    if (Math.abs(velocity.current) > 0.1) {
      const steerDir = velocity.current > 0 ? 1 : -1;
      if ((k.KeyA ?? false) || (k.ArrowLeft ?? false))
        rotY.current += 2.2 * delta * steerDir;
      if ((k.KeyD ?? false) || (k.ArrowRight ?? false))
        rotY.current -= 2.2 * delta * steerDir;
    }

    // Move
    groupRef.current.rotation.y = rotY.current;
    const dir = new THREE.Vector3(0, 0, -1).applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      rotY.current,
    );
    groupRef.current.position.addScaledVector(dir, velocity.current * delta);
    groupRef.current.position.y = 0.35;

    // Boundary clamp
    const p = groupRef.current.position;
    p.x = THREE.MathUtils.clamp(p.x, -55, 55);
    p.z = THREE.MathUtils.clamp(p.z, -55, 55);

    // Update world ref for minimap
    worldRef.scooterX = p.x;
    worldRef.scooterZ = p.z;
    worldRef.scooterRotY = rotY.current;
    worldRef.speed = Math.abs(velocity.current);

    // Update speed display (throttled)
    frameCounter.current++;
    if (frameCounter.current % 8 === 0) {
      onSpeedChange(Math.abs(velocity.current));
    }

    // Proximity checks for project buildings
    const buildingPositions: [string, number, number][] = [
      ["hyd3d", 18, -18],
      ["aiportfolio", -18, -18],
      ["physics-shop", 0, -32],
    ];
    let nearbyId: string | null = null;
    for (const [id, bx, bz] of buildingPositions) {
      const dist = Math.sqrt((p.x - bx) ** 2 + (p.z - bz) ** 2);
      if (dist < 6) {
        nearbyId = id;
        if (!visitedBuildings.current.has(id)) {
          visitedBuildings.current.add(id);
          visitedProjects.add(id);
          if (visitedProjects.size >= 3) {
            unlockAchievement("explorer");
          }
        }
        break;
      }
    }
    if (nearbyId !== prevNearby.current) {
      prevNearby.current = nearbyId;
      onProjectNear(nearbyId);
    }

    // Easter egg proximity checks
    const eggPositions: [string, number, number, number][] = [
      ["historic", 12, 12, 4],
      ["chai-lover", -12, 6, 4],
      ["foodie", 22, 22, 5],
      ["road-rage", -22, 16, 4],
    ];
    for (const [id, ex, ez, radius] of eggPositions) {
      if (collectedEggs.current.has(id)) continue;
      const dist = Math.sqrt((p.x - ex) ** 2 + (p.z - ez) ** 2);
      if (dist < radius) {
        collectedEggs.current.add(id);
        onEasterEgg(id);
        if (id === "historic") onConfetti();
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.35, 0]}>
      {/* Scooter body */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <boxGeometry args={[0.35, 0.18, 1.0]} />
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Seat */}
      <mesh position={[0, 0.32, 0.2]} castShadow>
        <boxGeometry args={[0.28, 0.1, 0.35]} />
        <meshStandardMaterial color="#222222" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Handlebars vertical */}
      <mesh position={[0, 0.36, -0.38]}>
        <cylinderGeometry args={[0.025, 0.025, 0.5, 8]} />
        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Handlebars horizontal (teal glow) */}
      <mesh position={[0, 0.36, -0.38]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.36, 8]} />
        <meshStandardMaterial
          color="#4ECDC4"
          metalness={0.9}
          roughness={0.1}
          emissive="#4ECDC4"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Front wheel body */}
      <mesh position={[0, 0, -0.42]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.08, 12]} />
        <meshStandardMaterial color="#222" metalness={0.3} roughness={0.8} />
      </mesh>
      {/* Front wheel glow ring */}
      <mesh position={[0, 0, -0.42]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.16, 0.03, 8, 12]} />
        <meshStandardMaterial
          color="#4ECDC4"
          emissive="#4ECDC4"
          emissiveIntensity={0.8}
        />
      </mesh>
      {/* Rear wheel body */}
      <mesh position={[0, 0, 0.42]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.08, 12]} />
        <meshStandardMaterial color="#222" metalness={0.3} roughness={0.8} />
      </mesh>
      {/* Rear wheel glow ring */}
      <mesh position={[0, 0, 0.42]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.16, 0.03, 8, 12]} />
        <meshStandardMaterial
          color="#4ECDC4"
          emissive="#4ECDC4"
          emissiveIntensity={0.8}
        />
      </mesh>
      {/* Headlight */}
      <mesh position={[0, 0.2, -0.52]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial
          color="#fff"
          emissive="#fff"
          emissiveIntensity={1}
        />
      </mesh>
      {/* License plate */}
      <mesh position={[0, 0.1, 0.52]}>
        <boxGeometry args={[0.28, 0.1, 0.02]} />
        <meshStandardMaterial color="#FF6B6B" />
      </mesh>
      {/* Floating NIDHII label */}
      <Html center position={[0, 0.9, 0]} distanceFactor={8}>
        <div
          style={{
            color: "#4ECDC4",
            fontWeight: "bold",
            fontSize: "11px",
            fontFamily: "sans-serif",
            whiteSpace: "nowrap",
            textShadow: "0 0 8px #4ECDC4",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          NIDHII 🛺
        </div>
      </Html>
    </group>
  );
}

// ===================== PROJECT BUILDING =====================
interface ProjectBuildingProps {
  project: Project3D;
  isNearby: boolean;
}

function ProjectBuilding({ project, isNearby }: ProjectBuildingProps) {
  const posMap: Record<string, [number, number, number]> = {
    hyd3d: [18, 0, -18],
    aiportfolio: [-18, 0, -18],
    "physics-shop": [0, 0, -32],
  };
  const pos = posMap[project.id] ?? [0, 0, 0];
  const height = 4;

  return (
    <group position={pos}>
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, height, 3]} />
        <meshStandardMaterial
          color={project.accentColor}
          metalness={0.3}
          roughness={0.6}
          emissive={project.accentColor}
          emissiveIntensity={isNearby ? 0.4 : 0.05}
        />
      </mesh>
      <mesh position={[0, height + 0.3, 0]}>
        <boxGeometry args={[3.2, 0.3, 3.2]} />
        <meshStandardMaterial
          color={project.accentColor}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      {[0.8, 1.8, 2.8].map((y) =>
        [-0.8, 0.8].map((x) => (
          <mesh key={`w-${y}-${x}`} position={[x, y, 1.52]}>
            <boxGeometry args={[0.4, 0.5, 0.05]} />
            <meshStandardMaterial
              color="#fff"
              emissive="#fffbe6"
              emissiveIntensity={0.9}
            />
          </mesh>
        )),
      )}
      <Html center position={[0, height + 1.2, 0]} distanceFactor={14}>
        <div
          style={{
            background: isNearby ? project.accentColor : "rgba(0,0,0,0.75)",
            color: isNearby ? "#fff" : project.accentColor,
            fontWeight: "bold",
            fontSize: "13px",
            fontFamily: "sans-serif",
            padding: "4px 10px",
            borderRadius: "6px",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            border: `1px solid ${project.accentColor}`,
          }}
        >
          {project.icon} {project.title}
        </div>
      </Html>
      {isNearby && (
        <Html center position={[0, height + 2.4, 0]} distanceFactor={10}>
          <div
            style={{
              background: "#fff",
              color: "#111",
              fontWeight: "600",
              fontSize: "11px",
              fontFamily: "sans-serif",
              padding: "3px 8px",
              borderRadius: "4px",
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}
          >
            Press E to explore
          </div>
        </Html>
      )}
    </group>
  );
}

// ===================== EASTER EGG OBJECTS =====================
interface EasterEggProps {
  id: string;
  collected: boolean;
}

function EasterEggObj({ id, collected }: EasterEggProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  const configs: Record<
    string,
    {
      pos: [number, number, number];
      color: string;
      shape: string;
      emoji: string;
    }
  > = {
    historic: {
      pos: [12, 0, 12],
      color: "#D4A017",
      shape: "cone",
      emoji: "🕌",
    },
    "chai-lover": {
      pos: [-12, 0, 6],
      color: "#8B4513",
      shape: "box",
      emoji: "☕",
    },
    foodie: {
      pos: [22, 0, 22],
      color: "#FF8C00",
      shape: "sphere",
      emoji: "🍛",
    },
    "road-rage": {
      pos: [-22, 0, 16],
      color: "#FFD700",
      shape: "rickshaw",
      emoji: "🛺",
    },
  };

  const cfg = configs[id];

  useFrame((state) => {
    if (!cfg || collected) return;
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 1.2;
      meshRef.current.position.y =
        0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.15;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.8;
    }
  });

  if (!cfg || collected) return null;

  return (
    <group position={cfg.pos}>
      {cfg.shape === "cone" && (
        <group>
          <mesh ref={meshRef} position={[0, 1.2, 0]}>
            <coneGeometry args={[0.8, 2, 4]} />
            <meshStandardMaterial
              color={cfg.color}
              emissive={cfg.color}
              emissiveIntensity={0.4}
              metalness={0.5}
            />
          </mesh>
          <mesh position={[-0.6, 0.6, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 1.4, 6]} />
            <meshStandardMaterial color={cfg.color} metalness={0.4} />
          </mesh>
          <mesh position={[0.6, 0.6, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 1.4, 6]} />
            <meshStandardMaterial color={cfg.color} metalness={0.4} />
          </mesh>
        </group>
      )}
      {cfg.shape === "box" && (
        <mesh ref={meshRef} position={[0, 0.5, 0]}>
          <boxGeometry args={[1, 0.8, 0.6]} />
          <meshStandardMaterial color={cfg.color} roughness={0.8} />
        </mesh>
      )}
      {cfg.shape === "sphere" && (
        <mesh ref={meshRef} position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.55, 12, 12]} />
          <meshStandardMaterial
            color={cfg.color}
            emissive={cfg.color}
            emissiveIntensity={0.3}
            roughness={0.4}
          />
        </mesh>
      )}
      {cfg.shape === "rickshaw" && (
        <group ref={groupRef} position={[0, 0, 0]}>
          <mesh position={[0, 0.6, 0]}>
            <boxGeometry args={[1.2, 1, 1.8]} />
            <meshStandardMaterial
              color={cfg.color}
              emissive={cfg.color}
              emissiveIntensity={0.3}
            />
          </mesh>
          <mesh position={[0, 0.15, 0.7]}>
            <cylinderGeometry args={[0.2, 0.2, 0.12, 10]} />
            <meshStandardMaterial color="#222" />
          </mesh>
          <mesh position={[0, 0.15, -0.7]}>
            <cylinderGeometry args={[0.2, 0.2, 0.12, 10]} />
            <meshStandardMaterial color="#222" />
          </mesh>
        </group>
      )}
      <Html
        center
        position={[0, cfg.shape === "cone" ? 3 : 1.6, 0]}
        distanceFactor={10}
      >
        <div
          style={{
            fontSize: "20px",
            pointerEvents: "none",
            textShadow: `0 0 10px ${cfg.color}`,
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
          }}
        >
          {cfg.emoji}
        </div>
      </Html>
    </group>
  );
}

// ===================== DUST PARTICLES =====================
function DustParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const posArr = useRef<Float32Array>(
    (() => {
      const arr = new Float32Array(600);
      for (let i = 0; i < 200; i++) {
        arr[i * 3] = (Math.random() - 0.5) * 80;
        arr[i * 3 + 1] = Math.random() * 4;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 80;
      }
      return arr;
    })(),
  );

  useFrame((state) => {
    if (!pointsRef.current) return;
    const attr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < 200; i++) {
      arr[i * 3] += Math.sin(t * 0.3 + i) * 0.003;
      arr[i * 3 + 1] += 0.004;
      if (arr[i * 3 + 1] > 4) arr[i * 3 + 1] = 0;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[posArr.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#c8a96e" transparent opacity={0.35} />
    </points>
  );
}

// ===================== RAIN PARTICLES =====================
function RainParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const rainPos = useRef<Float32Array>(
    (() => {
      const arr = new Float32Array(1200);
      for (let i = 0; i < 400; i++) {
        arr[i * 3] = (Math.random() - 0.5) * 60;
        arr[i * 3 + 1] = Math.random() * 20;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 60;
      }
      return arr;
    })(),
  );

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const attr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < 400; i++) {
      arr[i * 3 + 1] -= 18 * delta;
      if (arr[i * 3 + 1] < 0) {
        arr[i * 3 + 1] = 20;
        arr[i * 3] = (Math.random() - 0.5) * 60;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 60;
      }
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[rainPos.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#aaddff" transparent opacity={0.5} />
    </points>
  );
}

// ===================== CAMERA ADAPTER =====================
function ScooterCameraAdapter() {
  const { camera } = useThree();
  const camTarget = useRef(new THREE.Vector3(0, 4, 8));
  const lookTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    const sx = worldRef.scooterX;
    const sz = worldRef.scooterZ;
    const rotY = worldRef.scooterRotY;

    const offset = new THREE.Vector3(0, 4, 7);
    offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotY);

    const desired = new THREE.Vector3(
      sx + offset.x,
      0.35 + offset.y,
      sz + offset.z,
    );
    camTarget.current.lerp(desired, 0.06);
    lookTarget.current.lerp(new THREE.Vector3(sx, 1, sz), 0.1);

    camera.position.copy(camTarget.current);
    camera.lookAt(lookTarget.current);
  });

  return null;
}

// ===================== INNER SCENE =====================
interface SceneProps {
  onProjectNear: (id: string | null) => void;
  onEasterEgg: (id: string) => void;
  onConfetti: () => void;
  resetSignal: React.MutableRefObject<number>;
  nearbyProjectId: string | null;
  onSpeedChange: (s: number) => void;
  showRain: boolean;
  collectedEggs: Set<string>;
}

function Scene({
  onProjectNear,
  onEasterEgg,
  onConfetti,
  resetSignal,
  nearbyProjectId,
  onSpeedChange,
  showRain,
  collectedEggs,
}: SceneProps) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[20, 30, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        color="#ffe8cc"
      />
      <hemisphereLight args={["#aeeaff", "#3a7a1e", 0.5]} />
      <Sky sunPosition={[50, 30, 50]} turbidity={6} rayleigh={0.8} />
      <fog attach="fog" args={["#c8e8ff", 40, 100]} />
      <Terrain />
      <Scooter
        onProjectNear={onProjectNear}
        onEasterEgg={onEasterEgg}
        onConfetti={onConfetti}
        resetSignal={resetSignal}
        onSpeedChange={onSpeedChange}
      />
      <ScooterCameraAdapter />
      {WORLD_PROJECTS.map((project) => (
        <ProjectBuilding
          key={project.id}
          project={project}
          isNearby={nearbyProjectId === project.id}
        />
      ))}
      {["historic", "chai-lover", "foodie", "road-rage"].map((id) => (
        <EasterEggObj key={id} id={id} collected={collectedEggs.has(id)} />
      ))}
      <DustParticles />
      {showRain && <RainParticles />}
    </>
  );
}

// ===================== MINI MAP =====================
function MiniMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let rafId: number;
    const WORLD = 120;
    const SIZE = 130;
    const scale = SIZE / WORLD;

    const buildings: [number, number, string][] = [
      [18, -18, "#4ECDC4"],
      [-18, -18, "#FF6B6B"],
      [0, -32, "#9B59B6"],
    ];
    const eggs: [number, number, string][] = [
      [12, 12, "#D4A017"],
      [-12, 6, "#8B4513"],
      [22, 22, "#FF8C00"],
      [-22, 16, "#FFD700"],
    ];

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.fillStyle = "rgba(10,5,20,0.85)";
      ctx.fillRect(0, 0, SIZE, SIZE);

      ctx.strokeStyle = "rgba(255,255,255,0.07)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= 4; i++) {
        ctx.beginPath();
        ctx.moveTo((i * SIZE) / 4, 0);
        ctx.lineTo((i * SIZE) / 4, SIZE);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, (i * SIZE) / 4);
        ctx.lineTo(SIZE, (i * SIZE) / 4);
        ctx.stroke();
      }

      for (const [bx, bz, color] of buildings) {
        const mx = (bx + 60) * scale;
        const mz = (bz + 60) * scale;
        ctx.fillStyle = color;
        ctx.fillRect(mx - 3, mz - 3, 6, 6);
      }

      for (const [ex, ez, color] of eggs) {
        const mx = (ex + 60) * scale;
        const mz = (ez + 60) * scale;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(mx, mz, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      const sx = (worldRef.scooterX + 60) * scale;
      const sz = (worldRef.scooterZ + 60) * scale;
      ctx.fillStyle = "#4ECDC4";
      ctx.beginPath();
      ctx.arc(sx, sz, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1;
      ctx.stroke();

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={130}
      height={130}
      style={{
        border: "1px solid rgba(78,205,196,0.4)",
        borderRadius: "8px",
        display: "block",
      }}
    />
  );
}

// ===================== MAIN WORLD3D COMPONENT =====================
export function World3D() {
  const [nearbyProjectId, setNearbyProjectId] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<Project3D | null>(null);
  const [confetti, setConfetti] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [collectedEggs, setCollectedEggs] = useState<Set<string>>(new Set());
  const resetSignal = useRef(0);

  const showMiniMap = usePortfolioStore((s) => s.showMiniMap);
  const toggleMiniMap = usePortfolioStore((s) => s.toggleMiniMap);
  const showRain = usePortfolioStore((s) => s.showRain);
  const toggleRain = usePortfolioStore((s) => s.toggleRain);
  const unlockAchievement = usePortfolioStore((s) => s.unlockAchievement);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "KeyM") toggleMiniMap();
      if (e.code === "KeyR") {
        resetSignal.current++;
      }
      if (e.code === "KeyE" && nearbyProjectId) {
        const proj = WORLD_PROJECTS.find((p) => p.id === nearbyProjectId);
        if (proj) setActiveProject(proj);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [nearbyProjectId, toggleMiniMap]);

  const handleEasterEgg = useCallback(
    (id: string) => {
      setCollectedEggs((prev) => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });
      unlockAchievement(id);
    },
    [unlockAchievement],
  );

  const handleConfetti = useCallback(() => setConfetti(true), []);
  const clearConfetti = useCallback(() => setConfetti(false), []);

  return (
    <section id="world3d" className="relative" style={{ height: "600px" }}>
      <Canvas
        shadows
        camera={{ position: [0, 4, 8], fov: 60 }}
        gl={{ antialias: true }}
        style={{ background: "#1a3a1a" }}
      >
        <Scene
          onProjectNear={setNearbyProjectId}
          onEasterEgg={handleEasterEgg}
          onConfetti={handleConfetti}
          resetSignal={resetSignal}
          nearbyProjectId={nearbyProjectId}
          onSpeedChange={setSpeed}
          showRain={showRain}
          collectedEggs={collectedEggs}
        />
      </Canvas>

      {/* HUD */}
      <div className="absolute top-4 left-4 pointer-events-none select-none">
        <div className="bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2 text-white font-body text-xs space-y-1">
          <div className="flex items-center gap-1.5">
            <Gauge size={12} className="text-teal" />
            <span className="text-teal font-bold">NIDHII&apos;s World</span>
          </div>
          <div className="text-white/60 leading-5">
            <div>WASD / &uarr;&darr;&larr;&rarr; &mdash; Drive</div>
            <div>SPACE &mdash; Boost &nbsp; SHIFT &mdash; Brake</div>
            <div>E &mdash; Enter building &nbsp; R &mdash; Reset</div>
            <div>M &mdash; Mini-map</div>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <Zap size={10} className="text-coral" />
            <span className="text-coral font-bold">
              {(speed * 12).toFixed(0)} km/h
            </span>
          </div>
        </div>
      </div>

      {/* Mini-map */}
      {showMiniMap && (
        <div className="absolute top-4 right-4 pointer-events-none">
          <MiniMap />
          <div className="text-white/40 text-[9px] font-body text-center mt-1">
            M to hide
          </div>
        </div>
      )}

      {/* Rain toggle */}
      <div className="absolute bottom-4 left-4 pointer-events-auto">
        <button
          type="button"
          onClick={toggleRain}
          className={`flex items-center gap-1.5 text-xs font-body font-semibold px-3 py-2 rounded-lg transition-all ${
            showRain
              ? "bg-teal/80 text-[#0E0B14]"
              : "bg-black/60 text-white/70 hover:bg-black/80"
          }`}
          data-ocid="world.rain.toggle"
        >
          <CloudRain size={12} />
          {showRain ? "Rain ON" : "Rain OFF"}
        </button>
      </div>

      {/* Nearby project hint */}
      {nearbyProjectId && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-5 py-2 font-body font-semibold text-sm text-gray-800 flex items-center gap-2 shadow-lg">
            <span className="text-teal">E</span> to explore{" "}
            <span className="font-bold">
              {WORLD_PROJECTS.find((p) => p.id === nearbyProjectId)?.title}
            </span>
          </div>
        </div>
      )}

      {/* Minimap toggle button */}
      <div className="absolute bottom-4 right-4 pointer-events-auto">
        <button
          type="button"
          onClick={toggleMiniMap}
          className="flex items-center gap-1.5 text-xs font-body font-semibold px-3 py-2 rounded-lg bg-black/60 text-white/70 hover:bg-black/80 transition-all"
          data-ocid="world.minimap.toggle"
        >
          <MapIcon size={12} />
          Map
        </button>
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
      <ConfettiEffect active={confetti} onComplete={clearConfetti} />
    </section>
  );
}
