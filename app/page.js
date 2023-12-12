
import Hero from "@/components/Hero";
import Script from "next/script";

 





export default function Home() {
  return (
    <>
    
      <main className="bg-black text-white">
        <Hero />
        <Script defer src="../vendor/script.js" />
        
      
      </main>
  
    </>
  );
}

