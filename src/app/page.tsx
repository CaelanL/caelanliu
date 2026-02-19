import LeftPanel from "@/components/LeftPanel";
import ProjectStack from "@/components/ProjectStack";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center">
      <div className="flex mx-auto px-12 gap-[clamp(2rem,8vw,10rem)]">
        <LeftPanel />
        <ProjectStack />
      </div>
    </main>
  );
}
