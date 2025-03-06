import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/font";

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center justify-center text-white leading-none h-full w-full`}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[20deg]" />
      <p className="text-[20px]">SIDISGOod</p>
    </div>
  );
}
