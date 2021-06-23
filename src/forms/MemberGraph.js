import React, { useState, useEffect } from "react";

const MemberGraph = ({ data, getNameForNode }) => {
  const [topLevelGroups, setTopLevelGroups] = useState([]);

  //get groups that have connections but are not connected to a group;
  const getTopLevelGroups = () => {
    let groupNames = [];
    data.forEach((connection) => {
      if (!groupNames.includes(connection.to)) groupNames.push(connection.to);
    });
    data.forEach((connection) => {
      if (groupNames.includes(connection.from)) groupNames.splice(groupNames.indexOf(connection.from), 1);
    });
    setTopLevelGroups(groupNames);
  }

  useEffect(() => getTopLevelGroups(), [data]);

  const nodeStyle = (node) => {
    const isGroup = node.charAt(0) === "g";
    return { color: isGroup ? "white" : "#34a", backgroundColor: isGroup ? "#34a" : "" };
  }

  //for a group render all nodes connected
  const renderConnections = (group) => {
    const connections = data.filter((connection) => connection.to === group);

    return (
      <>
        {connections.map((connection) => (
          <div>
            <div className="graphNode" style={nodeStyle(connection.from)}>{getNameForNode(connection.from)}</div>
            <div className="connection">{renderConnections(connection.from)}</div>
          </div>
        ))}
      </>
    );
  }

  if (topLevelGroups.length > 0) {
    return (
      <>
        {topLevelGroups.map((group) => (
          <div>
            <div className="graphNode" style={nodeStyle(group)}>{getNameForNode(group)}</div>
            <div className="connection">{renderConnections(group)}</div>
          </div>
        ))}
      </>
    );
  }
  return <div>No results found</div>;
};

export default MemberGraph;