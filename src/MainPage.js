import {Form, FormikProvider, useFormik} from "formik";
import NodeForm from "./forms/NodeForm";
import GroupForm from "./forms/GroupForm";
import React, {useState} from "react";
import {initialIsMemberOfGraph, initialNodes} from "./initialData";
import NodeType from "./NodeType";
import MemberGraph from "./forms/MemberGraph";

const MainPage = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [isMemberOfGraph, setIsMemberOfGraph] = useState(initialIsMemberOfGraph);

  //form handlers
  const nodeForm = useFormik({
    initialValues: NodeForm.initialValues,
    onSubmit: (values) => {
      setNodes( { ...nodes, [genNodeId(values.type)]: values })
      setNodeError(null);
    },
  });
  const groupForm = useFormik({
    initialValues: GroupForm.initialValues,
    onSubmit: (values) => {
      if (canMakeConnection(values.member, values.group)) {
        setIsMemberOfGraph( [ ...isMemberOfGraph, { from: values.member, to: values.group } ]);
        setAssignMemberError(null);
      }
    },
  });

  //Delete methods
  const removeNode = (name, type) => {
    const node = getNodeByNameAndType(name, type);
    if (node) {
      delete nodes[node[0]];

      const updatedMemberOfGraph = isMemberOfGraph.filter((connection) => !(connection.to === node[0] || connection.from === node[0]));
      setIsMemberOfGraph(updatedMemberOfGraph);

      setNodeError(null);
    }
    else setNodeError("No user found for name and type");
  }

  const removeFromGroup = (from, to) => {
    const updatedMemberOfGraph = isMemberOfGraph.filter((connection) => !(connection.to === to && connection.from === from));
    setIsMemberOfGraph(updatedMemberOfGraph);
  }

  const genNodeId = (type) => {
    const typeChar = type === NodeType.user ? "u" : "g";
    const numbers = [];

    //get all numbers in use for type
    for (const key of Object.keys(nodes)) {
      if ((key.charAt(0) === "u" && type === NodeType.user) || (key.charAt(0) === "g" && type === NodeType.group))
        numbers.push(key.substring(1));
    }

    //find next number for selected type and append to typeChar
    numbers.sort((a,b)=>a-b);
    return typeChar + (parseInt(numbers[numbers.length - 1]) + 1);
  }

  const [assignMemberError, setAssignMemberError] = useState(null);
  const [nodeError, setNodeError] = useState(null);

  //check group is not already nested in member
  const canMakeConnection = (member, group) => {
    let memberConnections = [];
    if (member === group) {
      setAssignMemberError("Cant connect group to itself!");
      return false;
    }
    for (const memberConnection of isMemberOfGraph) {
      //check connection does not already exist
      if (memberConnection.from === member && memberConnection.to === group) {
        setAssignMemberError("Connection already exists!");
        return false;
      }
      if (memberConnection.to === member) memberConnections.push(memberConnection);
    }

    const addConnections = (to) => {
      for (const memberConnection of isMemberOfGraph) {
        if (memberConnection.to === to) {
          if (memberConnection.from.charAt(0) === "g") addConnections(memberConnection.from);
          memberConnections.push(memberConnection);
        }
      }
    }

    if (memberConnections.length > 0) {
      // member already has connections so check the group we're attempting add it to is not nested inside
      for (const connection of memberConnections) {
        if (connection.from.charAt(0) === "g") addConnections(connection.from);
      }
    }
    return true;
  }

  const getNodeByNameAndType = (name, type) => {
    for (const node of Object.entries(nodes)) {
      if (node[1]?.name === name && node[1]?.type === type) return node;
    }
    return null;
  }

  const getNameForNode = (nodeId) => {
    for (const node of Object.entries(nodes)) {
      if (node[0] === nodeId) return node[1].name;
    }
    return null;
  }

  return (
    <div className="page">
      <div className="box" >
        <FormikProvider value={nodeForm}>
          <Form>
            <NodeForm removeNode={removeNode} form={nodeForm}/>
          </Form>
        </FormikProvider>
        {nodeError && (
            <div style={{ color: "red" }}>{nodeError}</div>
        )}
      </div>
      <div className="box" >
        <FormikProvider value={groupForm}>
          <Form>
            <GroupForm nodes={nodes} removeFromGroup={removeFromGroup} form={groupForm}/>
          </Form>
        </FormikProvider>
        {assignMemberError && (
          <div style={{ color: "red" }}>{assignMemberError}</div>
        )}
      </div>
      <div className="box" >
        <MemberGraph data={isMemberOfGraph} getNameForNode={getNameForNode}/>
      </div>
      <div className="box" >
        {JSON.stringify(nodes)}
        <br /><br />
        {JSON.stringify(isMemberOfGraph)}
      </div>
    </div>
  );
}

export default MainPage;