import Image from "next/image";
import { Card } from "@/components/ui/card";

interface SponsorCardProps {
  name: string;
  logoUrl: string;
}

export function SponsorCard({ name, logoUrl }: SponsorCardProps) {
  return (
    <Card className="w-full max-w-sm overflow-hidden transition-all hover:scale-105">
      <div
        className={`aspect-video h-full flex bg-gradient-to-br from-red-500 to-red-900  items-center justify-center m-auto`}
      >
        <Image
          src={logoUrl}
          alt={`${name} logo`}
          width={200}
          height={100}
          objectFit="contain"
        />
      </div>
    </Card>
  );
}
