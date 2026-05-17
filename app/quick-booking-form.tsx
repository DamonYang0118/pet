"use client";

import { useEffect, useState } from "react";

const DAILY_ARRIVAL_HOUR = 9;
const DAILY_ARRIVAL_MINUTE = 30;

function getDailyArrivalDateTime() {
  const arrivalDate = new Date();
  arrivalDate.setHours(DAILY_ARRIVAL_HOUR, DAILY_ARRIVAL_MINUTE, 0, 0);

  const timezoneOffset = arrivalDate.getTimezoneOffset() * 60000;
  return new Date(arrivalDate.getTime() - timezoneOffset).toISOString().slice(0, 16);
}

export function QuickBookingForm() {
  const [arrivalDateTime, setArrivalDateTime] = useState("");

  useEffect(() => {
    setArrivalDateTime(getDailyArrivalDateTime());
  }, []);

  return (
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
            <input
              id="arrival-time"
              type="datetime-local"
              value={arrivalDateTime}
              onChange={(event) => setArrivalDateTime(event.target.value)}
            />
          </div>
          <div className="field full">
            <label htmlFor="note">备注</label>
            <textarea id="note" placeholder="例如：怕吹风、容易紧张、需要剪指甲" />
          </div>
        </div>
        <button className="submit-btn" type="button">✈ 发送预约</button>
      </form>
    </aside>
  );
}
