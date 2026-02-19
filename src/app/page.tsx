import LeftPanel from "@/components/LeftPanel";
import ProjectStack from "@/components/ProjectStack";

export default function Home() {
  return (
    <main className="min-h-screen flex">
      <LeftPanel />
      <ProjectStack />
    </main>
  );
}
