import { NextResponse } from "next/server";
import { getPostgresPool } from "../../../lib/postgres";

export const runtime = "nodejs";

const validPetTypes = new Set(["小型犬", "中大型犬", "猫咪"]);
const validServiceTypes = new Set(["基础洗护", "精致造型", "皮毛护理"]);

type BookingPayload = {
  contactName?: unknown;
  phone?: unknown;
  petType?: unknown;
  serviceType?: unknown;
  expectedArrivalAt?: unknown;
  note?: unknown;
};

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function badRequest(message: string) {
  return NextResponse.json({ message }, { status: 400 });
}

export async function POST(request: Request) {
  let payload: BookingPayload;

  try {
    payload = (await request.json()) as BookingPayload;
  } catch {
    return badRequest("预约信息格式不正确。");
  }

  const contactName = cleanText(payload.contactName);
  const phone = cleanText(payload.phone);
  const petType = cleanText(payload.petType);
  const serviceType = cleanText(payload.serviceType);
  const expectedArrivalAt = cleanText(payload.expectedArrivalAt);
  const note = cleanText(payload.note);

  if (contactName.length < 2 || contactName.length > 40) {
    return badRequest("请填写 2-40 个字符的联系人。");
  }

  if (!/^1[3-9]\d{9}$/.test(phone.replace(/\s+/g, ""))) {
    return badRequest("请填写正确的中国大陆手机号。");
  }

  if (!validPetTypes.has(petType)) {
    return badRequest("请选择有效的宠物类型。");
  }

  if (!validServiceTypes.has(serviceType)) {
    return badRequest("请选择有效的服务项目。");
  }

  const arrivalDate = new Date(expectedArrivalAt);
  if (Number.isNaN(arrivalDate.getTime())) {
    return badRequest("请选择有效的期望到店时间。");
  }

  if (note.length > 500) {
    return badRequest("备注不能超过 500 个字符。");
  }

  try {
    const result = await getPostgresPool().query<{ id: string }>(
      `
        insert into public.appointments (
          contact_name,
          phone,
          pet_type,
          service_type,
          expected_arrival_at,
          note
        )
        values ($1, $2, $3, $4, $5, $6)
        returning id
      `,
      [
        contactName,
        phone.replace(/\s+/g, ""),
        petType,
        serviceType,
        arrivalDate.toISOString(),
        note || null
      ]
    );

    return NextResponse.json(
      {
        id: result.rows[0].id,
        message: "预约已提交，门店会尽快确认。"
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create appointment", error);
    return NextResponse.json(
      { message: "预约提交失败，请稍后再试。" },
      { status: 500 }
    );
  }
}
