import React from "react";
import "./Sidebar.css";
import { IoIosAdd, IoMdMenu } from "react-icons/io";
import { motion } from "motion/react";

const Sidebar = ({ expanded, toggleSidebar, createNewChat, sidetitle, handleClick }) => {
  return (
    <motion.div
      className={`sidebar ${expanded ? "expanded" : ""}`}
      animate={{ width: expanded ? 250 : 50 }}
      transition={{ duration: 0.3 }}
    >
      <IoMdMenu className="menu" onClick={toggleSidebar} />
      {expanded && (
        <>
        <motion.div
          className="add-button"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.1 }}
        >
          <IoIosAdd className="add" onClick={createNewChat}/>
          <p>New Chat</p>
        </motion.div>
        <ul className="history">
        {sidetitle?.map((sidetitle, index) => <li key={index} onClick={() => handleClick(sidetitle)}>{sidetitle}</li>)}
        </ul>
        </>
      )}
    </motion.div>
  );
};

export default Sidebar;
