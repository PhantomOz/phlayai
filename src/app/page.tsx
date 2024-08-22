import Image from "next/image";
import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";

export default function Home() {
  return (
    <main>
      <Sidebar>
        <MainContent />
      </Sidebar>
    </main>
  );
}
