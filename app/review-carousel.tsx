"use client";

import { useEffect, useMemo, useState } from "react";

const reviews = [
  {
    quote: "我家狗很怕吹风，店员会分段休息，洗完也没有以前那种焦虑状态。",
    name: "林女士",
    pet: "柯基主人"
  },
  {
    quote: "猫咪洗护时段很安静，能看到操作区，过程比想象中顺利很多。",
    name: "周先生",
    pet: "布偶猫主人"
  },
  {
    quote: "造型不会剪得夸张，美容师会先问日常活动习惯，细节很专业。",
    name: "赵女士",
    pet: "比熊主人"
  },
  {
    quote: "第一次带幼犬洗澡，工作人员一直用零食和玩具安抚，回家后也没有抗拒梳毛。",
    name: "陈先生",
    pet: "柴犬主人"
  },
  {
    quote: "皮肤敏感的问题会先做记录，洗护产品也会说明清楚，连续护理后掉屑少了很多。",
    name: "吴女士",
    pet: "英短主人"
  },
  {
    quote: "预约时间很准，接送交接都会拍照确认，适合工作日中午临时安排。",
    name: "黄女士",
    pet: "贵宾主人"
  },
  {
    quote: "大狗洗完毛很蓬松，脚底毛和指甲修得干净，价格和时长都提前说清楚。",
    name: "马先生",
    pet: "金毛主人"
  }
];

export function ReviewCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeReview = reviews[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % reviews.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  const visibleReviews = useMemo(
    () => [0, 1, 2].map((offset) => reviews[(activeIndex + offset) % reviews.length]),
    [activeIndex]
  );

  return (
    <div className="review-carousel" aria-label="客户评价轮播">
      <div className="review-toolbar">
        <div>
          <strong>4.9/5.0</strong>
          <span>来自 300+ 次本地洗护服务反馈</span>
        </div>
        <div className="review-controls">
          <button
            aria-label="上一条评价"
            type="button"
            onClick={() => setActiveIndex((current) => (current - 1 + reviews.length) % reviews.length)}
          >
            ‹
          </button>
          <button
            aria-label="下一条评价"
            type="button"
            onClick={() => setActiveIndex((current) => (current + 1) % reviews.length)}
          >
            ›
          </button>
        </div>
      </div>

      <div className="review-track" key={activeReview.name}>
        {visibleReviews.map((review, index) => (
          <article className={`review-card${index === 0 ? " featured" : ""}`} key={`${review.name}-${review.pet}`}>
            <div className="stars">★ ★ ★ ★ ★</div>
            <p>{review.quote}</p>
            <h4>{review.name}</h4>
            <span>{review.pet}</span>
          </article>
        ))}
      </div>

      <div className="review-dots">
        {reviews.map((review, index) => (
          <button
            aria-label={`查看${review.name}的评价`}
            className={index === activeIndex ? "active" : ""}
            key={`${review.name}-${review.pet}`}
            type="button"
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
