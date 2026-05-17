import { EnvironmentCarousel } from "./environment-carousel";

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
        <section className="hero" id="prices">
          <div>
            <span className="hero-tag">✦ 一宠一浴巾 · 可视化洗护</span>
            <h1>泡泡爪 Pet Spa</h1>
            <p>为猫狗提供洗澡、精修、皮毛护理和幼宠适应服务。透明操作区、低噪吹干间和独立消毒工具，让每次洗护都更安心。</p>
            <div className="hero-actions">
              <button className="hero-btn primary" type="button">📅 立即预约</button>
              <button className="hero-btn" type="button">☰ 查看价目</button>
            </div>
            <div className="hero-stats">
              <div className="stat"><strong>4.9</strong><span>本地客户评分</span></div>
              <div className="stat"><strong>45min</strong><span>小型犬均时长</span></div>
              <div className="stat"><strong>09:30</strong><span>每日营业时间</span></div>
            </div>
          </div>

          <aside className="quick-card">
            <h3>快速预约</h3>
            <p>提交后门店会在 10 分钟内确认档期。</p>
            <form>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="name">联系人</label>
                  <input id="name" placeholder="你的称呼" />
                </div>
                <div className="field">
                  <label htmlFor="phone">手机号</label>
                  <input id="phone" placeholder="138 0000 0000" />
                </div>
                <div className="field">
                  <label htmlFor="pet-type">宠物类型</label>
                  <select id="pet-type" defaultValue="小型犬">
                    <option>小型犬</option>
                    <option>中大型犬</option>
                    <option>猫咪</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="service-type">服务项目</label>
                  <select id="service-type" defaultValue="基础洗护">
                    <option>基础洗护</option>
                    <option>精致造型</option>
                    <option>皮毛护理</option>
                  </select>
                </div>
                <div className="field full">
                  <label htmlFor="arrival-time">期望到店时间</label>
                  <input id="arrival-time" type="datetime-local" />
                </div>
                <div className="field full">
                  <label htmlFor="note">备注</label>
                  <textarea id="note" placeholder="例如：怕吹风、容易紧张、需要剪指甲" />
                </div>
              </div>
              <button className="submit-btn" type="button">✈ 发送预约</button>
            </form>
          </aside>
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
          <div className="review-grid">
            {reviews.map((review) => (
              <article className="review-card" key={review.name}>
                <div className="stars">★ ★ ★ ★ ★</div>
                <p>{review.quote}</p>
                <h4>{review.name}</h4>
                <span>{review.pet}</span>
              </article>
            ))}
          </div>
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
