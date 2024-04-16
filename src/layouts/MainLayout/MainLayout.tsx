import Banner from "./components/Banner";
import TopBar from "./components/Topbar";

function MainLayout({ children }: any) {
  return (
    <>
      <div>
        <TopBar />
      </div>

      <main className="pt-20">
        <Banner />
        {children}
      </main>
    </>
  );
}

export default MainLayout;
