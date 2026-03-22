import { ExternalLink, Github, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export interface Project3D {
  id: string;
  title: string;
  description: string;
  stack: string[];
  accentColor: string;
  icon: string;
  demoUrl: string;
  githubUrl: string;
  achievementId: string;
}

export const WORLD_PROJECTS: Project3D[] = [
  {
    id: "hyd3d",
    title: "Hyderabad 3D City Explorer",
    description:
      "Real-time WebGL map of Hyderabad with driveable landmarks. Built with Three.js and powered by real geographic data. Explore the city like never before.",
    stack: ["Three.js", "WebGL", "React", "Mapbox"],
    accentColor: "#4ECDC4",
    icon: "🏙️",
    demoUrl: "#",
    githubUrl: "https://github.com/Nidhi-1012",
    achievementId: "explorer",
  },
  {
    id: "aiportfolio",
    title: "AI Portfolio Builder",
    description:
      "Generate your own legendary 3D portfolio site in minutes using AI. Built with Cursor + Claude API and a smart prompt engineering pipeline.",
    stack: ["React", "Claude API", "Three.js", "TypeScript"],
    accentColor: "#FF6B6B",
    icon: "🤖",
    demoUrl: "#",
    githubUrl: "https://github.com/Nidhi-1012",
    achievementId: "explorer",
  },
  {
    id: "physics-shop",
    title: "Physics Shopping Experience",
    description:
      "An e-commerce prototype where products behave like real objects — drag, throw, and collide items with actual Rapier physics before adding them to cart.",
    stack: ["React", "Rapier", "Three.js", "@react-three/fiber"],
    accentColor: "#9B59B6",
    icon: "🛒",
    demoUrl: "#",
    githubUrl: "https://github.com/Nidhi-1012",
    achievementId: "explorer",
  },
];

interface ProjectModalProps {
  project: Project3D | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          data-ocid="project.modal"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
          >
            {/* Header */}
            <div
              className="relative h-40 flex items-center justify-center"
              style={{ backgroundColor: `${project.accentColor}22` }}
            >
              <span className="text-7xl select-none">{project.icon}</span>
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
                data-ocid="project.modal.close_button"
              >
                <X size={18} className="text-gray-600" />
              </button>
              <div
                className="absolute bottom-4 left-4 text-xs font-body font-bold px-3 py-1 rounded-full text-white uppercase tracking-wider"
                style={{ backgroundColor: project.accentColor }}
              >
                Project Discovered!
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">
                {project.title}
              </h2>
              <p className="font-body text-gray-600 leading-relaxed text-sm mb-5">
                {project.description}
              </p>

              {/* Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-body text-xs font-semibold px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: `${project.accentColor}20`,
                      color: project.accentColor,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-body font-semibold text-sm text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: project.accentColor }}
                  data-ocid="project.modal.primary_button"
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-body font-semibold text-sm border-2 transition-colors hover:bg-gray-50"
                  style={{
                    borderColor: project.accentColor,
                    color: project.accentColor,
                  }}
                  data-ocid="project.modal.secondary_button"
                >
                  <Github size={14} /> GitHub
                </a>
              </div>

              <p className="font-body text-xs text-gray-400 text-center mt-4">
                Nidhii custom project slot &mdash; replace image here
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
