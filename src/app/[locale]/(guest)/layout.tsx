import Header from "@/components/shared/header";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import PixelBlast from "@/components/shared/pixel-blast";
import VinylPlayer from "@/components/shared/vinyl-player";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full bg-black text-foreground overflow-x-clip">
      {/* 1. Canvas Background Ambient Pixel Matrix (Fixed di layer z-0) */}
      <PixelBlast
        variant="square"
        pixelSize={3}
        color="#202020"
        patternScale={5}
        patternDensity={1}
        pixelSizeJitter={0}
        enableRipples
        rippleSpeed={0.4}
        rippleThickness={0.12}
        rippleIntensityScale={1.5}
        liquid={true}
        speed={0.1}
        edgeFade={0}
        transparent
      />

      {/* 2. Container Tengah Solid 720px (z-10 menutupi bagian tengah) */}
      <div className="relative z-10 mx-auto w-[52%] min-h-screen bg-background text-foreground border-x border-border flex flex-col justify-between shadow-2xl">
        <div className="w-full flex flex-col flex-1">
          <Header />
          <Navbar />
          <main className="w-full flex-1">{children}</main>
        </div>
        <Footer />
      </div>

      {/* 3. Floating Vinyl Record Music Player di sudut bawah kiri */}
      <VinylPlayer />
    </div>
  );
}
