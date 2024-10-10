import AIScheduleFormCard from "@/components/Card/AIScheduleFormCard";
import AIScheduleThemeCard from "@/components/Domain/AIScheduleTheme/AIScheduleThemeCard";
import ScheduleThemeItem from "@/components/Domain/AIScheduleTheme/ScheduleThemeList/ScheduleThemeItem";

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
          country={"태국"}
          city={"푸켓"}
          travelType={"해변 휴양"}
          imgSrc="https://images.unsplash.com/photo-1597246217838-bfc44d6ac746?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          onSelect={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    </div>
  );
}
