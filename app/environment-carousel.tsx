"use client";

import { useEffect, useState } from "react";

const envData = [
  {
    src: "/images/store-env-1.png",
    title: "前台接待与零售陈列区",
    desc: "品牌墙、香槟金细节和原木收纳，让到店体验更有品质感。"
  },
  {
    src: "/images/store-env-2.png",
    title: "透明可视洗护操作区",
    desc: "玻璃分区、独立洗护台与专业设备，强调洁净、标准与可视化服务。"
  },
  {
    src: "/images/store-env-3.png",
    title: "等候休息与宠物社交区",
    desc: "舒适休息位、绿植和暖光氛围，等待时也能轻松感受高端空间。"
  }
];

export function EnvironmentCarousel() {
  const [envIndex, setEnvIndex] = useState(0);
  const item = envData[envIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setEnvIndex((current) => (current + 1) % envData.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="env-wrap">
      <button
        aria-label="上一张环境图"
        className="env-arrow prev"
        type="button"
        onClick={() => setEnvIndex((current) => (current - 1 + envData.length) % envData.length)}
      >
        ‹
      </button>
      <img src={item.src} alt="高端宠物洗护店环境图" />
      <button
        aria-label="下一张环境图"
        className="env-arrow next"
        type="button"
        onClick={() => setEnvIndex((current) => (current + 1) % envData.length)}
      >
        ›
      </button>
      <div className="env-caption">
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
      </div>
      <div className="env-dots">
        {envData.map((entry, index) => (
          <button
            aria-label={`查看${entry.title}`}
            className={`env-dot${index === envIndex ? " active" : ""}`}
            key={entry.title}
            type="button"
            onClick={() => setEnvIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
