"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";

const DAILY_ARRIVAL_HOUR = 9;
const DAILY_ARRIVAL_MINUTE = 30;

function getDailyArrivalDateTime() {
  const arrivalDate = new Date();
  arrivalDate.setHours(DAILY_ARRIVAL_HOUR, DAILY_ARRIVAL_MINUTE, 0, 0);

  const timezoneOffset = arrivalDate.getTimezoneOffset() * 60000;
  return new Date(arrivalDate.getTime() - timezoneOffset).toISOString().slice(0, 16);
}

type QuickBookingFormProps = {
  id?: string;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

export function QuickBookingForm({ id }: QuickBookingFormProps) {
  const [arrivalDateTime, setArrivalDateTime] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [petType, setPetType] = useState("小型犬");
  const [serviceType, setServiceType] = useState("基础洗护");
  const [note, setNote] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setArrivalDateTime(getDailyArrivalDateTime());
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("submitting");
    setMessage("");

    try {
      const arrivalDate = new Date(arrivalDateTime);

      if (Number.isNaN(arrivalDate.getTime())) {
        throw new Error("请选择有效的期望到店时间。");
      }

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contactName,
          phone,
          petType,
          serviceType,
          expectedArrivalAt: arrivalDate.toISOString(),
          note
        })
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "预约提交失败，请稍后再试。");
      }

      setSubmitState("success");
      setMessage(result.message ?? "预约已提交，门店会尽快确认。");
      setContactName("");
      setPhone("");
      setPetType("小型犬");
      setServiceType("基础洗护");
      setNote("");
      setArrivalDateTime(getDailyArrivalDateTime());
    } catch (error) {
      setSubmitState("error");
      setMessage(error instanceof Error ? error.message : "预约提交失败，请稍后再试。");
    }
  }

  return (
    <aside className="quick-card" id={id}>
      <h3>快速预约</h3>
      <p>提交后门店会在 10 分钟内确认档期。</p>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="name">联系人</label>
            <input
              id="name"
              placeholder="你的称呼"
              value={contactName}
              onChange={(event) => setContactName(event.target.value)}
              minLength={2}
              maxLength={40}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="phone">手机号</label>
            <input
              id="phone"
              inputMode="tel"
              placeholder="138 0000 0000"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="pet-type">宠物类型</label>
            <select
              id="pet-type"
              value={petType}
              onChange={(event) => setPetType(event.target.value)}
            >
              <option>小型犬</option>
              <option>中大型犬</option>
              <option>猫咪</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="service-type">服务项目</label>
            <select
              id="service-type"
              value={serviceType}
              onChange={(event) => setServiceType(event.target.value)}
            >
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
              required
            />
          </div>
          <div className="field full">
            <label htmlFor="note">备注</label>
            <textarea
              id="note"
              placeholder="例如：怕吹风、容易紧张、需要剪指甲"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              maxLength={500}
            />
          </div>
        </div>
        {message ? (
          <p className={`form-message ${submitState === "success" ? "success" : "error"}`} role="status">
            {message}
          </p>
        ) : null}
        <button className="submit-btn" type="submit" disabled={submitState === "submitting"}>
          {submitState === "submitting" ? "提交中..." : "✈ 发送预约"}
        </button>
      </form>
    </aside>
  );
}
