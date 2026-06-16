import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Lightbulb, Box, Code } from 'lucide-react';

export default function IntroSlide() {
  const [activeTab, setActiveTab] = useState('statement');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const tabContent = {
    statement: (
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="content-box">
        <h2 className="subtitle flex-center gap-2"><Target /> Problem Statement</h2>
        <motion.p variants={itemVariants} className="text-content">
          You are given a tree on <span className="highlight">n vertices</span>. One vertex <span className="highlight">c₀ is initially black</span>, and all others are white.
        </motion.p>
        <motion.p variants={itemVariants} className="text-content">
          Over <span className="highlight">n - 1 operations</span>, you color one white vertex black in a given order.
        </motion.p>
        <motion.div variants={itemVariants} className="p-4 bg-[rgba(0,240,255,0.1)] border border-[rgba(0,240,255,0.3)] rounded-lg mt-4">
          <p className="font-bold text-[var(--text-color)] mb-2">The Goal:</p>
          <p className="text-[var(--text-muted)]">
            After each operation, output the <span className="highlight text-accent-tertiary font-bold">positivity</span> of the tree.
            Positivity is defined as the <span className="highlight">minimum distance</span> between ANY pair of black vertices.
          </p>
        </motion.div>
      </motion.div>
    ),
    realWorld: (
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="content-box">
        <h2 className="subtitle flex-center gap-2"><Lightbulb /> Real-world Interpretation</h2>
        <motion.p variants={itemVariants} className="text-content">
          Imagine the tree is a city network, and <span className="highlight">black vertices are newly opened coffee shops</span>.
        </motion.p>
        <motion.p variants={itemVariants} className="text-content">
          As more coffee shops open, we want to know: <br/>
          <span className="italic text-accent-secondary">"What is the shortest distance between ANY two competing coffee shops?"</span>
        </motion.p>
        <motion.p variants={itemVariants} className="text-content mt-4">
          With every new shop, the minimum distance either <span className="highlight">decreases</span> or <span className="highlight">stays the same</span>. It can NEVER increase!
        </motion.p>
      </motion.div>
    ),
    io: (
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="content-box">
        <h2 className="subtitle flex-center gap-2"><Code /> Input / Output & Constraints</h2>
        <div className="two-col mt-4">
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-2 text-accent-secondary">Constraints</h3>
            <ul className="list-disc pl-6 space-y-2 text-[var(--text-muted)]">
              <li><span className="highlight font-mono">n ≤ 2·10⁵</span> (Vertices)</li>
              <li><span className="highlight font-mono">t ≤ 10⁴</span> (Test cases)</li>
              <li>Sum of <span className="font-mono">n</span> over testcases ≤ <span className="font-mono">2·10⁵</span></li>
            </ul>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-2 text-accent-secondary">Output</h3>
            <p className="text-[var(--text-muted)]">
              Print <span className="font-mono">n-1</span> integers, where the <span className="italic">i-th</span> integer is the minimum distance between any two black vertices after the first <span className="italic">i</span> operations.
            </p>
          </motion.div>
        </div>
      </motion.div>
    ),
    hidden: (
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="content-box border-accent-tertiary">
        <h2 className="subtitle flex-center gap-2 text-accent-tertiary"><Box /> Hidden Observations</h2>
        <motion.ul variants={containerVariants} className="space-y-4">
          <motion.li variants={itemVariants} className="flex items-start gap-3">
            <span className="bg-accent-tertiary text-[var(--text-color)] w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold">1</span>
            <p className="text-lg">The answer is <span className="highlight">monotonically non-increasing</span>. As more nodes become black, the minimum distance can only drop.</p>
          </motion.li>
          <motion.li variants={itemVariants} className="flex items-start gap-3">
            <span className="bg-accent-tertiary text-[var(--text-color)] w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold">2</span>
            <p className="text-lg">We don't need to find distances greater than our current minimum! If the current answer is <span className="font-mono">ans</span>, we only care if the newly added black node is closer than <span className="font-mono">ans</span> to an existing black node.</p>
          </motion.li>
        </motion.ul>
      </motion.div>
    )
  };

  return (
    <div className="slide">
      <motion.h1 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="title text-center"
      >
        Timofey and Black-White Tree
      </motion.h1>

      <div className="flex gap-4 justify-center mb-8">
        {['statement', 'realWorld', 'io', 'hidden'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`btn ${activeTab === tab ? 'bg-[rgba(0,240,255,0.2)] text-accent-color border border-accent-color' : 'border border-transparent'}`}
            style={{ textTransform: 'capitalize' }}
          >
            {tab.replace(/([A-Z])/g, ' $1').trim()}
          </button>
        ))}
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {tabContent[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}