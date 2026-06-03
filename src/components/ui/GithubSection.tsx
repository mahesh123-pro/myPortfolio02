"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitPullRequest, GitFork, BookOpen, Star } from "lucide-react";

interface GithubStats {
  repos: number;
  followers: number;
  commits: number;
  contributions: number;
  languages: string[];
}

export function GithubSection() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<GithubStats>({
    repos: 24,
    followers: 12,
    commits: 1420,
    contributions: 865,
    languages: ["TypeScript", "JavaScript", "Python", "Go", "HCL (Terraform)"]
  });

  useEffect(() => {
    // Attempt to fetch public stats from GitHub API
    const fetchGithubData = async () => {
      try {
        const userRes = await fetch("https://api.github.com/users/mahesh123-pro");
        if (userRes.ok) {
          const userData = await userRes.json();
          setStats((prev) => ({
            ...prev,
            repos: userData.public_repos || prev.repos,
            followers: userData.followers || prev.followers
          }));
        }
      } catch (err) {
        console.warn("GitHub API error or rate limit hit, using fallback static data.", err);
      } finally {
        // Slow down loading slightly to demonstrate the skeleton animation
        setTimeout(() => setLoading(false), 900);
      }
    };

    fetchGithubData();
  }, []);

  // Generate mock contribution grid data (53 weeks * 7 days)
  const generateContributions = () => {
    const grid = [];
    // 53 columns
    for (let col = 0; col < 40; col++) { // compact on small screens, render 40 columns
      const column = [];
      for (let row = 0; row < 7; row++) {
        // Randomly assign contribution levels (0 to 4)
        const rand = Math.random();
        let level = 0;
        if (rand > 0.85) level = 4;
        else if (rand > 0.70) level = 3;
        else if (rand > 0.50) level = 2;
        else if (rand > 0.25) level = 1;
        column.push(level);
      }
      grid.push(column);
    }
    return grid;
  };

  const contributionGrid = generateContributions();

  // Get color for contribution level
  const getLevelClass = (level: number) => {
    switch (level) {
      case 1: return "bg-[#ff6b00]/20 border border-[#ff6b00]/10";
      case 2: return "bg-[#ff6b00]/45 border border-[#ff6b00]/20";
      case 3: return "bg-[#ff6b00]/70 border border-[#ff6b00]/30";
      case 4: return "bg-[#ff6b00] shadow-[0_0_6px_rgba(255,107,0,0.4)]";
      default: return "bg-white/5";
    }
  };

  return (
    <section id="github" className="py-28 w-full bg-[#0A0A0A] relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-radial-gradient from-[#ff6b00]/2 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10 space-y-16">
        
        {/* Section Title */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-[#ff6b00]" />
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#ff6b00] font-bold">06 — Activity</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-heading font-black tracking-tighter uppercase text-white leading-none">
            GitHub <span className="text-gradient-orange">Telemetry.</span>
          </h2>
          <p className="text-white/50 text-xs sm:text-sm font-light max-w-xl font-mono mt-2">
            Real-time feed analytics tracking version control code releases, system deployments, and programming configurations.
          </p>
        </div>

        {loading ? (
          /* LOADING SKELETON */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 p-8 rounded-[2.5rem] bg-white/3 border border-white/5 space-y-6 animate-pulse">
              <div className="h-6 w-48 bg-white/10 rounded-full" />
              <div className="h-28 w-full bg-white/5 rounded-2xl" />
            </div>
            <div className="lg:col-span-4 p-8 rounded-[2.5rem] bg-white/3 border border-white/5 space-y-6 animate-pulse">
              <div className="h-6 w-32 bg-white/10 rounded-full" />
              <div className="space-y-3">
                <div className="h-10 w-full bg-white/5 rounded-xl" />
                <div className="h-10 w-full bg-white/5 rounded-xl" />
              </div>
            </div>
          </div>
        ) : (
          /* ACTUAL CONTENT */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Grid 1: Contributions heat map representation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-8 p-8 rounded-[2.5rem] bg-white/3 border border-white/5 flex flex-col justify-between space-y-8 relative group hover:border-[#ff6b00]/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                  Contribution Heat Map
                </h3>
                <span className="text-[10px] font-mono text-white/40">
                  {stats.contributions} commits / last year
                </span>
              </div>

              {/* The grid */}
              <div className="overflow-x-auto w-full scrollbar-none pt-2">
                <div className="flex gap-1 min-w-[560px] justify-between">
                  {contributionGrid.map((column, colIdx) => (
                    <div key={colIdx} className="flex flex-col gap-1">
                      {column.map((level, rowIdx) => (
                        <div 
                          key={rowIdx}
                          className={`w-2.5 h-2.5 rounded-[2px] transition-all duration-300 hover:scale-125 ${getLevelClass(level)}`}
                          title={`Level ${level} contribution`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend bar */}
              <div className="flex justify-between items-center text-[9px] font-mono text-white/35 pt-4 border-t border-white/5">
                <span>Learn more at github.com/mahesh123-pro</span>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <div className="w-2.5 h-2.5 rounded-[2px] bg-white/5" />
                  <div className="w-2.5 h-2.5 rounded-[2px] bg-[#ff6b00]/20" />
                  <div className="w-2.5 h-2.5 rounded-[2px] bg-[#ff6b00]/45" />
                  <div className="w-2.5 h-2.5 rounded-[2px] bg-[#ff6b00]/70" />
                  <div className="w-2.5 h-2.5 rounded-[2px] bg-[#ff6b00]" />
                  <span>More</span>
                </div>
              </div>
            </motion.div>

            {/* Grid 2: Core stats summary counters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-4 p-8 rounded-[2.5rem] bg-white/3 border border-white/5 flex flex-col justify-between space-y-6 hover:border-[#ff6b00]/20 transition-all duration-300"
            >
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                System Telemetry
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/40 border border-white/5 group hover:border-[#ff6b00]/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-[#ff6b00]" />
                    <span className="text-xs font-mono text-white/70">Public Repositories</span>
                  </div>
                  <span className="text-sm font-mono font-black text-white">{stats.repos}</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/40 border border-white/5 hover:border-[#ff6b00]/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <GitPullRequest className="w-4 h-4 text-[#ff6b00]" />
                    <span className="text-xs font-mono text-white/70">Total Commits</span>
                  </div>
                  <span className="text-sm font-mono font-black text-white">{stats.commits}</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/40 border border-white/5 hover:border-[#ff6b00]/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <GitFork className="w-4 h-4 text-[#ff6b00]" />
                    <span className="text-xs font-mono text-white/70">Followers</span>
                  </div>
                  <span className="text-sm font-mono font-black text-white">{stats.followers}</span>
                </div>
              </div>

              {/* Technologies summary taglist */}
              <div className="pt-4 border-t border-white/5">
                <span className="text-[10px] font-mono font-bold text-[#ff6b00] uppercase tracking-wider block mb-3">
                  Top Technologies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {stats.languages.map((lang) => (
                    <span 
                      key={lang}
                      className="px-2.5 py-1 rounded-md bg-[#0A0A0A] border border-white/5 text-[8px] font-mono text-white/75"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>

          </div>
        )}

      </div>
    </section>
  );
}
