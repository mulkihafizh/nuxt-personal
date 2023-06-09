export type projectRule = {
  name: string;
  description: string;
  contribution: string;
  image: string;
  url?: string;
  github?: string;
  tech: string[];
};

export const projects: projectRule[] = [
  {
    name: "Smart Farming Tracker",
    description:
      "A web app to track the growth of plants in a smart farming system.",
    contribution: "Fullstack Developer",
    image: "/images/projects/smft.png",
    url: "https://smart-farmingg.netlify.app/",
    github: "https://github.com/mulkihafizh/smart-farming",
    tech: ["React", "Express", "MongoDB", "NodeJS"],
  },
  {
    name: "Smart Farming Tracker App",
    description:
      "A mobile app to track the growth of plants in a smart farming system.",
    contribution: "Back End Developer",
    image: "/images/projects/smftm.png",
    url: "-",
    github: "-",
    tech: ["Flutter", "Express", "MongoDB", "NodeJS"],
  },
  {
    name: "PPDB Wikrama",
    description: "A web app to register new students in a school",
    contribution: "Fullstack Developer",
    image: "/images/projects/ppdb.png",
    url: "-",
    github: "-",
    tech: ["Laravel", "MySQL"],
  },
  {
    name: "Wikrama Green School",
    description: "A web about a school program to keep the environment clean",
    contribution: "Front End Developer",
    image: "/images/projects/wgs.png",
    url: "-",
    github: "-",
    tech: ["Vue", "Laravel", "MySQL"],
  },
  {
    name: "First Portfolio",
    description: "My first portfolio website",
    contribution: "Front End Developer",
    image: "/images/projects/prtfl.png",
    url: "-",
    github: "-",
    tech: ["React", "TailwindCSS"],
  },
];
