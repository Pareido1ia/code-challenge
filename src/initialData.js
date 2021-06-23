import NodeType from "./NodeType";

const nodes = {
  "g1": { name: "Group 1", type: NodeType.group },
  "g2": { name: "Group 2", type: NodeType.group },
  "g3": { name: "Group 3", type: NodeType.group },
  "g4": { name: "Group 4", type: NodeType.group },
  "g5": { name: "Group 5", type: NodeType.group },
  "u1": { name: "User 1", type: NodeType.user },
  "u2": { name: "User 2", type: NodeType.user },
  "u3": { name: "User 3", type: NodeType.user },
  "u4": { name: "User 4", type: NodeType.user },
  "u5": { name: "User 5", type: NodeType.user },
  "u6": { name: "User 6", type: NodeType.user },
  "u7": { name: "User 7", type: NodeType.user },
};

const isMemberOfGraph = [
  { from: "g2", to: "g1" },
  { from: "g3", to: "g1" },
  { from: "g4", to: "g1" },
  { from: "u1", to: "g2" },
  { from: "u2", to: "g2" },
  { from: "u3", to: "g3" },
  { from: "u4", to: "g3" },
  { from: "u5", to: "g4" },
  { from: "u6", to: "g4" },
  { from: "u7", to: "g5" },
];

export { nodes as initialNodes, isMemberOfGraph as initialIsMemberOfGraph };