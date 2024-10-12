import AIScheduleFormCard from "@/components/Domain/AISchedule/AIScheduleForm/AIScheduleFormCard";
import AIScheduleLocationCard from "@/components/Domain/AISchedule/AIScheduleLocation/AIScheduleLocationCard";
import ScheduleLocationItem from "@/components/Domain/AISchedule/AIScheduleLocation/ScheduleLocationList/ScheduleLocationItem";
import AISchedulePlanCard from "@/components/Domain/AISchedule/AISchedulePlan/AISchedulePlanCard";
import AIScheduleThemeCard from "@/components/Domain/AISchedule/AIScheduleTheme/AIScheduleThemeCard";
import ScheduleThemeItem from "@/components/Domain/AISchedule/AIScheduleTheme/ScheduleThemeList/ScheduleThemeItem";

export default function UIComponents() {
  return (
    <div>
      <h1 className="mb-8">컴포넌트 UI</h1>
      <div className="p-6">
        <h2 className="mb-4 text-rose-500">AIScheduleFormCard</h2>
        <AIScheduleFormCard />
      </div>
      <div className="p-6">
        <h2 className="mb-4 text-rose-500">AIScheduleThemeCard</h2>
        <AIScheduleThemeCard />
      </div>
      <div className="p-6">
        <h2 className="mb-4 text-rose-500">ScheduleThemeItem</h2>
        <ScheduleThemeItem
          id={1}
          country={"태국"}
          city={"푸켓"}
          travelType={"해변 휴양"}
          imgSrc="https://images.unsplash.com/photo-1597246217838-bfc44d6ac746?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          onSelect={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
      <div className="p-6">
        <h2 className="mb-4 text-rose-500">AIScheduleLocationCard</h2>
        <AIScheduleLocationCard />
      </div>
      <div className="p-6">
        <h2 className="mb-4 text-rose-500">ScheduleLocationItem</h2>
        <ScheduleLocationItem
          id={1}
          onSelect={function (): void {
            throw new Error("Function not implemented.");
          }}
          imgSrc="https://images.unsplash.com/photo-1696993545232-2b2717676c40?q=80&w=1392&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          location={"바나힐 썬월드"}
          address={"Hòa Ninh, Hòa Vang, Da Nang, 베트남"}
          description={
            "눈 앞에 펼쳐지는 아찔한 전망과 함께 다양한 놀이기구와 어트랙션을 즐길 수 있는 이색적인 복합 엔터테인먼트 공간입니다"
          }
          latlng={{
            lat: 0,
            lng: 0,
          }}
        />
      </div>
      <div className="p-6">
        <h2 className="mb-4 text-rose-500">AISchedulePlanCard</h2>
        <AISchedulePlanCard />
      </div>
    </div>
  );
}
