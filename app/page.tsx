import { EnvironmentCarousel } from "./environment-carousel";
import { QuickBookingForm } from "./quick-booking-form";
import { ReviewCarousel } from "./review-carousel";

const services = [
  {
    icon: "🛁",
    color: "#f6df92",
    title: "基础洗护",
    desc: "清洁耳道、修剪脚底毛、指甲护理，低敏洗浴和分区吹干。",
    price: "¥88 起"
  },
  {
    icon: "✂",
    color: "#f1a998",
    title: "精致造型",
    desc: "按品种和生活习惯设计造型，适合贵宾、比熊、雪纳瑞等犬种。",
    price: "¥168 起"
  },
  {
    icon: "💧",
    color: "#9db4ea",
    title: "皮毛护理",
    desc: "针对打结、掉毛、干燥和敏感皮肤，搭配护毛素与养护梳理。",
    price: "¥128 起"
  },
  {
    icon: "🤍",
    color: "#b5e4d8",
    title: "幼宠适应",
    desc: "缩短流程、降低噪音、正向奖励，帮助幼宠建立温和洗护体验。",
    price: "¥68 起"
  }
];

const priceGroups = [
  {
    title: "犬只洗护",
    note: "含基础清洁、耳道护理、脚底毛和指甲修剪",
    rows: [
      { size: "小型犬", weight: "10kg 内", bath: "¥88", styling: "¥168" },
      { size: "中型犬", weight: "10-20kg", bath: "¥128", styling: "¥238" },
      { size: "大型犬", weight: "20kg 以上", bath: "¥188", styling: "¥328" }
    ]
  },
  {
    title: "猫咪护理",
    note: "按情绪状态安排低刺激流程，需提前确认档期",
    rows: [
      { size: "短毛猫", weight: "日常洗护", bath: "¥158", styling: "¥258" },
      { size: "长毛猫", weight: "深层梳理", bath: "¥198", styling: "¥328" },
      { size: "局部护理", weight: "去结/修脚毛", bath: "¥68", styling: "¥128" }
    ]
  }
];

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <header className="topbar">
        <div className="container nav">
          <a href="#home" className="brand">
            <span className="brand-mark">🐾</span>
            <span className="brand-text">泡泡爪 Pet Spa</span>
          </a>
          <nav className="nav-links" aria-label="主导航">
            <a href="#services">洗护项目</a>
            <a href="#process">护理流程</a>
            <a href="#prices">价目表</a>
            <a href="#reviews">客户评价</a>
            <a href="#store">门店位置</a>
          </nav>
          <div className="nav-actions">
            <button className="icon-btn" type="button">📞</button>
            <button className="book-btn" type="button">📅 预约</button>
          </div>
        </div>
      </header>

      <main id="home" className="container">
        <section className="hero">
          <div>
            <span className="hero-tag">✦ 一宠一浴巾 · 可视化洗护</span>
            <h1>泡泡爪 Pet Spa</h1>
            <p>为猫狗提供洗澡、精修、皮毛护理和幼宠适应服务。透明操作区、低噪吹干间和独立消毒工具，让每次洗护都更安心。</p>
            <div className="hero-actions">
              <a className="hero-btn primary" href="#booking">📅 立即预约</a>
              <a className="hero-btn" href="#prices">☰ 查看价目</a>
            </div>
            <div className="hero-stats">
              <div className="stat"><strong>4.9</strong><span>本地客户评分</span></div>
              <div className="stat"><strong>45min</strong><span>小型犬均时长</span></div>
              <div className="stat"><strong>09:30</strong><span>每日营业时间</span></div>
            </div>
          </div>

          <QuickBookingForm id="booking" />
        </section>

        <section id="services">
          <div className="section-head">
            <h2>洗护项目</h2>
            <p>从日常清洁到造型护理，按宠物体型、毛量和情绪状态安排独立方案。</p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <div className="service-icon" style={{ background: service.color }}>{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <div className="service-foot"><span>{service.price}</span><span>→</span></div>
              </article>
            ))}
          </div>
        </section>

        <section id="prices">
          <div className="section-head">
            <h2>价目表</h2>
            <p>按宠物体型、毛量、打结程度和情绪状态评估，复杂造型或特殊护理到店后确认最终价格。</p>
          </div>
          <div className="price-grid">
            {priceGroups.map((group) => (
              <article className="price-card" key={group.title}>
                <div className="price-card-head">
                  <div>
                    <h3>{group.title}</h3>
                    <p>{group.note}</p>
                  </div>
                  <span>到店评估</span>
                </div>
                <div className="price-table" role="table" aria-label={`${group.title}价目表`}>
                  <div className="price-row price-row-head" role="row">
                    <span role="columnheader">类型</span>
                    <span role="columnheader">说明</span>
                    <span role="columnheader">洗护</span>
                    <span role="columnheader">造型</span>
                  </div>
                  {group.rows.map((row) => (
                    <div className="price-row" role="row" key={`${group.title}-${row.size}`}>
                      <span role="cell">{row.size}</span>
                      <span role="cell">{row.weight}</span>
                      <strong role="cell">{row.bath}</strong>
                      <strong role="cell">{row.styling}</strong>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="price-note">
            <strong>常见加项</strong>
            <span>开结 ¥30 起</span>
            <span>药浴护理 ¥68 起</span>
            <span>幼宠适应 ¥68 起</span>
            <span>接送需提前预约</span>
          </div>
        </section>

        <section id="process">
          <div className="section-head">
            <h2>店内环境</h2>
            <p>明亮等候区、可视化操作台和独立细吹洗护分段，让宠物与主人都更放松。</p>
          </div>
          <EnvironmentCarousel />
        </section>

        <section id="reviews">
          <div className="section-head">
            <h2>客户评价</h2>
            <p>每次服务结束都会记录宠物状态，长期客户可以追踪毛发与皮肤变化。</p>
          </div>
          <ReviewCarousel />
        </section>

        <section id="store">
          <div className="store-grid">
            <article className="store-info">
              <h3>门店信息</h3>
              <p>地址：上海市宜川路街道陕西北路 1620 号</p>
              <p>电话：400-123-8899</p>
              <p>营业：周一至周日 09:30 - 20:30</p>
              <p>交通：陕西北路沿街，近宜昌路与澳门路</p>
            </article>
            <article className="map-card">
              <img src="/images/store-map-ai.png" alt="泡泡爪 Pet Spa 陕西北路 1620 号 AI 手绘门店位置示意图" />
            </article>
          </div>
        </section>
      </main>

      <footer>
        © {year} 泡泡爪 Pet Spa · 宠物洗护与美容服务
      </footer>
    </>
  );
}
