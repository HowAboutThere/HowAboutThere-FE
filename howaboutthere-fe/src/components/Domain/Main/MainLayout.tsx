import bg1 from "@/assets/make-plan.jpg";
import bg2 from "@/assets/trip-recommend.jpg";
import { useNavigate } from "react-router-dom";

export default function MainLayout() {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-60 flex gap-2">
      <article
        className="relative w-full h-72 p-4 rounded-lg bg-slate-900 overflow-hidden"
        onClick={() => navigate("ai-schedule")}
      >
        <img src={bg1} className="absolute left-0 top-0 w-full h-full m-0 object-cover z-0" />
        <div className="absolute left-0 top-0 w-full h-full m-0 object-cover z-0 bg-gradient-to-t from-sky-500" />
        <div className="relative w-full h-full flex flex-col justify-end gap-2">
          <h3 className="text-center text-white">✈️ AI 여행 플래너 ✈️️</h3>
          <p className="text-white">클릭 몇 번으로 만드는 맞춤형 여행 루트</p>
        </div>
      </article>
      <article className="relative w-full h-72 p-4   rounded-lg bg-slate-900 overflow-hidden">
        <img src={bg2} className="absolute left-0 top-0 w-full h-full m-0 object-cover z-0" />
        <div className="absolute left-0 top-0 w-full h-full m-0 object-cover z-0 bg-gradient-to-t from-sky-500" />
        <div className="relative w-full h-full flex flex-col justify-end gap-2">
          <h3 className="text-center text-white">📷 여행 명소 지도 📷️</h3>
          <p className="text-white">한국관광공사 공식 이미지로 만나는 국내 최고의 여행지</p>
        </div>
      </article>
    </div>
  );
}
