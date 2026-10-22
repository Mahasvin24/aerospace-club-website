export const JOIN_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdnimrw_WGW1eqc9N5nO0xDxfg-oGchwFrlcJK7zAYO3uvMFw/viewform";
export const CALENDAR_URL =
  "https://docs.google.com/spreadsheets/d/1k8jAfNfwNUZDOiO9iNy0gWImfC9p1740Hf73wLA0o0I/edit?usp=sharing";
export const EMAIL = "sb.aeronautics@gmail.com";

export const fleet = [
  {
    name: "Skyscout",
    type: "Endurance quadcopter",
    status: "In development",
    title: "A different perspective on the game.",
    description:
      "A flying analytics platform for the soccer field. Skyscout combines a stabilized camera gimbal, a custom electronic speed controller, and onboard computer vision to track players, ball movement, and team formations.",
    image: "/assets/fleet/skyscout.jpg",
    alt: "The club’s Skyscout quadcopter during an outdoor test",
    specs: [
      ["Flight time", "20+ min"],
      ["Propeller size", "10 in"],
      ["Focus", "Computer vision"],
    ],
  },
  {
    name: "Condor",
    type: "Vertical-lift research aircraft",
    status: "In development",
    title: "For a closer look at our coast.",
    description:
      "Designed to fly out over Santa Barbara’s local reefs and back, Condor brings a new perspective to marine research. Four lift rotors and one propeller combine vertical takeoff with forward flight, helping scientists observe wildlife from above without disturbing it.",
    specs: [
      ["Lift rotors", "4"],
      ["Cruise propeller", "1"],
      ["Focus", "Marine research"],
    ],
  },
  {
    name: "RC Galaga",
    type: "FPV testbed quadcopter",
    status: "Legacy build",
    title: "The build that started it all.",
    description:
      "Our first step from individual components to a flying aircraft. Assembled and wired entirely in-house, RC Galaga became the hands-on testbed for learning to build, wire, and tune quadcopters. Every project since carries a little of what we learned here.",
    image: "/assets/fleet/rc-galaga.jpg",
    alt: "RC Galaga, the club’s original quadcopter, on a concrete ledge",
    specs: [
      ["Flight time", "15+ min"],
      ["Propeller size", "5 in"],
      ["Build", "In-house"],
    ],
  },
];

export const crew = [
  { name: "Tony Ruelas", role: "President", image: "tony-ruelas" },
  { name: "Yael Carranza", role: "Vice President", image: "yael-carranza" },
  {
    name: "Grace Holtzclaw",
    role: "Technology Director",
    image: "grace-holtzclaw",
  },
  { name: "Luis Martinez", role: "Financial Director", image: "luis-martinez" },
  { name: "Amy McGraw", role: "Administrative Director" },
  {
    name: "Ana Shrivastava",
    role: "Creative Media & Design Chair",
    image: "ana-shrivastava",
  },
  {
    name: "Luis (Tony) Mendoza",
    role: "Skyscout System Integration Lead",
    image: "luis-tony-mendoza",
  },
  {
    name: "Parker Johnston",
    role: "Research & Development PCB Design Lead",
    image: "parker-johnston",
  },
  {
    name: "Isaac Perez-Aguineca",
    role: "Condor Project Lead",
    image: "isaac-perez-aguineca",
  },
  {
    name: "Jacob Ismael",
    role: "Research & Development Firmware Lead",
    image: "jacob-ismael",
  },
];
